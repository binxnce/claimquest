import * as fs from "fs";
import chalk from "chalk";
import bre from "hardhat";

const publishDir = "../web/src/contracts";
const graphDir = "../subgraph";

// Publish to graphdir
function publishContract(contractName: string) {
  console.log(
    " 💽 Publishing",
    chalk.cyan(contractName),
    "to",
    chalk.gray(publishDir)
  );
  try {
    let contract = JSON.parse(
      fs
        .readFileSync(
          `${bre.config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`
        )
        .toString()
    );
    const address = fs
      .readFileSync(`${bre.config.paths.artifacts}/${contractName}.address`)
      .toString();
    let graphConfigPath = `${graphDir}/config/config.json`;
    let graphConfig: Record<string,any> = {};
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = JSON.parse(fs.readFileSync(graphConfigPath).toString());
      } 
    } catch (e) {
      console.log(e);
    }

    graphConfig[contractName + "Address"] = address;
    fs.writeFileSync(
      `${publishDir}/${contractName}.address.js`,
      `module.exports = "${address}";`
    );
    fs.writeFileSync(
      `${publishDir}/${contractName}.abi.js`,
      `module.exports = ${JSON.stringify(contract.abi, null, 2)};`
    );
    fs.writeFileSync(
      `${publishDir}/${contractName}.bytecode.js`,
      `module.exports = "${contract.bytecode}";`
    );

    const folderPath = graphConfigPath.replace("/config.json", "");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
    fs.writeFileSync(
      `${graphDir}/abis/${contractName}.json`,
      JSON.stringify(contract.abi, null, 2)
    );

    console.log(
      " 📠 Published " + chalk.green(contractName) + " to the frontend."
    );

    return true;
  } catch (e) {
    if (e.toString().indexOf("no such file or directory") >= 0) {
      console.log(
        chalk.yellow(
          " ⚠️  Can't publish " +
            contractName +
            " yet (make sure it getting deployed)."
        )
      );
    } else {
      console.log(e);
      return false;
    }
  }
}

async function main() {
  if (!fs.existsSync(publishDir)) {
    fs.mkdirSync(publishDir);
  }
  const finalContractList: Array<string> = [];
  fs.readdirSync(bre.config.paths.sources).forEach((file) => {
    if (file.indexOf(".sol") >= 0) {
      const contractName = file.replace(".sol", "");
      // Add contract to list if publishing is successful
      if (publishContract(contractName)) {
        finalContractList.push(contractName);
      }
    }
  });
  fs.writeFileSync(
    `${publishDir}/contracts.js`,
    `module.exports = ${JSON.stringify(finalContractList)};`
  );
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
