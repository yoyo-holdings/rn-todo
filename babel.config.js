module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            screen: './src/screens/',
            firebaseconf: './src/firebase/',
            components: './src/components/',
          },
        },
      ],
    ],
  }
}
