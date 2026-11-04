# Rajat Patel — Personal Portfolio

A responsive, dark-themed personal portfolio hosted with GitHub Pages.

## Live site

After GitHub Pages is enabled, the site will be available at:

https://rajatpateldev.github.io/personal_portfolio/

## Add a project

Open `script.js` and add an object to the `projects` array:

```js
{
  name: "Project name",
  type: "WEB APP / AI TOOL / LAB",
  status: "LIVE",
  description: "A short, accurate description of the project.",
  url: "https://your-live-project-or-github-repository"
}
```

Use the live product URL when deployed. Otherwise, link directly to that project's GitHub repository. Do not mark a project LIVE until it is publicly accessible.

## Deployment

The GitHub Actions workflow in `.github/workflows/pages.yml` deploys the repository contents to GitHub Pages whenever changes are pushed to `main`.

In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow will then publish the site.

## Customize

- Edit content in `index.html`.
- Change colors, layout and responsive styling in `styles.css`.
- Add project cards in the `projects` array in `script.js`.
