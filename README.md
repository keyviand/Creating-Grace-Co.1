# Creating Grace Co. — GitHub Pages + Decap CMS

This version keeps the website on GitHub and adds an owner admin page:

```text
yourwebsite.com/admin
```

Your wife can edit products, prices, photos, and website text from the admin page without touching code.

## Important truth

GitHub Pages alone is static. The `/admin` page can be added, but secure login needs GitHub/Decap authentication.

This package uses Decap CMS with the GitHub backend. That means your wife needs:
- a GitHub account
- permission to edit the repository
- Decap/GitHub authentication configured

Public visitors cannot edit the site.

## Files that matter

- `index.html` — public website
- `products.json` — product list Decap edits
- `site-settings.json` — business text/contact info Decap edits
- `admin/index.html` — Decap CMS admin page
- `admin/config.yml` — Decap CMS settings
- `images/uploads` — uploaded product photos

## Setup steps

### 1. Upload to GitHub

Upload all files to your GitHub repository.

### 2. Edit `admin/config.yml`

Change this:

```yml
repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
```

Example:

```yml
repo: mmorgan824/creating-grace-co
```

### 3. Turn on GitHub Pages

Go to:

```text
Settings > Pages
```

Use:
- Branch: `main`
- Folder: `/root`

### 4. Give your wife access

In GitHub:

```text
Repository > Settings > Collaborators
```

Add your wife’s GitHub account.

### 5. Admin login

After the site is live, go to:

```text
https://yourwebsite.com/admin
```

She can edit:
- products
- prices
- categories
- product photos
- status
- homepage text
- about text
- email/phone/social

## About authentication

Decap CMS's GitHub backend needs authentication. Decap's official docs explain that the CMS is a web UI for Git workflow and it uses a Git backend such as GitHub. For GitHub, users must have push access to the content repository.

If login does not work immediately from GitHub Pages, you will need a GitHub OAuth helper. Common choices are:
- Netlify Identity/Git Gateway while still keeping the repo on GitHub
- a small OAuth server
- a Decap CMS OAuth provider

The simplest beginner-friendly route is hosting the same GitHub repo through Netlify while keeping all code in GitHub. But if you want GitHub Pages only, OAuth setup is the part that needs extra configuration.

## How she edits from phone

1. Open the site.
2. Go to `/admin`.
3. Log in.
4. Tap `Store`.
5. Tap `Products`.
6. Add/edit products.
7. Upload photo.
8. Save/publish.

## Custom domain

Use the real domain, usually:

```text
creating-grace-co.com
```

or:

```text
www.creating-grace-co.com
```

Do not use:

```text
creating-grace-co.1.com
```

unless your domain provider specifically gave that as your real domain.
