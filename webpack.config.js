const HtmlPlugin = require("html-webpack-plugin");

var webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: ["./src/index.js"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/public",
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlPlugin({
            title: 'Hello World app',
            template: './src/index.template.html'
        }),
        new webpack.DefinePlugin({
            API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
            DEV_SETTINGS_URL: JSON.stringify(process.env.DEV_SETTINGS_URL)
        })
    ]
};