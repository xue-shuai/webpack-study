# entry(入口)

## 单个入口（简写）语法
> 第一节中，我们认识到entry的基础写法，后面参数为一个string，即入口文件，注意：这只是简写，这里我们实现完整写法
```javascript
// webpack.config.js
module.exports = {
    // entry:'./src/index.js',// 此为简写
    entry: {//此为完整写法
        main: './src/index.js'
    }
}
```

> 当我们给entry传入一个数组会发生什么？这里我们来测试一下
+ 首先在```src```目录下分别新建```a.js```、```b.js```
```javascript
// index.js
console.log('hello entry');
// a.js
console.log('hello entry a');
// b.js
console.log('hello entry b');
```
+ 然后修改```webpack.config.js```
```javascript
// webpack.config.js
module.exports = {
    // entry:'./src/index.js',// 此为简写
    // entry: {//此为完整写法
    //     main: './src/index.js'
    // }
    entry:['./src/index.js','./src/a.js','./src/b.js']
}
```
+ 最后我们执行```npx webpack```
我们会发现，打包生成的```dist/main.js```内容是
```javascript
// dist/main.js
console.log("hello entry"),console.log("hello entry a"),console.log("hello entry b");
```
> 由此我们得出结论，当entry为数组时，执行打包命令会将这些入口文件代码合并到一个输出文件

## 对象语法
> 简单举个例子你就能看懂了
+ 首先在```src```下新建一个```admin.js```
```javascript
// src/admin.js
console.log('hello admin');

// webpack.config.js
module.exports = {
    entry:{
        index:'./src/index.js',//index 入口文件
        admin:'./src/admin.js',//admin 入口文件
    }
}
```
+ 当我们执行```npx webpack```的时候会发现，这时候生成了两个文件，也就是说会把```index```和```admin```分开打包
> 在我认为，这是模块化的一种表现形式

## 遗留问题
官方文档中[entry的常用场景](https://v4.webpack.docschina.org/concepts/entry-points/#%E5%88%86%E7%A6%BB-app-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F-%E5%92%8C-vendor-%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%93-%E5%85%A5%E5%8F%A3)的```optimization.splitChunks```尚有不了解，故不做笔记，防止误导

