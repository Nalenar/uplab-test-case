const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const isDevelopment = !isProduction;

const file = {
  name: "[name]-[contenthash]",
  path: {
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
  },
};

const config = {
  entry: [file.path.src.script, file.path.src.style],
  output: {
    path: path.resolve(__dirname, file.path.dist.folder),
    filename: `${file.path.dist.assets}/${file.name}.js`,
    clean: true,
  },
  devtool: isDevelopment ? "eval-source-map" : "none",
  devServer: {
    static: {
      directory: path.resolve(__dirname, file.path.dist.folder),
    },
    host: "localhost",
    open: true,
    hot: true,
    port: 5001,
    watchFiles: [file.path.src.folder],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${file.path.src.pages}/index.html`,
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: `${file.path.src.pages}/gui.html`,
      filename: "gui.html",
    }),

    new MiniCssExtractPlugin({
      filename: `${file.path.dist.assets}/${file.name}.css`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: file.path.src.images,
          to: `${file.path.dist.folder}/${file.path.dist.assets}/images`,
        },
        {
          from: file.path.src.fonts,
          to: `${file.path.dist.folder}/${file.path.dist.assets}/fonts`,
        },
      ],
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
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
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
