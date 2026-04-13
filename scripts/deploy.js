import { ethers } from "ethers";

async function main() {
  // connect to local hardhat node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // use first account private key from hardhat node
 const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  const wallet = new ethers.Wallet(privateKey, provider);

  console.log("Deploying from:", wallet.address);

  // ABI + BYTECODE load from artifacts
  const artifact = await import("../artifacts/contracts/DigitalWill.sol/DigitalWill.json", {
    assert: { type: "json" }
  });

  const factory = new ethers.ContractFactory(
    artifact.default.abi,
    artifact.default.bytecode,
    wallet
  );

  const beneficiary = wallet.address;

  const contract = await factory.deploy(beneficiary);

  await contract.waitForDeployment();

  console.log("Contract Address:", await contract.getAddress());
}

main();