const path = require("path")
const { VueLoaderPlugin } = require("vue-loader")
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function getPath(dir) {
    return path.join(__dirname, "./" + dir)
}

module.exports = {
    // The application entry point
    entry: "./src/index.js",
    // Where to compile the bundle
    // By default the output directory is `dist`
    output: {
        path: getPath("dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            //use babel-loader to transpile js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // css-loader to bundle all the css files into one file and vue-style-loader
            // to add all the styles inside the <style> block in `.vue` file.
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.png|\.woff2|\.woff|\.ttf|\.svg|\.eot$/,
                type: "asset/resource"
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        pure_funcs: ['console.error']
                    },
                    mangle: true
                },
                extractComments: false
            })
        ]
    },
    devServer: {
        contentBase: getPath("public"),
        port: 3000,
        publicPath: "/dist/"
    },
    devtool: 'eval-cheap-module-source-map',
    resolve: {
        alias: {
            api: getPath("src/api"),
            assets: getPath("src/assets"),
            components: getPath("src/components"),
            constants: getPath("src/constants"),
            mixins: getPath("src/mixins"),
            router: getPath("src/router"),
            store: getPath("src/store"),
            util: getPath("src/util"),
            views: getPath("src/views"),
            ws: getPath("src/ws"),
            src: getPath("src"),
            libs: getPath("libs")
        },
        extensions: [ '*', '.vue', '.js' ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        //new BundleAnalyzerPlugin()
    ]
}