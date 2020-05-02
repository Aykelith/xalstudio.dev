const webpack = require("webpack");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";
const RootPath = __dirname;

let extraPlugins = [];
let extraOptimizations = {};

if (isProduction) {
	const TerserJSPlugin = require("terser-webpack-plugin");
	var MiniCssExtractPlugin = require("mini-css-extract-plugin");
	const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
	const CompressionPlugin = require("compression-webpack-plugin");

	extraPlugins = [
		new CompressionPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[id].[contenthash].css"
		})
	];

	extraOptimizations = {
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		]
	};
}

if (process.env.GSP_BUNDLE_ANALYZE) {
	const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
	extraPlugins.push(new BundleAnalyzerPlugin());
}

let indexEntries = [];
if (!isProduction) {
	extraPlugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	);

	indexEntries = [ "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000" ];
}

module.exports = {
    mode: isProduction ? "production" : "development",
    entry: {
        index: [
            path.join(RootPath, "src", "index.js"),
            ...indexEntries
        ]
    },
    context: path.join(RootPath, "src"),
    output: {
        path: path.join(RootPath, "docs"),
        publicPath: "/",
        chunkFilename: "[name].chunk.js",
        filename: "[name].bundle.js"
    },
    devtool: isProduction ? "" : "cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: path.join(RootPath, "tmp", "babel_cache"),
                    configFile: path.join(RootPath, "babel.config.js")
                }
            },
            {
                test: /\.scss|.css$/,
                use: [
                    isProduction
                        ? {
                            loader: require("mini-css-extract-plugin").loader,
                            options: {
                                publicPath: "/"
                            }
                        }
                        : {
                            loader: "style-loader"
                        },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            // root: path.join(process.env.IMOCENTRAL_SITE_DATA, "static")
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sassOptions: {
                                includePaths: [
                                    path.join(RootPath, "src")
                                ]
                            },
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __production: isProduction ? "true" : "false",
            "process.env": {
                "NODE_ENV": JSON.stringify(isProduction ? "production" : "development")
            },
        }),
        ...extraPlugins
    ],
    optimization: {
        ...extraOptimizations
    },
    resolve: {
        modules: [path.join(RootPath, "node_modules")],
        alias: {},
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(RootPath, "docs"),
        hot: true,
    },
    externals: {
        fs: "{}",
        tls: "{}",
        net: "{}",
        console: "{}",
        v8: "{}"
    }
};