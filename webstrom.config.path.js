/**
 'use strict'
  配置alias后，webstorm对应的文件跟踪配置
 */
const path = require('path');
module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
};

