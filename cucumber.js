module.exports = {
  default: [
    '--require-module ts-node/register',
    ' --require-module tsconfig-paths/register',
    'test/app/features/**/*.feature',
    '--require test/app/features/step_definitions/*.ts',
    '--publish-quiet',
    '--force-exit',
  ].join(' '),
};
