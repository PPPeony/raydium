# Liquidity reconciler

## developments

1. use pnpm as pkg management

    ```sh
    # 1
    pnpm install 

    # 2

    pnpm dev

    # 3
    pnpm build
    ```

2. wallet adapter

    Reference to [solana wallet adapter document](https://github.com/solana-labs/wallet-adapter/blob/master/APP.md)

## Concepts

The raydium official website can't add liquidities with custom ratio of token.

For instance, if the current ratio of AHT/USDT is 1/1, so you must add AHT and USDT proportionably, such as 100 AHT and 100 USDT.

Our target is add liquidity with no proportion limit, you can add any amount of token into liquidity.

The underground logical within 2 steps:

1. sell or buy the base token with quote token to reconciler the token ratio
2. when the ratio in our wallet is the same as the ratio in the pool, we can add our token into the liquidity

## Cautions

Because of solana transaction's bytes limit, the 2 steps above isn't atomic, using it at your own risk.
