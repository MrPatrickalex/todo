const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const path = require("path")

module.exports = {
    entry: ["babel-polyfill", __dirname + "/src/app/index.js"],
    output: {
        path: path.resolve(__dirname, "./build"), // Folder to store generated bundle
        filename: '[name]bundle.js',  // Name of generated bundle after build
        chunkFilename: '[name].bundle.js',
        // publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    devServer: {
        overlay: true,
        port: 3000
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }
    },
    plugins: [  // Array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body'
        })
    ],
    devServer: {  // configuration for webpack-dev-server
        contentBase: './src/public',  //source of static assets
        port: 3001, // port to run dev-server
    }
};