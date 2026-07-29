---
title: Probability, likelihood, and measure
description: Why probability and likelihood are different objects, what MLE is actually doing, and the measure-theory vocabulary that makes densities, PMFs, and Dirac deltas one thing.
kind: note
area: foundations
order: 1
tags: [math]
---

We talk about the **probability** of an outcome. We talk about the **likelihood** of a parameter. Everything below follows from taking that sentence seriously.

## Probability vs. likelihood

Flip a fair coin: the probability it lands heads is $1/2$. Now flip a coin, observe heads, and ask whether the coin is fair — whether the $p$ that generates heads equals $1/2$. For a given value of $p$, its likelihood is the probability that a coin with that $p$ would produce the data we saw.

- The likelihood of $p = 0$ is zero: a coin that never lands heads did not land heads.
- The likelihood of $p = 1$ is one: such a coin lands heads with certainty.

**Maximum likelihood estimation** picks the parameter value that maximizes this. Flip 10 times, see exactly 5 heads: for any $p$, ask what the probability is that such a coin produces exactly 5 of 10 heads. Both $p = 0$ and $p = 1$ have likelihood zero — neither can produce a mix. The maximum sits at $p = 1/2$, so MLE guesses $p = 1/2$.

The same expression $P(x \mid \theta)$ means two different things depending on what is held fixed:

| Held fixed | Varying | What it is |
|---|---|---|
| $\theta$ | $x$ | a probability distribution over data |
| $x$ | $\theta$ | a likelihood function over parameters |

### Likelihood is not a PDF

It uses the same formula, but it does not integrate to 1 over the parameter space. A valid PDF/PMF describes the distribution of *outcomes* for a fixed parameter. A likelihood measures how well a parameter *explains* the data — support, not probability.

Likelihood becomes a genuine probability density over parameters only after Bayes: multiply by a prior, divide by the evidence, and you have a posterior. Plausibility of a parameter value is a posterior statement, never a likelihood statement.

Once you move to continuous distributions, likelihood stops being a probability at all. And since we only ever want to maximize it, we usually write it in a form that is merely *proportional* to the true likelihood. The purpose of a likelihood function is to be maximized; a single likelihood value on its own means very little, only whether it is bigger or smaller than another one.

> [!note] The intuition I keep
> Finding a face-down red card and asking "what is the likelihood this is a heart, given it's red?" The answer depends on the composition of the deck. Likelihood is always conditional on prior structure — it tells you how well evidence supports a claim, not whether the claim is true. Dinosaur footprints on Mars raise the likelihood that dinosaurs lived there; they do not establish it.

## Priors and the regularizers they become

Putting a prior on the parameters and taking the MAP estimate recovers the standard regularizers:

| Prior | MAP equivalent |
|---|---|
| Gaussian | L2 / ridge |
| Laplace | L1 / lasso |
| Uniform | plain MLE |

## Cross-entropy, KL, and negative log-likelihood

For classification we train with cross-entropy. KL divergence would give identical gradients, because

$$D_{KL}(p \,\|\, q) = H(p, q) - H(p)$$

and $H(p)$ — the entropy of the data distribution — does not depend on the model. Same gradients, same optimum, so the constant is simply dropped.

In exclusive $k$-way classification this degenerates further into negative log-likelihood. People usually derive NLL not from KL or cross-entropy at all, but directly from maximizing the probability of labels conditioned on inputs. The log shows up because data is assumed i.i.d., so summing log-probabilities is the same as multiplying independent probabilities.

## The measure-theory vocabulary

Probability is about assigning *mass to sets*. But PDFs assign density to points, PMFs assign probability to individual values, some distributions do both, and some do neither. Measure theory is the framework that covers all of it.

A measure $\mu$ satisfies three things: non-negativity, $\mu(\varnothing) = 0$, and countable additivity. A probability measure adds the requirement $\mu(\Omega) = 1$.

Why PDFs and PMFs alone are not enough:

- a PMF is defined only on countable sets, $P(X = x_i)$;
- a PDF is defined only when the distribution is absolutely continuous, where any single point has probability 0;
- neither expresses mixtures (a point mass plus a continuous part), empirical distributions, or singular distributions cleanly.

