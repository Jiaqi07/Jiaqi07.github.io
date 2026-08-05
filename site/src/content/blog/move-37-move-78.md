---
title: Move 37, Move 78
date: 2026-07-20
tags: [go, rl]
---

My new revamped website's homepage animation replays the opening of Game 4 of Lee Sedol vs. AlphaGo and stops at Move 78 which is arguably one of the most famous moves played by a human, a wedge that tricked AlphaGo's computation. And obviously, you can't really talk about Move 78 without arguably the more famous one, Move 37, so here are both. I was a chubby kid used to travel to China every summer to attend Go training camps and compete (you might be able to find a not so flattering picture of little me on Chinese news that a teacher shared with me on WeChat lol). I recall memorizing josekis, doing hundreds of life and death problems, and recording games on paper after every game when those two moves were played. And like many others, after watching the documentary, its impact on the game and on my interests have stuck with me until now.

Every Go teacher I ever had (admittedly, they were all Chinese lol) used to say the same thing about a fifth-line shoulder hit: wrong, too slow, too weak. There are centuries of professional play behind that judgment and a lot of times I was made to hold a horse stance and get wacked by a discipline stick. In Game 2, AlphaGo estimated a human would play it about 1 in 10,000 times, and played it anyway. Commentators called it a mistake but who would have ever thought that the game would evolve into spamming Tesujis of similiar style moves now.

> [!quote]
> "It's not a human move. I've never seen a human play this move." (Fan Hui)

Two games later came the second move. Lee Sedol, down 0 to 3, wedged at L11. AlphaGo had priced that move at 1 in 10,000 too, and it lost its footing for the rest of the game. People call it the "hand of God" which I find a bit overkill.

Nine years later, I train policies using a similiar line of algorithms (PPO, GRPO, their diffusion cousins), except now the board is a real-world environment or simulator and the stones are grippers/actions. I find robot learning to be incredibly humbling, I have great respect for researchers who are able to reason about these systems at every level from systems performance to on-policy assumptions or whatever to reward engineering and beyond. A policy does something that looks like a bug, and every once in a while, after enough staring, it turns out to be a strategy. I also find the exploration challenge of RL and continual learning to be the most interesting things.

In a dumb reflective way, if you see how Go games are played now compared and showed it to my professional teachers 10 years ago, they'd be shocked. But these moves still existed in the discrete Go board space, and these move were always sitting right there in the search space, we just had underlying assumptions that made us unbothered to read it out.

While I'm absolutely trash now and get crushed by the training bots, I still play Go with others and try to teach it to friends. Just now, I have a deeper appreciation for the game of Go and life.
