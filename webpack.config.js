module.exports = env => {
  const libraryName = 'randoml';

  let outputFile, mode, devtool;

  if (env === 'build') {
    mode = 'production';
    outputFile = `${libraryName}.min.js`;
    devtool = false;
  } else {
    mode = 'development';
    outputFile = `${libraryName}.js`;
    devtool = 'source-map';
  }

  return {
    mode,
    entry: `${__dirname}/src/${libraryName}.ts`,
    devtool,
    output: {
      path: `${__dirname}/lib`,
      filename: outputFile,
      library: 'RandoML',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject:
        'typeof window !== "object" ? global.window = global : window'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts']
          }
        }
      ]
    }
  };
};
