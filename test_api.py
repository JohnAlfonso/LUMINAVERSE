#!/usr/bin/env python3
"""
Test / seed script for the LUMINAVERSE article API.

Posts sample articles to ``POST /api/articles`` and verifies the response:
  * HTTP 201 + ``success: true``
  * server auto-fills ``id``, ``excerpt``, ``category`` and ``readTime``
  * publish ``date`` is auto-backdated to ~4-5 months ago
  * the response contains a working ``url`` link to the new article

It also runs two validation checks (missing field -> 400, invalid field -> 400).

Usage:
    python3 test_api.py                              # post samples to the default site
    python3 test_api.py --base-url http://localhost:8010
    python3 test_api.py --cleanup                    # delete the articles it created
    API_BASE_URL=https://angel0215.com python3 test_api.py

Requires:  requests   (pip install requests)
"""

import argparse
import datetime as dt
import os
import sys

try:
    import requests
except ImportError:
    sys.exit("This script needs the 'requests' library:  pip install requests")


DEFAULT_BASE_URL = "https://angel0215.com"

# Sample articles. Only the required fields (title, content, author) plus `field`
# are supplied -- everything else is auto-filled by the server, which is the point
# of the test: excerpt, category, readTime, a backdated date, and the link url.
SAMPLE_ARTICLES = [
    {
        "title": "5 Habits of Highly Effective Sales Teams",
        "author": "Maria Gomez",
        "field": "selling",
        "content": (
            "High-performing sales teams are built on consistent daily habits rather than "
            "occasional heroics. They review their pipeline every morning, qualify leads "
            "ruthlessly, and follow up within hours instead of days. In this article we break "
            "down the five routines that separate top closers from the rest of the team."
        ),
    },
    {
        "title": "Understanding Index Funds for Beginners",
        "author": "David Chen",
        "field": "finance",
        "content": (
            "Index funds offer a simple, low-cost way to invest in the broad market without "
            "picking individual stocks. By tracking an index such as the S&P 500, they spread "
            "risk across hundreds of companies and historically outperform most actively managed "
            "funds over the long term. Here is what every new investor should know before starting."
        ),
    },
    {
        "title": "Daily Habits That Support Mental Health",
        "author": "Dr. Aisha Khan",
        "field": "medical",
        "content": (
            "Small, repeatable habits can have an outsized effect on mental wellbeing. Regular "
            "sleep, daily movement, time outdoors, and staying connected with others all help "
            "regulate mood and reduce stress. This guide covers evidence-based routines you can "
            "add to your day without overhauling your entire lifestyle."
        ),
    },
    {
        "title": "How to Build an Engaging Online Course",
        "author": "Laura Bennett",
        "field": "education",
        "content": (
            "Great online courses are designed around learning outcomes, not just video lectures. "
            "Break content into short modules, add a quick exercise after each concept, and give "
            "learners frequent feedback to keep them motivated. We walk through a practical framework "
            "for structuring a course that students actually finish."
        ),
    },
    {
        "title": "Content Marketing Trends to Watch This Year",
        "author": "Marcus Lee",
        "field": "marketing",
        "content": (
            "Content marketing keeps shifting toward authenticity, short-form video, and audience "
            "communities. Brands that win are publishing useful, original material consistently and "
            "repurposing it across channels. This post highlights the trends shaping content strategy "
            "and how small teams can take advantage of them."
        ),
    },
    {
        # Demonstrates supplying an explicit category (still auto-fills date/excerpt/readTime).
        "title": "Getting Productive with the Command Line",
        "author": "Sofia Rossi",
        "field": "tech",
        "category": "DevOps",
        "content": (
            "The command line is one of the highest-leverage tools a developer can master. Learning a "
            "handful of commands for navigating, searching, and chaining programs together can replace "
            "dozens of manual clicks. This article introduces the essentials and a few aliases that will "
            "save you time every single day."
        ),
    },
]


def banner(text):
    print(f"\n=== {text} ===")


def check(ok, label):
    """Print a PASS/FAIL line and return the boolean (for tallying)."""
    print(f"  [{'PASS' if ok else 'FAIL'}] {label}")
    return ok


def days_ago(date_str):
    """Whole days between `date_str` (YYYY-MM-DD) and today."""
    d = dt.date.fromisoformat(date_str)
    return (dt.date.today() - d).days


