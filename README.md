# Item Issue Register — Issue Dashboard

A static, self-contained web app for tracking store/inventory issue entries
(who took what, when it's due back, and its status).

## Files

```
index.html      Main page (open this / point your domain here)
css/style.css   All styling
js/app.js       All behaviour: data, table rendering, search, modal form
README.md       This file
```

## How it works

- Data is stored in the visitor's browser via `localStorage` — no backend or
  database required. Seeded with 7 example entries on first load.
- **+ New Issue Entry** opens a form; on save it's added to the top of the
  register and the stat cards recalculate.
- Each row's **Return Date**, **Received By**, and **Status** are editable
  inline. Marking Status as "Returned" auto-fills today's return date if
  empty; changing it back reopens the return date/received-by fields.
- An entry becomes **Overdue** automatically once its due date has passed
  and it hasn't been marked Returned.
- The search box filters by item, person, or purpose.
- ✎ edits an entry's core details; 🗑 deletes it (with confirmation).

## Hosting it

This needs no server-side code — any static host works:

1. Upload the whole folder (keeping the `css/` and `js/` paths intact) to
   your web host's public directory (often called `public_html`, `www`, or
   `htdocs`).
2. Make sure `index.html` sits at the root of that directory so your domain
   loads it by default.
3. Open your domain — done.

Works equally well on GitHub Pages, Netlify, Vercel, or a plain shared-hosting
FTP upload.

## Notes for going further

- **Multi-user / shared data:** `localStorage` is per-browser only. To make
  the register shared across staff and devices, swap the `loadEntries` /
  `saveEntries` functions in `js/app.js` for calls to a small backend API
  (PHP + MySQL, Node + a database, Google Sheets API, Airtable, etc.).
- **Login:** the top-right account badge is currently static display only —
  wire it up to real authentication if multiple storekeepers need separate
  logins.
