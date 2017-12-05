module.exports = (plugin, opts = {}) => {
    const basedir = opts.basedir || process.cwd();
    const resolve = require ('resolve').sync;
    return require(resolve(plugin, {basedir}));
}