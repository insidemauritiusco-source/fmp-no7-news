import importlib.util
import pathlib
import unittest

spec = importlib.util.spec_from_file_location("collector", pathlib.Path(__file__).resolve().parents[1] / "scripts" / "collect_news.py")
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)

class CollectorTests(unittest.TestCase):
    def test_reject_untrusted_host(self):
        self.assertFalse(collector.safe_link("https://lemauricien.com.evil.test/news", "lemauricien.com"))
    def test_reject_http(self):
        self.assertFalse(collector.safe_link("http://lemauricien.com/news", "lemauricien.com"))
    def test_accept_known_host(self):
        self.assertTrue(collector.safe_link("https://www.lemauricien.com/news", "lemauricien.com"))
    def test_strip_markup(self):
        self.assertEqual(collector.clean("<b>News</b>  today"), "News today")

if __name__ == "__main__":
    unittest.main()
