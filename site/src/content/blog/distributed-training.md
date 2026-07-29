---
title: Distributed training and torch.compile
description: What DDP and FSDP actually shard, and why torch.compile is a memory and graph optimization rather than anything to do with attention.
kind: note
area: models
order: 5
tags: [systems]
---

## Finetuning

Take a model pretrained on a large general dataset and continue training it on a smaller task-specific one, leveraging the general features already learned. The whole post-training stack sits on top of this idea — see [post-training](/blog/post-training) for the variants.

## DDP

**Distributed Data Parallel.** The model is replicated on every device, each device processes a different batch, gradients are computed locally and then averaged across all devices to update weights synchronously. Efficient and widely used, and the right default when the model fits on one device.

## FSDP

**Fully Sharded Data Parallel.** Shards parameters, gradients, and optimizer states across devices, so you can train models too large to fit on a single device. This is what you reach for once DDP's "every device holds a full replica" assumption stops being affordable.

## torch.compile

The thing to be clear about: `torch.compile` does not alter the attention mechanism the way SAGE or TeaCache do. It operates much lower down, targeting memory management, execution mode, and computation-graph optimization.

PyTorch runs in **eager mode** by default — operations execute immediately, with no static graph built ahead of time. Because PyTorch cannot know in advance how much memory or what graph shape will be needed, it over-allocates to stay safe, prioritizing compatibility over optimization.

Enabling `torch.compile` adds what amounts to a simulation run that captures the computation graph and picks execution parameters. That is the compile step. Messages mentioning Triton AOT or Torch AOT refer to this — AOT being ahead-of-time.

## Still owe myself

- DDP, FSDP, and DeepSpeed compared properly rather than by reputation.
- The automated side: Docker, Kubernetes, CI/CD, and where MLOps tooling actually fits.
- Enough CUDA and Triton to reason about kernels rather than trust them — GPU MODE lectures are the plan.
