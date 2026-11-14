#!/usr/bin/env python3
"""Conservative Mauritius RSS headline collector. No third-party dependencies."""
import datetime as dt
import json
import os
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FEEDS = json.loads((ROOT / "news-sources.json").read_text(encoding="utf-8"))
MAX_ITEMS = 100

def clean(value):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value or "")).strip()[:220]

def safe_link(url, host):
    parsed = urllib.parse.urlparse(url)
    domain = (parsed.hostname or "").lower()
    return parsed.scheme == "https" and (domain == host or domain.endswith("." + host))

def read_feed(source):
    request = urllib.request.Request(source["rss"], headers={"User-Agent": "FMP-NewsMonitor/1.0 (+public news links)"})
    with urllib.request.urlopen(request, timeout=12) as response:
        raw = response.read(2_000_000)
    root = ET.fromstring(raw)
    entries = []
    for node in root.findall(".//item"):
        title = clean(node.findtext("title"))
        url = (node.findtext("link") or "").strip()
        if title and safe_link(url, source["domain"]):
            entries.append({"title": title, "source_url": url, "publisher": source["name"], "date": clean(node.findtext("pubDate")), "note": "Titre externe. Consulter la source pour les détails.", "status": "pending_review"})
    return entries

def main():
    items = []
    errors = []
    for source in FEEDS:
        if not source.get("enabled", False):
            continue
        try:
            items.extend(read_feed(source))
        except Exception as exc:
            errors.append({"source": source["name"], "error": type(exc).__name__})
    old = json.loads((ROOT / "news-review.json").read_text(encoding="utf-8"))
    existing = {x["source_url"]: x for x in old.get("items", [])}
    for item in items:
        existing.setdefault(item["source_url"], item)
    output = {"updated_at": dt.datetime.now(dt.timezone.utc).isoformat(), "items": list(existing.values())[-MAX_ITEMS:], "errors": errors}
    (ROOT / "news-review.json").write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Collected {len(items)} entries; {len(errors)} source errors. No automatic publication.")

if __name__ == "__main__":
    main()
