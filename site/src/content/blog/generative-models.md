---
title: Diffusion, GANs, and what each buys you
description: Why diffusion optimizes a proxy instead of a likelihood, the things GANs still do better, and the customization techniques stacked on top of image models.
kind: note
area: models
order: 3
tags: [diffusion]
---

## Diffusion optimizes a proxy

Diffusion models do not maximize likelihood directly. The likelihood exists but is intractable, so what actually gets optimized is a variational lower bound that reduces to a denoising MSE in noise space.

The reason is measure-theoretic. $p_{\text{data}}$ is atomic — a sum of deltas on the training points — so $\nabla_x \log p_{\text{data}}(x)$ does not exist. Adding noise, $x_t = x_0 + \epsilon$, smooths the measure into something with an actual density, a finite log, and a well-defined score. That is the whole trick, and [the measure note](/blog/probability-and-likelihood) has the longer version.

The chain worth being able to walk both directions: ELBO → Jensen → KL terms → DDPM, then DDPM → DDIM → flow matching, and SDE → ODE.

**Video diffusion** extends this to the temporal axis, usually by adding temporal attention layers or conditioning on previous frames, with coherence across frames as the thing that is hard.

## What GANs still do better

GANs are harder to train, prone to mode collapse, and usually lower quality than diffusion. But there are real advantages that get forgotten:

- They work well on narrow distributions — aligned faces being the classic case — even at small model sizes.
- They interpolate continuously in latent space out of the box. Diffusion can be hacked into something similar; StyleGAN 3 just does it.
- They appear to use data more efficiently, and can produce better results on smaller datasets.
- Inference is fast.
- You can embed real data *into* the GAN, converting an image to a point in latent space. That enables unusual control, and extreme compression.

### Why the interpolation property matters

A GAN turns a list of random numbers — say 512 of them — into an image. Each list is the fingerprint of a unique image, and in a well-trained GAN, individual entries end up corresponding to semantic attributes. Entry #331 might be "glasses," where 0 is none and 1 is very thick ones. Set it to 0.6 and you get something in between, more or less regardless of the rest of the list.

This does not really make sense — you either wear glasses or you do not — but the GAN does it anyway. And there will be similar entries for hair color, gaze direction, eye color. The mapping is not always clean, but it is usually not hard to find combinations that do what you want.

Because you can invert a real image into a latent, you can edit real photos by twiddling entries. GANs are fast enough to do this in real time, and changing one entry leaves everything else intact, so you can slide glasses from 0 to 1 and stop exactly where it looks right. That same property makes animation nearly free: vary one entry slightly per frame and the result is automatically coherent — a mouth opening and closing without the rest of the image falling apart.

Diffusion struggles badly here. Normally you encode the edit into a prompt, fiddle with prompt weights, and hope. There is no direct handle. It is a large part of why diffusion video still looks the way it does.

## Customization

**LoRA** — freeze the pretrained weights and inject trainable low-rank decomposition matrices into the layers. Far fewer trainable parameters and much less memory. Also the workhorse of LLM finetuning; see [post-training](/blog/post-training).

**DreamBooth** — personalizes a text-to-image model so it can synthesize a specific subject in new contexts from only a few images, while keeping the subject's identifying features.

## Worth remembering

Diffusion and flow-based policies have an energy-based formulation, which means multiple models can be composed at test time by summing their scores. That is the property VLA research keeps reaching for when it wants to combine policies at test time — discrete autoregressive policies have no equivalent operation.
