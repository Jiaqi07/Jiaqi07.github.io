---
title: RL reading group
description: Running notes from reading group — depth scaling in contrastive RL, TD-JEPA, curriculum learning for RLVR, and skill-driven state abstractions. Discussion included, objections included.
kind: note
area: research
order: 2
tags: [rl, papers]
---

Notes taken live, so these are closer to transcripts than summaries. Open questions are left open on purpose.

## 1000 Layer Networks for Self-Supervised RL

[arXiv:2503.14858](https://arxiv.org/abs/2503.14858) — *Scaling Depth Can Enable New Goal-Reaching Capabilities*

**Contrastive RL, briefly.** States, actions, goals. Encode the state-action-goal triple and contrast it against states, actions, and goals *not* reached from there. Take a trajectory, take a state-action pair, sample a goal from later in the sequence. Reachable pairs should have higher similarity, unreachable ones lower, and the policy is trained to maximize reaching those states. Semantics play no role in this paper.

**The value function is strange.** Usually a value function is optimal or policy-conditioned. Here it is neither, so the honest interpretation is that it encodes some notion of reachability, or a mixture. You lose optimality guarantees — and mostly do not care, since success rates do not reward shortest paths.

Because goals are sampled from anywhere later in the trajectory, you hope to get smoothing across all reachable states. The guarantee is sketchy.

Most of the paper is neural network engineering: add residuals, then scale depth. Depth scaling far outperforms width scaling, to the point of trivializing problems that are hard at shallow depth.

**Questions that came up and did not get resolved:**

- Why are deeper networks better at *stitching*?
- Is this plasticity? RL explores early, and a shallow network may exhaust its plasticity in that phase. If the value function goes smooth early, exploration stops. So is a plasticity problem really an exploration problem?
- Learning online is the cross product of the optimization region and the data you have seen. Bad early data might trap a shallow network in a local minimum; a deep network has more saddles and more variety, so perhaps it falls out faster.
- Deep networks are less smooth, so policies churn — but the experiments do not show the damage you would expect.
- Hard and soft negative mining is not accounted for at all.
- What we treat as unreachable from a sampled trajectory could well be reachable. The paper depends on a data assumption of broad goal coverage.
- How much does contrastive vs. IQL matter here? Contrastive is the more stable and simpler reward.

**Discussion.** Some skepticism that this was best paper, since earlier work already hinted that general normalization plus residuals would let you scale depth. There was also a note that standard SAC with a standard layer setup has become hard to publish against — if you are training vanilla SAC from stable-baselines, you are arguably trying to make it fail.

Environments are extremely narrow — standard goal-reaching tasks only — and contrastive RL is goal-reaching by construction, so generalization beyond that is an open question.

The consensus takeaway: **scaling works, with normalization and residual connections.**

Why a ResNet rather than a transformer? You could tokenize each state and use a ViT. MLP → ResNet is trivial; MLP → transformer is not.

## TD-JEPA

[arXiv:2510.00739](https://arxiv.org/abs/2510.00739) — *Latent-predictive representations for zero-shot RL*

**JEPA** = joint-embedding predictive architecture. Two encoders (potentially multimodal) project into a shared space, plus a predictor that takes a latent $z$ and predicts the corresponding embedding, with a loss between the two predictions. Rather than a single $z$, you optimize over a set of latents. Importantly, $z$ is optional and the training target is $s_y$ — there is no pressure to reconstruct $y$ itself.

**Zero-shot RL / behavior foundation models.** Assume the set of all reward functions is linear in a given feature. Then $Q$ can be written as a dot product between a successor measure and the reward function. Instead of a cumulative sum of rewards, you fold the sum into the distribution itself — either sample a state from the successor measure of future states, or sample a trajectory directly and multiply. $F$ is conditioned on the policy and the state features it draws from. The policy update is an argmax conditioned on $z$: take $F(s, a, z)$ and maximize the resulting $Q$. At test time, any reward function yields a closed-form $z$, so you get an optimal policy by lookup.

**Monte Carlo JEPA.** Train a state encoder $\phi: S \to \mathbb{R}^{d_\phi}$ — Monte Carlo because you are rolling out. A single state $s^+$ is sampled from the future successor measure, and you are asking what proportion of time you spend in that next state. Solve the MC objective and the predictor works for any $\phi$. Since successor features $F$ obey a Bellman equation, the Monte Carlo form can be rewritten as a temporal difference, which gives the TD-JEPA objective.

**Why two encoders.** The claim is that task and state embeddings should differ: task space defines the reward space (high-level features, topology, location), state space defines dynamics and controllability (low-level dynamics). For a drone you want $Q$ conditioned on joints and low-level dynamics; if the goal space is just locations, the task space should not care about joint embeddings at all. So $\psi$ predicts future *task* embeddings rather than $\phi$ — the same Monte Carlo objective, just separated.

This is the point of confusion. Everyone before this paper used one encoder. Both encoders use the same loss, and nothing in the objective says one should be more dexterous than the other. If you swapped $\phi$ for $\psi$ in the reward-computing loss, would anything change? Unclear. Possibly it would work if you added a defined set of priors — forced behaviors, and enforcement that it predict the distribution of tasks you care about.

### Theoretical analysis

Everything moves from functions to matrices.

**Theorem 1 (optimum for MC-JEPA).** Two takeaways: the optima from MC-JEPA and from score matching are projections of the successor representation onto $\phi$ and vice versa; and the gradients of the two are the same.

Objections raised:

- It assumes $\phi$ and $\psi$ are orthonormal matrices — so would $d_\phi$ and $d_\psi$ not both have to be $|S|$?
- The projection notation only makes sense if $d_\phi = d_\psi$. If the dimensions must match, why have two different embeddings at all?
- "Orthogonal projection" implies the space of $\psi$ is a subspace of the successor features of $\phi$, and vice versa.
- Is $\psi^\top T_z \phi$ an SVD of $M^{\pi_z}$, or is $T_z$ simply diagonal? That would make $\phi$ a basis for the successor features of $\psi$, and vice versa.

**Theorem 2 (non-collapse).** If one predictor trains faster than the other, the projection trains faster, and at every step you assume a perfect minimum-loss solution. The proof converts the loss into matrix equations and then into an ODE. All you need for non-collapse is that the covariance is zero — differentiate $\phi_t^\top \phi_t$ and set the objective derivative to zero. Adapted from Tang et al., *Understanding Self-Predictive Learning for RL* (ICML 2023), with one additional assumption.

The additional variable preventing collapse works because the encoders are orthonormal and independent, and the updates to $\phi$ and $\psi$ are analyzed completely independently — each assuming the other is constant. But if independence is what buys you non-collapse, why go to the trouble of two encoders rather than one? Harder to train, maybe, but the argument for two is still not landing for me.

There is no ablation removing the orthogonalization loss, and apparently it does not work without it. Every paper in this feature-prediction line requires an orthogonalization loss.

### Results

Performance is averaged across environments, each of which admits multiple sampleable reward functions. TD-JEPA has better than a 50% chance of improving over every other method in the table.

Is this just an auxiliary reward? Not exactly — the encoders are not trained to predict reward directly. The policy uses the encoder and trains against reward with a $Q$ function, so effectively you learn a representation and run standard RL on it. Relative to the earlier work, the TD loss replaces a contrastive loss.

**Where I land.** Does TD-JEPA work? The experiments say not really. It works on OGBench, which is low coverage, and performance does not improve massively over FB. TD3 already does well in these environments, so the asymptotic gains are hard to attribute. I am genuinely curious how they got any of these methods working on OGBench — the presenter had spent time on FB and RLDP without success, even with TD3-BC-based inference. What it does open up is a way to learn successor measures with objectives that scale.

## CurES

*From Gradient Analysis to Efficient Curriculum Learning for Reasoning LLMs* (OpenReview)

Adaptively samples prompts to speed up RL training for LLMs, derived from optimizing the gradient under a KL constraint.

**The setting.** RLVR has a sparse reward signal, high rollout cost, and KL-constrained updates. Each prompt may need multiple rollouts, as in GRPO, so compute scales with $m \times n$ — prompts times rollouts per prompt. Binary rewards make the gradient estimator high variance, which turns curriculum design into a **compute allocation problem**.

The default in LLM post-training is uniform sampling, $1/|D|$, which implicitly claims every prompt is equally useful. In practice easy prompts give low gradient magnitude and impossible prompts give high variance with no signal.

**Prior work, and the objections to it:**

- *SPEED* — drop prompts with $p \approx 0$ or $p \approx 1$. But then the rollout batch keeps shrinking.
- *Gradient variance minimization* — allocate more rollouts to low-accuracy prompts. The paper argues this is not efficient.
- *Progressive curricula* — hand-designed, predetermined stages.

The shared limitations: heuristics, partial optimization (sampling or allocation but not both), and nothing derived from an optimization bound.

**Contributions.**

1. *Optimization potential under a KL constraint.* An improvement bound depending only on reward variance — **assuming binary rewards** — of the form $|\Delta L| \le \sqrt{2\beta p(x)(1 - p(x))}$, where $p(x)$ maps model weights to success probability.
2. *Sampling as an explicit optimization problem.* Given that bound, there is an optimal sampling distribution $p^*(x)$, proportional to the optimal likelihood of sampling that prompt.
3. *Rollout allocation as variance control.* Minimize the trace of the gradient estimator's variance subject to $\sum_i n_i = N$; this has a closed form proportional to $N$.
4. *Bayesian online difficulty estimation.* Model difficulty with a Beta posterior, $p(x) \sim \text{Beta}(\alpha, \beta)$. The posterior decays, so it weights initial values less as the model improves.

Empirically: +3–5 points over GRPO, faster convergence, robust across model sizes.

**The derivation.** Keep $D_{KL}(\pi_{\text{old}} \,\|\, \pi) \le \delta$. Take a first-order Taylor expansion on $L$ and a second-order expansion on the KL, and the Fisher information matrix appears. The natural gradient solution upper-bounds the maximum achievable loss decrease for a single prompt under the KL constraint — which is exactly what you want when deciding which prompt is worth sampling. Then lift from a single prompt to a dataset-level bound. Prompts get more rollouts when reward variance is high or the gradient norm is large.

**The algorithm.**

- *Stage 1, parameter estimation.* For each prompt: sample $N'$ rollouts, update the Beta posterior, compute $p^*(x)$ and $n_i$.
- *Stage 2, large-scale training.* Per step: sample prompts using $p^*(x)$, allocate rollouts using $n_i$, update posterior counts, perform the policy update. Warm-start the posterior from Stage 1.

The principle underneath: do not assume what is easy or what will help your model. Measure how it is performing, then sample by importance.

**Staleness.** $\theta$ shifts during training, so estimates go stale. The fix is to partition the dataset into $T$ subsets, train sequentially across them, and reset estimation at each iteration. This mitigates distribution shift, keeps the posterior from becoming overconfident, and bounds estimation cost. You can also read the whole thing as a multi-armed bandit.

**Why separate stages?** Preventing instability from a rapidly shifting $p(x)$ makes sense, and so does allowing a structured curriculum update. The claimed reduction in compute overhead I do not follow — you are warm-starting anyway.

## Skill-Driven Neurosymbolic State Abstractions

[OpenReview](https://openreview.net/pdf?id=ggP2r9S9wY)

**Background: the options framework.** An option is an initiation set, an option policy, and a termination condition. (Compare HIQL, where the implicit version can start anywhere and terminates when it runs out.)

**Skills vs. options.** Skills are temporally extended, and the paper tries to avoid formalizing them as an atomic set of options. Skills are not well defined; options are rigorously defined. That gap is the whole tension.

**The idea — a skill-symbol loop.** Define an abstract state $s$ as the set of states where an abstract action $a$ can be executed, i.e. its initiation set. This gives you an abstract MDP that stays grounded in the properties of the underlying MDP.

The catch is that defining skills is intractable, so instead you ground representations by when skills start and terminate: the termination of one skill is the initiation of another. One skill ends where another begins.

> [!note] Incomplete
> My notes stop here. Needs a second pass on the actual method and results.
