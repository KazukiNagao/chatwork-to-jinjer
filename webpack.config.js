var path = require('path');
module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        "dist/index": "./dist/index.js",
    },
    output: {
        filename: '[name].dist.js'
    },
    context: path.join(__dirname),
    resolve: {
        root: [path.join(__dirname, 'node_modules')],
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.tsx', ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ]
    }
}
