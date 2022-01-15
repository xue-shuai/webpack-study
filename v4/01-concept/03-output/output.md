# output(输出)
> 配置 output 选项可以控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只指定一个 output 配置

## 用法
> 在webpack中，output的值为一个对象，包括filename和path属性，如下代码
```javascript
// webpack.config.js
module.exports = {
    output:{
        path:__dirname + '/build',//该字段表示输出到指定目录
        filename:'bundle.js',//该字段为输出目录内输出的js名称
    }
}
```

## 多个入口起点
> 如果entry入口文件配置了多个入口的话，那我们为了保证输出文件名称的唯一性，我们可以使用占位符来表示
+ 我们跟第二节entry时一样的做法，在src目录下新建一个```admin.js```，这时修改我们的```webpack.config.js```
```javascript
module.exports = {
    entry:{
        index:'./src/index.js',
        admin:'./src/admin.js'
    },
    output:{
        path:__dirname + '/build',//该字段表示输出到指定目录
        filename:'[name].js',//通过[name]来占位保证与entry的文件名称一致
    }
}
```

## 遗留问题
官方文档中[output的高级进阶](https://v4.webpack.docschina.org/concepts/output/#%E9%AB%98%E7%BA%A7%E8%BF%9B%E9%98%B6)的```__webpack_public_path__```尚有不了解，故不做笔记，防止误导
