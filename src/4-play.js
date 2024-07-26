import { changeAttribute } from "./modules/change-attribute.js";
import { connectSdk } from "./modules/connect-sdk.js";
import { getRandomInt } from "./modules/random.js";


const play = async () => {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("run this command: node ./src/4-play.js {collectionId} {tokenId-1} {tokenId-2}");
    process.exit(1);
  }

  const [collectionId, tokenId1, tokenId2] = args;

  const {account, sdk} = await connectSdk();

  let weight1 = 10;
  let weight2 = 10;

  const random = getRandomInt(weight1 + weight2);
  const [winner, loser] = random > weight1 ? [tokenId2, tokenId1] : [tokenId1, tokenId2];

  console.log(`Winner is ${winner}`);

  // . Increment Victories to Winner
  const winnerToken = await sdk.token.getV2({collectionId, tokenId: winner});
  const winnerVictories = winnerToken.attributes.find(a => a.trait_type === "Victories").value;

  console.log("Increasing victories...");
  await sdk.token.setProperties({
    collectionId,
    tokenId: winner,
    // NOTICE: Attributes stored in "tokenData" property
    properties: [{
      key: "tokenData",
      value: changeAttribute(winnerToken, "Victories", winnerVictories + 1)
    }]
  });
  console.log(`TokenID ${winner} has ${winnerVictories + 1} wins`);

  // . Increment Defeats to Loser
  const loserToken = await sdk.token.getV2({collectionId, tokenId: loser});
  const loserDefeats = loserToken.attributes.find(a => a.trait_type === "Defeats").value;

  console.log("Increasing defeats...");
  await sdk.token.setProperties({
    collectionId,
    tokenId: loser,
    // NOTICE: Attributes stored in "tokenData" property
    properties: [{
      key: "tokenData",
      value: changeAttribute(loserToken, "Defeats", loserDefeats + 1)
    }]
  });
  console.log(`TokenID ${loser} has ${loserDefeats + 1} defeats`);

  console.log(`Winner: https://uniquescan.io/opal/tokens/${collectionId}/${winner}`);
  console.log(`Loser: https://uniquescan.io/opal/tokens/${collectionId}/${loser}`);

  process.exit(0);
}

play().catch(e => {
  console.log("Something went wrong during play");
  throw e;
})