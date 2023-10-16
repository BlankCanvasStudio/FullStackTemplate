const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index:'./src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',   // Automatically adds name to output in the event of multiple entries
        chunkFilename:'[name].bundle.js',
        clean: true, // Prevents dist folder from geting too cluttered
        publicPath: '/',
    },
    mode:'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,        // jfc never delete this
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            /*
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            */
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({         // automatically outputs an index.html with the correct naming
          title: 'OneUp',               // TItle of webpage
          inject:'body',
        }),
        new MiniCssExtractPlugin(),
      ],
    optimization: { // This is used for code splitting to make sure that the code is only imported onece, preventing bugs and inefficiencies
        splitChunks: {
            cacheGroups: {
                reactVendor: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                name: 'vendor-react',
                chunks: 'all',
                },
            },
        }
    },
    devServer: {
        port: 3000,
        historyApiFallback:true,
        allowedHosts: "all",
    },
};

