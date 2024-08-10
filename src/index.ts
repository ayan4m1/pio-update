import { program } from 'commander';

import { getPackageMeta, updatePackages } from './utils.js';

try {
  const { version, description } = await getPackageMeta();

  await program
    .version(version)
    .description(description)
    .argument('[base-path]', 'Root of your PIO project, defaults to cwd')
    .action(updatePackages)
    .parseAsync();
} catch (error) {
  console.error(error);
  process.exit(1);
}
