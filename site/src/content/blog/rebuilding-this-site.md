---
title: Rebuilding this site (and how writing works here now)
date: 2026-07-27
tags: [meta, site]
---

This site is a pile of Markdown files now. The old version was a React app, and adding anything meant editing components. By the time I finished fiddling with JSX, I didn't feel like writing anymore. The new one is [Astro](https://astro.build) rendering static pages. Every post, including this one, is a note dropped into a folder and pushed.

I write in Obsidian, so the pipeline is built around it. A file needs *zero* frontmatter: the title falls back to the first `# heading` (or the filename), the date falls back to the file's first git commit, and the description gets lifted from the opening paragraph. Wikilinks, embeds, highlights, and callouts all work.

> [!tip] The 10-second publishing loop
> Write a note in Obsidian → drag the `.md` into `site/src/content/blog/` → `git push`. GitHub Actions builds and deploys the rest.

## Things a research blog should render

Math, because the PPO clipped objective shows up in basically everything I do:

$$
L^{CLIP}(\theta) = \hat{\mathbb{E}}_t\left[\min\left(r_t(\theta)\hat{A}_t,\ \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t\right)\right]
$$

Code, with proper highlighting:

```python
def masked_policy_step(obs, mask, policy):
    """Physics-aware action masking, the one-liner version."""
    logits = policy(obs)
    logits[~mask] = -float("inf")   # invalid actions never get sampled
    return torch.distributions.Categorical(logits=logits).sample()
```

And ==highlights==, footnotes[^1], and callouts for the load-bearing caveats:

> [!warning] Reproducibility disclaimer
> If a plot in a post disagrees with the paper, trust the paper. Posts are lab notes, not camera-ready.

## Why bother

Papers are where results end up, but most of research happens between papers: negative results, tooling, half-formed intuitions. I wanted a place for that stuff. If any of it is useful to you, or wrong, [email me](mailto:alanjiach@gmail.com).

[^1]: Footnotes render like this, tucked at the bottom.
