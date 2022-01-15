# mode(模式)
> 该参数作为webpack打包参数，有以下值
+ development(作为开发环境打包，会将依赖等都打包进去)
+ production(默认，只会打包业务代码)
+ none

## 用法
+ 在配置文件中指定
```javascript
// webpack.config.js
module.exports = {
    mode:'development'
}
```
+ 通过启动命令指定
```bash
npx webpack --mode=production
```

## 注意
> 如果要根据配置的mode来改变打包的行为，必须导出一个函数，而非对象，如下
```javascript
// webpack.config.js
const config = {
    entry:'./src/index.js',
    devtool:'source-map'
    // ...
}

module.exports = (env,argv) => {
    if(argv.mode === 'development'){
        config.devtool = 'eval'
    }
    if(argv.mode === 'production'){
        // ...
    }

    return config;
}

```
