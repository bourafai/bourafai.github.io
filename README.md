# bourafai.github.io

Personal site of Aymene Bourafai, product engineer: https://bourafai.github.io/

One static page, no build step, no dependencies. The left panel is a terminal with a small scripted agent: ask it questions in plain words or type Linux commands. The right column lists posts and projects.

Designed and coded by AI agents, from a human brief.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Add a post

Add an `<article>` to the right column of `index.html`, newest first:

```html
<article>
  <time datetime="2026-11">November 2026</time>
  <h2><a href="/posts/my-post.html">My post title</a></h2>
  <p>One or two sentences that sum up the post.</p>
</article>
```

The terminal reads the page, so the post shows up in `ls`, `cat` and autocomplete with no other change. The file name comes from the title (`my-post-title.md`).

## Files

| File | Role |
|---|---|
| `index.html` | The page: layout, styles, terminal input and autocomplete |
| `eggs.js` | The agent's answers, Linux command jokes and the easter eggs |

The design prototypes that led to this page live on the [`prototypes`](https://github.com/bourafai/bourafai.github.io/tree/prototypes/prototypes) branch.

## Deploy

GitHub Pages serves the `main` branch as is. A push to `main` goes live within a minute or two.

## Easter eggs

There are a few. The terminal knows where they are.
