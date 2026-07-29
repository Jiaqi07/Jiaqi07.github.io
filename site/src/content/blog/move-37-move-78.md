---
title: Move 37, Move 78
date: 2026-07-20
tags: [go, rl]
---

The animation on my homepage replays the opening of Game 4 of Lee Sedol vs. AlphaGo, stopping at Move 78: the wedge that broke the machine. You can't really talk about Move 78 without Move 37, so here are both. I was a kid memorizing joseki when those games were played, and I don't think any two moves have stuck with me longer.

Every Go teacher says the same thing about a fifth-line shoulder hit: wrong. Too slow, too floaty. There are centuries of professional play behind that judgment. In Game 2, AlphaGo estimated a human would play it about 1 in 10,000 times, and played it anyway. Commentators called it a mistake, then a misclick.

> [!quote]
> "It's not a human move. I've never seen a human play this move." (Fan Hui)

Two games later came the mirror image. Lee Sedol, down 0 to 3, wedged at L11. AlphaGo had priced that move at 1 in 10,000 too, and it lost its footing for the rest of the game. People call it the hand of God. What I love is the symmetry: the machine found something humans had pruned away, and then a human found something the machine had pruned away.

Nine years later, I train policies with the same family of algorithms (PPO, GRPO, their diffusion cousins), except now the board is a kitchen in a simulator and the stones are grippers. The loop still feels the same. A policy does something that looks like a bug, and every once in a while, after enough staring, it turns out to be a strategy.

I didn't take "machines are creative" from those games, and I didn't take "humans are special" either. I took this: everyone prunes too early. The move is usually sitting right there in the search space, and nobody bothered to read it out.

I still play on KGS. I read out more weird moves than I used to.
