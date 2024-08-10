import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';

export type PackageMetadata = {
  version: string;
  description: string;
};

const getInstallDirectory = (): string =>
  dirname(fileURLToPath(import.meta.url));

const getPackageJsonPath = (): string =>
  resolve(getInstallDirectory(), '..', 'package.json');

export const getPackageMeta = async (): Promise<PackageMetadata> =>
  JSON.parse(await readFile(getPackageJsonPath(), 'utf-8')) ?? {};

export async function updatePackages(
  basePath: string = process.cwd()
): Promise<void> {
  try {
    if (!basePath) {
      throw new Error('Invalid arguments supplied!');
    }

    if (!existsSync(basePath)) {
      throw new Error(`${basePath} does not exist!`);
    }

    console.log('Complete!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
