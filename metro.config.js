module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  //add new for npm issue
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'], // Add 'cjs' as a source extension
  },
};