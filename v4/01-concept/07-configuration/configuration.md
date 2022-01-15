# configuration(配置)

## 基本配置
```javascript
// webpack.config.js
var path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
};
```

## 多个target
