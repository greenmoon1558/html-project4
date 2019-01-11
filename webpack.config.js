const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const fs = require("fs");

const names = fs
  .readdirSync("./src/html/views/")
  .filter(function(file) {
    return file.match(/.*\.(html)$/);
  })
  .map(file => file.split(".")[0]);

const baseConfig = [
  {
    entry: ["babel-polyfill", "./src/scss/mixin/fonts.css"],
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { sourceMap: true, minimize: true, url: false }
            },
       
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "fonts.css"
      }),
      new CleanWebpackPlugin("dist", {}),
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: `./src/html/redirect/index.html`,
        filename: `index.html`
      }),
      new CopyWebpackPlugin([
        {
          from: "./src/fonts",
          to: "./fonts"
        },
        {
          from: "./src/favicon",
          to: "./favicon"
        },
        {
          from: "./src/img",
          to: "./img"
        },
        {
          from: "./src/uploads",
          to: "./uploads"
        }
      ])
    ]
  }
];
const modules = names.reduce((arr, currentName) => {
  return [
    ...arr,
    {
      entry: [
        "@babel/polyfill",
        `./src/js/${currentName}.js`,
        `./src/scss/${currentName}.scss`
      ],
      output: {
        path: path.resolve(__dirname, `dist/${currentName}`),
        filename: "[name].[chunkhash].js"
      },
      target: "web",
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, "./"),
            exclude: /node_modules/,
            loader: "babel-loader"
          },
          {
            test: /\.(css|sass|scss)$/,
            use: [
              "style-loader",
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: { sourceMap: true, minimize: true, url: false }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: loader => [
                    require("postcss-import")({ root: loader.resourcePath }),
                    require("postcss-preset-env")(),
                    require("postcss-cssnext")({
                      browsers: ["> 1%", "ie 10"]
                    }),
                    require("cssnano")()
                  ]
                }
              },
              { loader: "sass-loader", options: { sourceMap: true } }
            ]
          },
          {
            test: /\.html$/,
            include: [path.resolve(__dirname, "src/html/includes")],
            use: ["raw-loader"]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
       
          preload: ['**/*.css'],
          inject: false,
          hash: true,
          template: `./src/html/views/${currentName}.html`,
          filename: `${currentName}.html`
        }),
        new ResourceHintWebpackPlugin(),
        new WebpackMd5Hash()
      ]
    }
  ];
}, baseConfig);
// module.push(baseConfig);
module.exports = modules;
