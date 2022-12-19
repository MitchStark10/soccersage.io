/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
    if (mode === 'development') {
        // Add dev plugin
        config.devServer.allowedHosts = 'all';
    }

    return config;
};
