import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parents[1]

class DashboardTests(unittest.TestCase):
    def setUp(self):
        self.html = (ROOT / "news-review.html").read_text(encoding="utf-8")

    def test_clock_has_single_updater(self):
        self.assertEqual(self.html.count("function updateClock()"), 1)
        self.assertIn("setInterval(updateClock,1000)", self.html)
        self.assertNotIn("const clock=", self.html)

    def test_queue_count_matches_pending_cards(self):
        self.assertIn("data.items.filter(x=>x.status==='pending_review').length", self.html)
        self.assertIn("data.items.filter(x=>x.status==='pending_review').map(", self.html)

    def test_no_automatic_publish_action(self):
        self.assertNotIn("fetch('publish", self.html)

if __name__ == "__main__":
    unittest.main()
