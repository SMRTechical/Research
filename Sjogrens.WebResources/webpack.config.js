var path = require('path');
var webpack = require('webpack');
var AppExtractTextPlugin = require('extract-text-webpack-plugin');
var VendorExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var bootstrapEntryPoints = require('./webpack.bootstrap.config.js')

var appExtractPlugin = new AppExtractTextPlugin({
    filename: 'css/app.css'
});

var vendorExtractPlugin = new VendorExtractTextPlugin({
    filename: 'css/vendor.css'
});


// var isProd = process.env.NODE_ENV === 'production'


// var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
// bootstrap: bootstrapConfig
module.exports = {
    entry: {
        app: './src/js/app.js',
        vendor: './src/js/vendor.js',
    },
    output: {
        //path: path.resolve(__dirname, 'dist'),
        //filename: 'js/[name].bundle.js',
        //publicPath: '/dist'
        path: path.resolve(__dirname, '../Sjogrens.Client/assets'),
        filename: 'js/[name].bundle.js',
        publicPath: '../Sjogrens.Client/assets'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [{
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,

                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: vendorExtractPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react','stage-0','babel-preset-es2015', 'babel-preset-es2016', 'babel-preset-es2017']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: appExtractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                       publicPath: '../Sjogrens.Client/assets/'
                        //publicPath: '../'
                    }
                }]
            },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]'
            //         }
            //     }],
            //     exclude:path.resolve(__dirname,'src/index.html')
            // }
        ]
    },
    // devServer: {
    //    contentBase: path.join(__dirname, "../Sjogrens.Client/assets"),
    //    compress: true,
    //    port: 9000,
    //    stats: "errors-only",
    //    open: true,
    //    openPage: 'index.html'
    // },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery'
        }),
        appExtractPlugin,
        vendorExtractPlugin,
        //new HtmlWebpackPlugin({
        //    title: 'Webpack Project',
        //    minify: {
        //        collapseWhitespace: true
        //    },
        //    hash: true,
        //    filename: 'index.html',
        //    template: 'src/index.html'
        //}),
       /* new HtmlWebpackPlugin({
            filename: 'about.html',
            template: 'src/about.html',
            chunks: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            template: 'src/blog.html',
            chunks: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            template: 'src/contact.html',
            chunks: ['app', 'vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'services.html',
            template: 'src/services.html',
            chunks: ['app', 'vendor']
        }),*/
        //new CleanWebpackPlugin(['../Sjogrens.Client/assets']),
        new webpack.optimize.UglifyJsPlugin({
            //..
        })

    ]
};