def main():
    parser = argparse.ArgumentParser(description="Test the LUMINAVERSE article API.")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("API_BASE_URL", DEFAULT_BASE_URL),
        help=f"API base URL (default: {DEFAULT_BASE_URL} or $API_BASE_URL)",
    )
    parser.add_argument(
        "--cleanup",
        action="store_true",
        help="Delete the articles created by this run when it finishes.",
    )
    args = parser.parse_args()
    base = args.base_url.rstrip("/")

    print(f"API base URL: {base}")
    print(f"Cleanup after run: {args.cleanup}")

    passed = failed = 0
    created = []  # list of (id, url)

    def tally(ok):
        nonlocal passed, failed
        if ok:
            passed += 1
        else:
            failed += 1

    # ------------------------------------------------------------------ health
    banner("Health check")
    try:
        r = requests.get(f"{base}/api/health", timeout=15)
        tally(check(r.status_code == 200 and r.json().get("status") == "ok",
                    f"GET /api/health -> 200 ok ({r.status_code})"))
    except requests.RequestException as e:
        tally(check(False, f"could not reach {base}: {e}"))
        print("\nAborting: API is not reachable.")
        return 1

    # ------------------------------------------------------- post sample data
    banner(f"Posting {len(SAMPLE_ARTICLES)} sample articles")
    for art in SAMPLE_ARTICLES:
        try:
            r = requests.post(f"{base}/api/articles", json=art, timeout=15)
        except requests.RequestException as e:
            tally(check(False, f"POST failed for '{art['title']}': {e}"))
            continue

        ok = r.status_code == 201
        if not ok:
            tally(check(False, f"POST '{art['title']}' -> {r.status_code} (expected 201)"))
            continue

        data = r.json()
        a = data.get("article", {})
        url = data.get("url", "")
        aid = a.get("id", "")
        created.append((aid, url))

        print(f"\n  '{art['title']}'  (field={art['field']})")
        tally(check(data.get("success") is True, "success == true"))
        tally(check(bool(aid), f"auto id assigned: {aid}"))
        tally(check(bool(a.get("excerpt")), "excerpt auto-filled"))
        tally(check(bool(a.get("category")), f"category set: {a.get('category')}"))
        tally(check(isinstance(a.get("readTime"), int) and a["readTime"] >= 1,
                    f"readTime set: {a.get('readTime')} min"))
        # backdated ~4-5 months (≈120-150 days); allow a lenient window
        d = a.get("date", "")
        within = bool(d) and 100 <= days_ago(d) <= 175
        tally(check(within, f"date backdated ~4-5 months: {d} ({days_ago(d)} days ago)"))
        tally(check(url.endswith(f"/article/{aid}"), f"link url returned: {url}"))

    # ------------------------------------------- verify a returned link loads
    if created:
        banner("Verify the returned link actually loads")
        first_url = created[0][1]
        try:
            r = requests.get(first_url, timeout=15)
            tally(check(r.status_code == 200, f"GET {first_url} -> {r.status_code}"))
        except requests.RequestException as e:
            tally(check(False, f"link did not load: {e}"))

    # --------------------------------------------------- validation behaviour
    banner("Validation: only title/content/author are required")
    r = requests.post(f"{base}/api/articles",
                      json={"title": "no author", "content": "body text"}, timeout=15)
    tally(check(r.status_code == 400, f"missing required field -> 400 ({r.status_code})"))

    banner("Field is optional & forgiving (labels/synonyms/unknown all accepted)")
    # (value sent, expected normalized field). None means 'field' key omitted entirely.
    field_cases = [
        ("Technology", "tech"),
        ("Sales", "selling"),
        ("Shopping", "shop"),
        ("Medical", "medical"),
        ("banana", "tech"),   # unrecognized -> default, NOT an error
        (None, "tech"),       # omitted entirely -> default
    ]
    for value, expected in field_cases:
        payload = {"title": f"field case {value}", "content": "sample body content for the field test",
                   "author": "Tester"}
        if value is not None:
            payload["field"] = value
        r = requests.post(f"{base}/api/articles", json=payload, timeout=15)
        if r.status_code == 201:
            data = r.json()
            a = data.get("article", {})
            created.append((a.get("id"), data.get("url", "")))  # track for cleanup
            label = "omitted" if value is None else f"'{value}'"
            tally(check(a.get("field") == expected,
                        f"field {label} accepted -> field={a.get('field')} (expected {expected})"))
        else:
            tally(check(False, f"field '{value}' -> {r.status_code} (expected 201, creation should never fail on field)"))

    # ----------------------------------------------------------------- cleanup
    if args.cleanup and created:
        banner("Cleanup: deleting created articles")
        for aid, _ in created:
            try:
                r = requests.delete(f"{base}/api/articles/{aid}", timeout=15)
                tally(check(r.status_code == 200, f"DELETE /api/articles/{aid} -> {r.status_code}"))
            except requests.RequestException as e:
                tally(check(False, f"DELETE {aid} failed: {e}"))
    elif created:
        banner("Created articles (kept — re-run with --cleanup to remove)")
        for _, url in created:
            print(f"  {url}")

    # ----------------------------------------------------------------- summary
    banner("Summary")
    print(f"  {passed} passed, {failed} failed")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
