const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const isProduction = process.env.NODE_ENV == "production";
const isDevelopment = !isProduction;

const fileName = "[name]-[contenthash]"
const filePath = {
  src: {
    folder: "src",
    script: "src/js/script.js",
    style: "src/scss/style.scss",
    pages: "src/pages",
    images: "src/images",
    fonts: "src/fonts",
  },
  dist: {
    folder: "public",
    assets: "assets",
  },
};

const config = {
  entry: [filePath.src.script, filePath.src.style],
  output: {
    path: path.resolve(__dirname, filePath.dist.folder),
    filename: `${filePath.dist.assets}/${fileName}.js`,
    clean: true,
  },
  devtool: isDevelopment ? "eval-source-map" : "none",
  devServer: {
    static: {
      directory: path.resolve(__dirname, filePath.dist.folder),
    },
    host: "localhost",
    open: true,
    hot: true,
    port: 5001,
    watchFiles: [filePath.src.folder],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${filePath.src.pages}/index.html`,
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: `${filePath.src.pages}/gui.html`,
      filename: "gui.html",
    }),

    new MiniCssExtractPlugin({
      filename: `${filePath.dist.assets}/${fileName}.css`
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/syntax-dynamic-import"],
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                },
              ],
            ],
            balbelrc: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer()],
              },
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
