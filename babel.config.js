module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@src': './',
            '@assets': 'assets',
            '@components': './components',
            '@config': './config',
            '@navigation': './navigation',
            '@screens': './screens',
            '@kitten': './node_modules/react-native-ui-kitten'
          },
        },
      ],
    ],
  };
};
