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