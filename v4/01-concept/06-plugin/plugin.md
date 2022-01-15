# plugin(插件)
> 插件目的在于解决loader无法实现的其他事

## 剖析
> 插件是一个具有apply方法的javascript对象，apply 方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问
```javascript
// 一个简单的plugin
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log('webpack 构建过程开始！');
        });
    }
}
```

## 用法
> 由于插件可以携带参数/选项，你必须在 webpack 配置中，向 plugins 属性传入 new 实例

### 配置文件中使用
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件

module.exports = {
    // ...
    plugins: [
        new webpack.ProgressPlugin(),//使用webpack内部插件
        new HtmlWebpackPlugin({template: './src/index.html'}),//使用第三方插件
    ]
};
```

## 遗留问题
官方文档中[plugin的nodeAPI](https://v4.webpack.docschina.org/concepts/plugins/#node-api)的"通过配置中的 plugins 属性传入插件_及下列代码块"尚有不了解，故不做笔记，防止误导


