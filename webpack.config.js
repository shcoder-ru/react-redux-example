const config = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('assets/app.css');
const extractHTML = new ExtractTextPlugin('index.html');

const srcPath = path.resolve(__dirname + '/src');
const distPath = path.resolve(__dirname + '/dist');

module.exports = {
    context: srcPath,
    entry: './index.jsx',
    output: {
        path: distPath,
        filename: 'assets/app.js',
        publicPath: '/'
    },
    watch: env === 'development',
    devtool: env === 'development' ? 'inline-source-map' : null,
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    ejsHtml: {
        version: config.version,
        title: config.name
    },
    devServer: {
        contentBase: distPath
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            include: srcPath,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-runtime', 'transform-object-rest-spread']
            }
        }, {
            test: /\.js$/,
            include: srcPath,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime', 'transform-object-rest-spread']
            }
        }, {
            test: /\.css$/,
            loader: extractCSS.extract('css!postcss')
        }, {
            test: /\.less$/,
            loader: extractCSS.extract('css!postcss!less')
        }, {
            test: /index\.ejs$/,
            loader: extractHTML.extract('html!ejs-html')
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'assets/[hash:8].[ext]'
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(env),
            version: JSON.stringify(config.version)
        }),
        extractCSS,
        extractHTML
    ]
};

if (env === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.*\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    );
}
