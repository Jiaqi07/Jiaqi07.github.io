---
title: What each model is actually optimizing
description: A map of ML paradigms by objective rather than by architecture — which ones are maximum likelihood in disguise, which are bounds, and which are control problems wearing an inference costume.
kind: note
area: models
order: 1
tags: [math, llm]
---

Architectures get the attention, but the objective is what determines how a model behaves. This is the table I keep coming back to.

| Paradigm | What it really optimizes |
|---|---|
| linear / logistic regression | maximum likelihood |
| neural networks (supervised) | maximum likelihood, via cross-entropy or MSE |
| diffusion models | variational bound / denoising score matching |
| reinforcement learning | expected return (utility maximization) |
| energy-based models | partition-function-based likelihood |
| Bayesian models | posterior — MAP or full inference |

## Expanding the interesting rows

**Logistic regression** assumes a Bernoulli likelihood and optimizes the log-likelihood, so its loss *is* cross-entropy. Nothing extra is going on.

**Diffusion models** do not directly optimize likelihood. They optimize a variational lower bound (ELBO) that reduces to denoising MSE in noise/latent space. The likelihood exists but is intractable, so the whole game is optimizing a proxy. See [generative models](/blog/generative-models) for the derivation chain.

**Reinforcement learning** maximizes expected return. That is utility maximization over a Markov decision process — sequential decision-making and control, not inference. RL is not MLE by default. It *can* be written as probabilistic inference (maximum-entropy RL, soft Q-learning, "RL as inference"), where policy $\propto \exp(Q)$, reward corresponds to log-likelihood, and the objective becomes KL minimization. But that is a reframing, not the default.

**LLMs** are autoregressive maximum likelihood. They factorize $p(x) = \prod_t p(x_t \mid x_{<t})$ and train with cross-entropy, which is exactly negative log-likelihood. At training time an LLM is a pure MLE model.

The distinction worth keeping straight:

- **Transformer** → architecture
- **Autoregressive** → factorization
- **MLE / cross-entropy** → objective

Transformers can be trained with any of MLE (LLMs), masked LM (BERT, a pseudo-likelihood), RL (RLHF), or diffusion-style losses.

**Vision-language models** depend on which one. CLIP-likes optimize a contrastive objective (InfoNCE, a mutual-information bound); captioners are autoregressive MLE; multimodal LLMs are token-level MLE across modalities; aligned models are MLE followed by RLHF.

## The fuller map

| Model family | Core objective |
|---|---|
| logistic regression | log-likelihood |
| deep supervised learning | log-likelihood |
| LLMs (autoregressive transformers) | log-likelihood |
| BERT-style models | pseudo-likelihood |
| VAEs | ELBO |
| diffusion models | denoising score matching (ELBO proxy) |
| latent diffusion | VAE + diffusion loss |
| GANs | min–max divergence |
| energy-based models | unnormalized likelihood |
| CLIP / contrastive models | mutual information |
| imitation learning | KL to the expert |
| reinforcement learning | expected cumulative reward |
| RLHF | return + KL regularization |
| multimodal foundation models | hybrid |

Architectures, objectives, and training paradigms are now modular and composable — a VAE inside a diffusion model, a transformer inside a diffusion model (DiT), an LLM plus RL, an LLM plus a vision encoder, contrastive pretraining followed by generative finetuning.

## Inference problems vs. control problems

This is the split I find most clarifying.

**Inference problems** — linear and logistic regression, VAEs, LLMs, energy-based models, diffusion. Density estimation: the data is given, and the objective is to match a distribution. *What data distribution explains what I see?*

**Control problems** — reinforcement learning, control theory, robotics, AlphaZero. You take actions that change future data, aiming to maximize expected return. Sequential, causal, time-coupled, optimized under intervention rather than observation. *What actions should I take to achieve high reward?*

Many hybrid methods minimize something that looks like inference (a KL) but behaves like control (reward maximization).

The takeaway I actually walk away with:

- classical ML = inference
- classical RL = control
- modern foundation models = an inference core with control overlays

LLMs start as MLE, get RLHF bolted on, and then get used as planners, agents, and controllers. Vision-language-action models are the same pattern pointed at a robot.

## Vocabulary that keeps recurring

**Likelihood** — the probability of observing data given parameters. Maximized in MLE. ([more](/blog/probability-and-likelihood))

**ELBO** — the evidence lower bound, the central object in variational inference. A lower bound on the marginal likelihood of the data; maximizing it is equivalent to minimizing the KL between the approximate and true posterior.

$$\text{ELBO} = \mathbb{E}_q[\log p(x, z)] - \mathbb{E}_q[\log q(z \mid x)]$$

**Jensen's inequality** — for convex $f$, $f(\mathbb{E}[X]) \le \mathbb{E}[f(X)]$; for concave $f$ the inequality reverses. It is what makes the ELBO a bound, since $\log$ is concave.
