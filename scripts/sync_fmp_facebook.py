#!/usr/bin/env python3
import json,os,urllib.parse,urllib.request,pathlib,sys
page=os.getenv("FMP_FACEBOOK_PAGE_ID","").strip(); token=os.getenv("FMP_FACEBOOK_PAGE_TOKEN","").strip()
if not page or not token: sys.exit("Page ID and authorized Page token required")
fields="id,message,created_time,permalink_url,attachments{media_type,type}"
url="https://graph.facebook.com/v24.0/"+urllib.parse.quote(page,safe="")+"/posts?"+urllib.parse.urlencode({"fields":fields,"limit":50,"access_token":token})
try:
 with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"FMP-MediaSync"}),timeout=30) as response: payload=json.load(response)
 if not isinstance(payload.get("data"),list): raise ValueError("Unexpected API response")
 items=[]
 for p in payload["data"]:
  kinds=[str(a.get("media_type") or a.get("type") or "").lower() for a in p.get("attachments",{}).get("data",[])]
  if not any("photo" in k or "video" in k or "album" in k for k in kinds): continue
  link=p.get("permalink_url","")
  if not link.startswith(("https://www.facebook.com/","https://facebook.com/")): continue
  items.append({"id":p.get("id",""),"kind":"video" if any("video" in k for k in kinds) else "photo","caption":p.get("message","")[:240],"date":p.get("created_time",""),"url":link})
 out=pathlib.Path("data/fmp-facebook-media.json");out.parent.mkdir(parents=True,exist_ok=True)
 out.write_text(json.dumps({"source":"Authorized FMP Facebook Page","items":items[:40]},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print("Updated",len(items),"media links")
except Exception as e:
 print("Sync failed; prior data preserved:",str(e).replace(token,"[REDACTED]"),file=sys.stderr);sys.exit(1)
