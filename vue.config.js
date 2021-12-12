module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://travel-agency-vue:3080',
                changeOrigin: true,
            },
        },
    },
}