**A PDF is not a probability distribution.** It is a density with respect to Lebesgue measure. A PMF is also a density, just with respect to counting measure. Different base measure, same structure — which is why what we actually care about is $P$, not $p(x)$.

### The Dirac delta

The delta is not a function. It is a distribution (a generalized function) defined by how it behaves inside integrals: all mass at one point, zero elsewhere, total mass 1. A PMF embedded in a continuous space.

| PMF | Delta |
|---|---|
| $P(X = x_i) = 1$ | $\delta(x - x_i)$ |
| sum | integral |
| discrete domain | continuous domain |

An **atom** is a point with positive probability mass, and an atomic measure is one concentrated on atoms — a PMF rewritten in continuous notation.

| Concept | Meaning |
|---|---|
| space $\mathcal{X}$ | where values live |
| measure $P$ | assigns probability to sets |
| PDF | density w.r.t. Lebesgue measure |
| PMF | density w.r.t. counting measure |
| delta | density of a point mass |
| atomic measure | probability concentrated at points |

This matters because ML papers need one notation that covers continuous models, discrete datasets, mixtures, and empirical distributions at once. Everything becomes an integral, and deltas are what make that legal.

A **mixture distribution** picks a component at random and samples from it. An **empirical distribution** is the special case that puts equal mass on each observed data point using deltas.

## Connecting it to other concepts

### KL divergence breaks

$D_{KL}(P \,\|\, Q)$ is infinite wherever $P$ has mass and $Q$ assigns zero probability. Take $P$ = the empirical distribution (atomic) and $Q$ = a continuous model with a PDF: $D_{KL}(P \,\|\, Q) = \infty$.

That single fact explains why MLE works but reverse KL does not, why diffusion models avoid KL in data space, and why score matching exists at all.

### Diffusion and score matching

Diffusion models never model $\log p_{\text{data}}(x)$, because $p_{\text{data}}$ is atomic and $\nabla \log \delta(x - x_i)$ is undefined. You cannot differentiate the logarithm of a delta — it is a distribution, not a function.

MLE sidesteps this: it never computes $\log p_{\text{data}}$, only $\log p_\theta(x)$ evaluated *at* data points. That is legal, because $p_\theta$ is continuous and $x$ is just a point you plug in.

Diffusion wants $\nabla_x \log p_{\text{data}}(x)$, so the fix is to smooth the measure by adding noise, $x_t = x_0 + \epsilon$. This turns atomic $p_{\text{data}}$ into a smooth $p_t$ that has a density, a finite log, and a well-defined gradient.

So you can compute $\log p(x)$ and $\nabla \log p(x)$ when:

- **A — a known continuous distribution**: Gaussians, flows, VAE decoder likelihoods, diffusion after noise is added.
- **B — a model density evaluated on data** (the MLE setting): $p_\theta$ is continuous, $x$ is a point.
- **C — the score of a smoothed data distribution** (diffusion).

And you cannot when the distribution is empirical/atomic, or mixed with an atomic part.

### Reinforcement learning

Policy gradients are the same story from the other side. The state visitation distribution $d^\pi(s)$ is induced by environment dynamics: often unknown, often empirical (a replay buffer), rarely smooth. We never compute $\nabla_s \log d^\pi(s)$ — it is inaccessible, non-smooth, and frequently undefined.

In diffusion we can learn a gradient field over a smooth data distribution. In RL, the visitation distribution is implicit, non-differentiable, and policy-dependent, so instead of differentiating the environment distribution we push gradients through the policy via the policy gradient theorem. Gradients move through the policy, value functions, and learned critics — never through the environment.

## Still owe myself

- What exactly is the difference between a PDF and a likelihood?
- Derive the MLE for the mean of a normal distribution.
- Write down Bayes' theorem from memory, then the MAP/regularizer correspondence above.
- Write down a simple MLP layer. Why is a non-linearity required?

## Sources

- [Likelihood and Probability](https://jaketae.github.io/study/likelihood/) — Jake Tae. His blog in general is very good.
