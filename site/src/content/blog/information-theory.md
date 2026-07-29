---
title: Information theory
description: Entropy, mutual information, and the coding view of the losses we already train with. Placeholder for notes in progress.
kind: note
area: foundations
order: 3
wip: true
tags: [math]
---

> [!note] In progress
> Nothing written up yet. This is a placeholder for notes I am actively taking.

I keep using the vocabulary without having derived any of it. Things to work out properly:

- entropy as expected surprise, and why the log is not an arbitrary choice
- cross-entropy and KL divergence from the coding perspective — bits wasted using the wrong code — rather than as formulas that happen to share gradients
- why KL is not a metric, and when the asymmetry actually matters in practice
- mutual information, and what contrastive objectives like InfoNCE are really bounding
- the data processing inequality, and what it says about representation learning

This overlaps heavily with [probability and likelihood](/blog/probability-and-likelihood), which already covers the $D_{KL}(p \,\|\, q) = H(p, q) - H(p)$ identity and where KL blows up. The goal here is the coding intuition underneath it.
