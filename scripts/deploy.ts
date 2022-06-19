import { ethers } from "hardhat";
const fs = require("fs");

async function main() {
  const Blog = await ethers.getContractFactory("Blog");
  const blog = await Blog.deploy("My web3 blog");

  await blog.deployed();
  console.log("Blog deployed to:", blog.address);

  const ownerAddress = await blog.signer.getAddress();

  fs.writeFileSync(
    "./config.ts",
    `
  export const contractAddress = "${blog.address}"
  export const ownerAddress = "${ownerAddress}"
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
