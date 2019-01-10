const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require("fs");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false
        });
    });
}


const htmlPlugins = generateHtmlPlugins("./src/html/views");

module.exports = {
    entry: [
        "babel-polyfill",
        "./src/js/index.js",
        "./src/scss/index.scss"
    ],
    output: {
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "./"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: "env"
                    }
                }
            },
            {
                test: /\.css$/,
                include: [/node_modules/],
                use: [{ loader: "css-loader" }]
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "src/scss"),
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                 minimize: true,
                                url: false
                            }
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
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src/html/includes")],
                use: ["raw-loader"]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  "style.bundle.css",
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {
                from: "./src/fonts",
                to: "./"
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
    ].concat(htmlPlugins)
};
