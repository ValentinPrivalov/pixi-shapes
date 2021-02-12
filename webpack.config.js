const path = require('path');

module.exports = {
    devServer: {
        index: 'index.html',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 5000
    },
    module: {
        rules: [
            {test: /\.js$/, loader: ['babel-loader'], exclude: /node_modules/},
            {test: /\.(css|less)$/, loader: ['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    devtool: 'eval-cheap-source-map'
};
