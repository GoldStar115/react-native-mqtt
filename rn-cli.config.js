const extraNodeModules = require('node-libs-browser');
extraNodeModules.net = require.resolve('react-native-tcp')
module.exports = {
    extraNodeModules
}