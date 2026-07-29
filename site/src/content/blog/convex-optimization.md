---
title: Convex optimization
description: Convex sets, duality, and the conditions that make an optimization problem tractable. Working through Boyd & Vandenberghe.
kind: note
area: foundations
order: 2
wip: true
tags: [math]
---

> [!note] In progress
> Nothing written up yet. This is a placeholder for notes I am actively taking.

Working through the Stanford convex optimization textbook (Boyd & Vandenberghe). Also using [this](https://publish.obsidian.md/alto/AMATH+515+Optimization+Fundamentals/Basic+Convexity/Introduction+to+Convexity) as a resource.

What I want out of it:

- convex sets and convex functions — what actually makes a problem convex, rather than pattern-matching on the form
- Lagrangian duality, and why the dual is always convex even when the primal is not
- KKT conditions, stated properly rather than recalled as a slogan
- gradient descent, Newton's method, and interior point methods, and why the choice depends on problem structure
- where the convexity assumption breaks in deep learning, and what survives anyway

The reason this sits under foundations rather than a curiosity: nearly everything in [what models optimize](/blog/what-models-optimize) is a non-convex problem attacked with tools built for convex ones, and I would rather understand the gap than route around it.
