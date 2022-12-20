const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')
const whitelister = require('purgecss-whitelister');

module.exports = {
    plugins: [
        autoprefixer(),
        purgecss({
            content: [
                'themes/sbdesigner/layouts/**/*.html',
                'content/**/*.md',
                'content/**/*.html',
            ],
            whitelist: [
                'lazyloaded',
    ],
}),
],
}
