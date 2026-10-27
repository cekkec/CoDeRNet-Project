# CoDeRNet Project Page

Project page of **CoDeRNet** (NeurIPS 2026): joint change detection and change captioning on bi-temporal remote-sensing images with Confidence-Decomposed Routing.

- Website: https://cekkec.github.io/CoDeRNet-Project/
- Code: https://github.com/cekkec/CoDeRNet

The page is plain static HTML/CSS/JS (no build step) based on the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) (commit `d38af1c`, September 2025).


## Folder structure

```
CoDeRNet-Project/
├── index.html                  # the whole page (all text, links, BibTeX, meta tags)
├── .nojekyll                   # serve files as-is on GitHub Pages (no Jekyll processing)
├── README.md
└── static/
    ├── css/
    │   ├── index.css           # template styles; page-specific rules at the end ("CoDeRNet project page additions")
    │   ├── bulma.min.css       # Bulma 0.9.1 (template)
    │   └── ...                 # bulma-carousel / bulma-slider / Font Awesome (template)
    ├── js/
    │   ├── index.js            # template script + copy buttons + click-to-enlarge figures
    │   └── ...                 # bulma-carousel / bulma-slider / Font Awesome (template)
    ├── webfonts/               # Font Awesome 5.15.1 woff2 files (missing from the template)
    └── images/
        ├── overview1.png             # teaser: architecture overview
        ├── overview2.png             # Method: Confidence-Decomposed Routing block
        ├── table1_levir_mci.png      # Table 1
        ├── table2_whu_cdc.png        # Table 2
        ├── abl1.png                  # ablation: joint training and CoDeR
        ├── abl2.png                  # ablation: cross-task interaction operators
        ├── qualitative_levir_mci.png # qualitative results, LEVIR-MCI
        ├── qualitative_whu.png       # qualitative results, WHU-CDC
        ├── khu_logo.png              # Kyung Hee University logo (end of page)
        ├── ami_lab_logo.png          # Augmented Intelligence Lab logo (end of page)
        ├── social_preview.png        # 1200x630 link preview (Open Graph / Twitter), made from overview1.png
        ├── favicon.ico
        └── apple-touch-icon.png
```

All paths in `index.html` are relative (`static/...`), so the page works both at the site root and under the `/CoDeRNet-Project/` sub-path of GitHub Pages. Do not start resource paths with `/`.


## Run locally

```bash
cd CoDeRNet-Project
python3 -m http.server 8000
# open http://localhost:8000/
```

Opening `index.html` directly from disk also renders the page, but a local server is closer to GitHub Pages (and the copy buttons need it in some browsers).


## Editing the content

Everything is in `index.html`; each part of the page is a `<section>` with an id:

| Section | id | Background | Notes |
|---|---|---|---|
| Title, authors, venue, link buttons | (first `section.hero`) | white | Paper → arXiv 2610.34876 |
| Overview figure | `overview` | white | `overview1.png` |
| Abstract | `abstract` | grey | no description line |
| Confidence-Decomposed Routing | `method` | white | `overview2.png` and three cue cards |
| Quantitative Results | `results` | grey | Table 1 (LEVIR-MCI), Table 2 (WHU-CDC) |
| Ablation Study | `ablation` | white | Table 3(a) and Table 4(b) side by side (`.figure-row`, stacked below 1024px) |
| Qualitative Results | `qualitative` | grey | LEVIR-MCI and WHU-CDC figures |
| BibTeX | `bibtex` | white | copy button in the code block |
| Acknowledgements | `acknowledgements` | grey | compact section with the Kyung Hee University and lab logos |

Every content section uses the same structure, so a new one can be added by copying an existing section:

```html
<section class="section page-section" id="new-section">        <!-- add "hero is-light" for a grey background -->
  <div class="container is-max-widescreen">                     <!-- is-max-desktop for text-only sections -->
    <header class="section-header">
      <h2 class="title is-3">Section Title</h2>
      <p class="section-description">One or two short lines.</p>
    </header>
    <div class="section-text content has-text-justified"><p>Body text.</p></div>
    <!-- figures -->
  </div>
</section>
```

Keep the white / grey alternation when sections are added or removed. Table captions go above the table (`figcaption.table-caption` before the image: a bold title line, then the description); figure captions go below the figure. On phones, cards with `is-scrollable` keep a minimum width (`--min-w`, default 760px) and scroll horizontally inside the card.

The title and abstract follow the arXiv version ([2610.34876](https://arxiv.org/abs/2610.34876)). If the title changes, update every copy of it: the hero subtitle, `<title>`, the `title` / `og:title` / `twitter:title` meta tags, `citation_title`, the JSON-LD `headline`, and the BibTeX entry. Optional extras (Twitter handles, a "More Works" list) are marked with `TODO (optional)` comments.

### Images

1. Put the file in `static/images/` with a lowercase name without spaces or brackets (e.g. `ablation_routing.png`).
2. Add a figure block; wrapping the image in `a.figure-card.zoomable` gives the card style and click-to-enlarge:
   ```html
   <figure class="figure">
     <a class="figure-card zoomable is-scrollable" href="static/images/ablation_routing.png" title="Click to enlarge">
       <img src="static/images/ablation_routing.png" alt="Short description of the figure" loading="lazy">
     </a>
     <figcaption class="figure-caption"><strong>Figure title.</strong> Caption text.</figcaption>
   </figure>
   ```
3. To replace an existing figure, overwrite the file under the same name (and update the `width`/`height` attributes of its `<img>` if the aspect ratio changes).

Keep single images below a few MB; GitHub Pages has a 1 GB site limit and large files slow down the page.


## Publishing on GitHub Pages

### 1. Create the repository (once)

On GitHub, signed in as `cekkec`: **New repository** (https://github.com/new)

- Repository name: `CoDeRNet-Project`
- Visibility: **Public** (GitHub Pages on a free plan requires a public repository)
- Leave "Add a README", ".gitignore" and "license" **unchecked** (the repository must be empty)

### 2. Push

```bash
cd CoDeRNet-Project
git remote add origin https://github.com/cekkec/CoDeRNet-Project.git
git push -u origin main
```

GitHub asks for a username and a password; the password must be a personal access token (Settings → Developer settings → Personal access tokens) with write access to this repository, or use `gh auth login` / an SSH remote instead.

### 3. Enable GitHub Pages (once)

Repository → **Settings** → **Pages** (left sidebar, under "Code and automation") → **Build and deployment**

- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**

The first deployment takes about a minute (progress in the **Actions** tab, workflow "pages build and deployment"). The site is then available at

**https://cekkec.github.io/CoDeRNet-Project/**

### Updating the site

Edit, check locally, then

```bash
git add -A
git commit -m "Update project page"
git push
```

Every push to `main` redeploys the site automatically.


## Credits and license

- Page template: [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) by Eliahu Horwitz, adopted from the [Nerfies](https://nerfies.github.io/) project page. The template asks to keep the link back to it in the footer, and the website is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/); keep the footer notice in `index.html`.
- [Bulma](https://bulma.io) (MIT), [Font Awesome Free](https://fontawesome.com/license/free) 5.15.1 (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT), [Academicons](https://jpswalsh.github.io/academicons/) (SIL OFL 1.1, loaded from jsDelivr), jQuery (MIT, loaded from Google Hosted Libraries).
- The CoDeRNet code is released separately under the MIT License at https://github.com/cekkec/CoDeRNet.
