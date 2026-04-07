import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contracts = ['ChatApp', 'TheBlockchainCoders'];

contracts.forEach((contractName) => {
  const artifactPath = path.join(
    __dirname,
    '..',
    'artifacts',
    'contracts',
    `${contractName}.sol`,
    `${contractName}.json`
  );

  try {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = JSON.stringify(artifact.abi, null, 2);

    console.log(`\n=== ${contractName} ABI ===\n`);
    console.log(abi);
    console.log('\n');
  } catch (error) {
    console.error(`Error reading ${contractName} artifact:`, error.message);
  }
});
