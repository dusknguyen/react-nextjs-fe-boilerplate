const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

// eslint-config-expo 57 references a rule that eslint-plugin-expo 1.1.0
// does not publish yet. Remove only that unavailable rule.
for (const config of expoConfig) {
  if (config.rules) delete config.rules['expo/use-dom-exports'];
}

module.exports = defineConfig([
  globalIgnores([
    '.expo/*',
    '.next/*',
    'dist*/*',
    'node_modules/*',
  ]),
  expoConfig,
]);
