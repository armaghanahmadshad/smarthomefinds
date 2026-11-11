# How to add content to SmartHomeFinds

This site is built by GitHub Pages (Jekyll). The header, footer, menu and page layout live in
ONE place each, so you only touch the file for the thing you are adding.

## Add a new buying guide  (about 2 minutes)

1. Open the folder `_guides/` on GitHub and click **Add file -> Create new file**.
2. Name it like the web address you want, for example `smart-lighting-guide.md`
   (it will appear at `/guides/smart-lighting-guide.html`).
3. Paste the template from `docs/guide-template.md`, fill in the top part (between the `---` lines), then write the guide below it.
4. Commit. The guide automatically appears on the Guides page, in search, in the sitemap,
   and in the "Keep Reading" list of the other guides.

Use `order:` to control position (1 shows first). The homepage shows the first 3 guides by `order`.

## Add a new guide category

Edit `_data/categories.yml` and copy one block. Use the new `id` in the guide's `category:` line.

## Add a new product

Edit `_data/products.yml`, copy one block, change every field, and upload the photo to `assets/images/`.
Never change an existing `url` or `subid` without checking Admitad first.
Set `featured: true` to show it on the homepage.

## Change the menu or footer links

Edit `_data/navigation.yml`.

## Change the comparison table on the homepage

Edit `_data/comparison.yml`.

## Things you should NOT edit

- `_includes/head.html` contains the Admitad and Pinterest verification tags.
- `googlef2c4e96f42625571.html` is the Google Search Console verification file.
- `assets/js/consent.js` holds the cookie banner and the Google Analytics ID.
