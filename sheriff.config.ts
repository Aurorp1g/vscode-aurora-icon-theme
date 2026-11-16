import { type SheriffConfig } from '@softarc/sheriff-core';

export const sheriffConfig: SheriffConfig = {
  entryFile: 'src/extension/desktop/extension.ts',
  version: 1,
  autoTagging: true,
  tagging: {
    'src/extension': 'extension',
    'src/core': 'core',
  },
  depRules: {
    root: ['core'],
    extension: ['core'],
  },
};
