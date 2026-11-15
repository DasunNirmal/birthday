NIRASHA BIRTHDAY PAGE — CAT KNIGHT PERFORMANCE FIX

Run:
  python run.py

Then open the localhost URL printed by the script.

Performance changes:
- Cat Knight data is decoded only when Section 03 approaches the viewport.
- Knight rendering samples every second ASCII cell (half width and height).
- Knight playback renders at 15 FPS by using every second source frame.
- The knight player pauses when Section 03 is off-screen.

The source animation, colour palette, overall section layout, cake, hero, photo,
butterflies, text and other effects are retained.
