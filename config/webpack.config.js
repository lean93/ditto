const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: `${__dirname}/dist`,
    },
    // optimization: {
    //    minimize: false
    //},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'app/resources',
                            name: 'images/[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 4
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3
                            }
                        }
                    }],
                exclude: /node_modules/,
                include: __dirname
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new CompressionPlugin({
            asset: "[path].gz[query]",
            test: /\.js$|\.css$|\.html$/,
            minRatio: 0.8
        })
    ]
};