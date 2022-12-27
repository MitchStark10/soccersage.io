const path = require('path');
const { getPaths } = require('@redwoodjs/internal');

module.exports = {
    presets: [],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias: {
                    utilities: path.join(getPaths().base, 'utilities'),
                },
            },
        ],
    ],
};
