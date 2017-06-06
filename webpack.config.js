/**
 * Created by Azadeh on 4/12/2017.
 */
var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    devtool: 'eval',
    entry: './static/js/app.js',
    output: {path: __dirname, filename: 'static/js/bundle.js'},
    watch: true,
    module:{
        loaders:[
            {
                test:/.jsx?$/,
                loader: 'babel-loader',
                exclude:/node_modules/,
                query:{
                    presets:['es2015', 'react']
                }
            },{
              test:/\.s?css$/,
              loaders:["style-loader","css-loader","sass-loader"],
              include: path.join(__dirname,'static')
            }
        ]
    }
};