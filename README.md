# Unique NFT data management

<!-- TODO this workshop demonstrates ... -->

## Before we start

- Create a Substrate account
- Get `OPL` (testnet) tokens: https://t.me/unique2faucet_opal_bot
- Create `.env` from `.env-example` and set your mnemonic phrase
- Run `npm install`

## 1. Create a Racing cars collection

```sh
node ./src/1-collection-cars.js
```

## 2. Create Achievements collection

```sh
node ./src/2-collection-achievement.js
```

## 3. Create at least two car NFTs

Pass the following arguments to the function
- collectionId (step 1)
- owner Substrate address
- owner nickname

For example:

```sh
node ./src/3-create-car.js 3135 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY FastGuy
node ./src/3-create-car.js 3135 5CPuU98SimxwoHZRZCi8hezgnfBwATs8vKo6haqkaP3hUj7X RaceQueen
```

## 4. Play the game

Pass the following arguments to the function
- collectionId (step 1)
- First player's tokenId 
- Second player's tokenId

```sh
node ./src/4-play.js 3132 1 2
```