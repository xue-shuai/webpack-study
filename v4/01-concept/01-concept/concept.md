## entry(入口)
> entry 默认值 './src/index.js'
所以当你在根目录下新建了一个```src/index.js```时，执行```npx webpack```会将```src/index.js```内容打包在根目录下生成一个```dist```目录
> 我们也可以更改 entry 的默认值，如下代码
```javascript
// webpack.config.js
// 这个时候如果我们的代码还写在src/index.js，执行npx webpack时会报错，因为此时他是将dev/index.js的代码打包，但并没有找到该文件
// 所以我们需要将代码写在dev/index.js内
module.exports = {
    entry:'./dev/index.js',//定义入口
}
```

## output(输出)
> output 默认值 './dist/main.js'
你应该也发现了，当你执行```npx webpack```时会生成```dist/main.js```文件
> 我们也可以更改 output 的默认值，如下代码
```javascript
// webpack.config.js
// 这里需要引入nodejs的内置模块path来定义路径
const path = require('path');

module.exports = {
    entry:'./dev/index.js',//定义入口
    output: {
        path: path.resolve(__dirname, 'build'),//定义打包生成的目录，这里默认是dist，我该为了build
        filename: 'my-first-webpack.bundle.js',//定义打包生成的文件名
    }
}
```

## loader(加载器)
> webpack默认只能识别javascript及json文件，但很多情况下我们可能需要识别其他类型的文件，比如html、css、scss、less等，weibpack通过loader属性可以帮我们识别这些文件
这么说仿佛不知道有什么作用，接下来看下面一个例子
```javascript
const path = require('path');

module.exports = {
    entry:'./dev/index.js',//定义入口
    output: {
        path: path.resolve(__dirname, 'build'),//定义打包生成的目录，这里默认是dist，我该为了build
        filename: 'my-first-webpack.bundle.js',//定义打包生成的文件名
    },
    module: {//定义了一个module
        rules: [//该module有一些规则
            { test: /\.txt$/, use: 'raw-loader' },//当我们import 以txt后缀结尾的文件我们需要使用raw-loader去转换一下
        ]
    }
}
```
这个时候我们在```dev```目录下新建一个```hello.txt```
```bash
# hello.txt
hello webpack
```
然后在```index.js```写下如下代码
```javascript
// 就这么简单的两行代码，你应该明白我要做什么，这里我都去txt文件，然后打印在控制台，但是我们前面说了，webpack只能识别javascript和json文件，所以他识别不了txt
import txt from './hello.txt';
console.log(txt);
```
如果此时你贸然使用```npx webpack```会报错，因为并没有找到```raw-loader```，所以我们最后需要安装一下这个loader
```bash
npm i raw-loader
```
最后我们执行```npx webpack```时，成功生成```build/my-first-webpack.bundle.js```文件，并成功读取到```txt```文件编译在js中
```javascript
// build/my-first-webpack.bundle.js
(()=>{"use strict";console.log("hello webpack")})();
```

## plugin(插件)
> loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
> 想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。
这里以```html-webpack-plugin```插件为例，他也会将我们的```html```文件进行打包
+ 首先需要安装```html-webpack-plugin```
```bash
npm install html-webpack-plugin
```
+ 然后在```dev```目录下新建```index.html```
```html
<!-- dev/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello Webpack@4
</body>
</html>
```
+ webpack配置
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./dev/index.js',//定义入口
    output: {
        path: path.resolve(__dirname, 'build'),//定义打包生成的目录，这里默认是dist，我该为了build
        filename: 'my-first-webpack.bundle.js',//定义打包生成的文件名
    },
    module: {//定义了一个module
        rules: [//该module有一些规则
            { test: /\.txt$/, use: 'raw-loader' },//当我们import 以txt后缀结尾的文件我们需要使用raw-loader去转换一下
        ]
    },
    plugins: [
        // 创建HtmlWebpackPlugin插件实例，将template里面配置的html文件通过webpack打包，并将打包的js文件在该html文件内引入 
        new HtmlWebpackPlugin({template: './dev/index.html'})
    ]
}
```

## mode(模式)
> 默认值 'production',可选值如下
+ development
+ production
+ none
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',//模式
    entry:'./dev/index.js',//定义入口
    output: {
        path: path.resolve(__dirname, 'build'),//定义打包生成的目录，这里默认是dist，我该为了build
        filename: 'my-first-webpack.bundle.js',//定义打包生成的文件名
    },
    module: {//定义了一个module
        rules: [//该module有一些规则
            { test: /\.txt$/, use: 'raw-loader' },//当我们import 以txt后缀结尾的文件我们需要使用raw-loader去转换一下
        ]
    },
    plugins: [
        // 创建HtmlWebpackPlugin插件实例，将template里面配置的html文件通过webpack打包，并将打包的js文件在该html文件内引入 
        new HtmlWebpackPlugin({template: './dev/index.html'})
    ]
}
```


## browser compatibility(浏览器兼容性)
> webpack 支持所有符合 ES5 标准 的浏览器（不支持 IE8 及以下版本）。webpack 的 import() 和 require.ensure() 需要 Promise。如果你想要支持旧版本浏览器，在使用这些表达式之前，还需要 提前加载 [polyfill](https://v4.webpack.docschina.org/guides/shimming/)。







