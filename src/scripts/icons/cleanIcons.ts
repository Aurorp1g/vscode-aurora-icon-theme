import { readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const iconsDir = join(import.meta.dirname, '..', '..', '..', 'icons');

const generatedBaseIcons = new Set([
  'file.svg',
  'folder.svg',
  'folder-open.svg',
  'folder-root.svg',
  'folder-root-open.svg',
]);

const generatedOpenFolderIconRegex =
  /^folder-(?!root-open).+-open(_light|_highContrast)?\.svg$/;

for (const file of readdirSync(iconsDir)) {
  const isGeneratedIcon =
    file.includes('~') ||
    file.endsWith('.clone.svg') ||
    generatedOpenFolderIconRegex.test(file) ||
    generatedBaseIcons.has(file);

  if (isGeneratedIcon) {
    unlinkSync(join(iconsDir, file));
  }
}

const clonesDir = join(iconsDir, 'clones');
rmSync(clonesDir, { recursive: true, force: true });
