# loader
> loader用于对源代码进行转换，可以在引入模块时预处理，甚至可以跨语言，也就是说可以在js文件中引入css文件
> 使用loader之前一定要先npm install

## 使用
+ 在配置文件中使用(推荐)
+ 在每个```import```中使用
+ 在```shell```命令中使用 

### 在配置文件中使用
```javascript
// webpack.config.js
// 这里以css文件为例
// rules字段是数组，可以定义多个规则
    // test字段使用正则匹配文件，这里是css结尾的文件，也就是css文件
    // use字段配置对test匹配到的文件使用哪种loader进行解析，从最后一个开始往前解析
        // loader字段是使用的什么loader
        // options是该loader的属性
module.exports = {
  module: {
    rules: [
        { test: /\.css$/, use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: {
                    modules: true
                }
            },
            { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

### 在每个```import```中使用
```javascript
// 使用 ! 将资源中的 loader 分开,每个部分都会相对于当前目录解析
// style-loader ! css-loader
// 使用 ! 为整个规则添加前缀，可以覆盖配置中的所有 loader 定义
// !./styles.css
import Styles from 'style-loader ! css-loader ? modules ! ./styles.css';
```

### 在```shell```命令中使用 
```bash
# 这会对 .jade 文件使用 jade-loader，以及对 .css 文件使用 style-loader 和 css-loader
npx webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

## loader的特性
+ loader 支持链式传递。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 期望 JavaScript
+ loader 可以是同步的，也可以是异步的
+ loader 运行在 Node.js 中，并且能够执行任何 Node.js 能做到的操作。
+ loader 可以通过 options 对象配置
+ 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块
+ 插件(plugin)可以为 loader 带来更多特性
+ loader 能够产生额外的任意文件

## 解析loader
> loader 遵循"模块解析"标准。多数情况下，loader 将从"模块路径"加载（通常是从 npm install, node_modules 进行加载）。
> 通常使用 npm 进行管理，但是也可以将自定义 loader 作为应用程序中的文件。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）

## 注意：由于此篇涉及理论过多，代码就不做展示了，可以参考第一篇的loader部分