import next from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// eslint-config-next 16 ships a native flat config. Both entries are needed:
// core-web-vitals registers the TypeScript parser but carries no TS rules,
// the typescript export is where the actual ruleset lives.
const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'coverage/**', 'next-env.d.ts'],
  },
  ...next,
  ...nextTs,
];

export default eslintConfig;
