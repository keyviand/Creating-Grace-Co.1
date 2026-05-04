# Creating Grace Co. GitHub Website

This version is designed for GitHub Pages, but your wife can still update products from her phone without editing code.

## How the editing works

The public website is hosted on GitHub Pages.

Your wife updates products in a private Google Sheet from the Google Sheets phone app.

The public can view the website, but they cannot edit products unless you give them access to the Google Sheet.

## Google Sheet columns

Create a Google Sheet with this exact first row:

```text
name, price, category, description, image, status
```

Example row:

```text
Custom Tote Bag, $35, Bags, Handmade tote bag with custom fabric options, https://your-image-link.com/photo.jpg, Available
```

## How to connect the sheet

1. Create a Google Sheet.
2. Add the column names:
   - name
   - price
   - category
   - description
   - image
   - status
3. On a computer, go to **File > Share > Publish to web**.
4. Choose the product sheet/tab.
5. Choose **CSV**.
6. Copy the published CSV link.
7. Open `app.js`.
8. Paste the link here:

```js
const GOOGLE_SHEET_CSV_URL = "PASTE_LINK_HERE";
```

## How your wife updates from her phone

1. Open the Google Sheets app.
2. Open the product sheet.
3. Change the product name, price, description, status, or image link.
4. The website updates automatically after refreshing.

## Important photo note

The `image` column needs a direct image URL.

Easy options:
- Upload product photos to GitHub in an `images` folder and paste the image path.
- Use a public image link from a photo host.
- Use Canva or another public image link if it displays as an image.

## GitHub Pages upload

1. Create a GitHub repository named something like `creating-grace-co`.
2. Upload these files.
3. Go to **Settings > Pages**.
4. Select branch: `main`.
5. Select folder: `/root`.
6. Save.
7. Your website will publish.

## Custom domain

In GitHub Pages, enter the correct domain, usually:

```text
creating-grace-co.com
```

or

```text
www.creating-grace-co.com
```

Do not use `creating-grace-co.1.com` unless that is truly the domain your provider gave you.
