const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './public'),
        //name为入口文件名称,hash为哈希字符,[hash:5]指定生成哈希字符长度
        //每次生成不同的文件名，防止一直引入的是一个文件名的文件，上线后会有缓存问题
        filename: 'js/bundle-[name]-[hash:5].js'
    },
    mode: 'production',
    plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new HtmlWebpackPlugin({
            title:'登录页',
            template:'./src/index.html',
            filename:'login.html'
        }),
        //清空上一次的打包记录
        new CleanWebpackPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         // 把public文件夹复制到输出目录
        //         './src/public',
        //
        //         // 把assets复制到输出目录中的imgs文件夹
        //         { from: "./src/assets", to: "img" },
        //     ],
        // }),
    ],
    module: {
        rules: [
            //转图片
            {
                test: /\.jpeg$/,
                type: 'asset/resource',
                // img  文件名
                generator: {
                    filename: 'img/[name]-[hash][ext]'
                },
            },
            //将图片转成base64
            // {
            //     test:/\.png$/,
            //     type:'asset/inline'
            // }
            {
                //type =asset自动适配，转图片还是base64
                test: /\.png$/,
                type: 'asset',
                // 通过generator.filename设置资源文件名和保存的路径
                generator: {
                    filename: 'img/[name]-[hash][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024 * 20, // 20KB
                    }
                }
            },
            // {
            //     test:/\.css$/,
            //     use:'css-loader', // 或 loader:'css-loader'
            // }
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'], // 先使用css-loader再使用style-loader
                // use:[
                //     'style-loader',
                //     {
                //         loader:'css-loader',
                //         options:{
                //             modules:true
                //         }
                //     }
                // ]
                //支持浏览器兼容写法
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     {
                //         loader: 'postcss-loader',
                //         options: {
                //             postcssOptions: {
                //                 plugins: ['autoprefixer']
                //             }
                //         }
                //     }
                // ]
            //在配置时，除了配置plugins选项，还需要在loader中进行配置，因为是提取css到单独文件，所以删除原来的style-loader，改成MiniCssExtractPlugin.loade
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            //css输出到页面style标签，继续添加style-loader,
            //加载器处理sass结果：css-loader
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.js$/,
                // use:'babel-loader',
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            [
                                '@babel/preset-env',
                                {
                                    targets:'last 2 versions',
                                    useBuiltIns:'usage',
                                    corejs:3
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },

    //清空上一次输出的简写，但是只有5.20.0支持
    output:{
        //...
        clean:true
    },
    devServer:{

    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意:
                // 这里的key命名自定义
                // priority：值越大优先级越高
                // chunks指定哪些模块需要打包，可选值有
                //  * initial: 初始块
                //  * async: 按需加载块(默认)
                //  * all: 全部块

                // common: 打包业务中公共代码（上面的tools.js）
                common: {
                    name: "common", // 指定包名，不指定时使用上层key作为包名
                    chunks: "all",
                    minSize: 10,
                    priority: 0
                },
                // vendor: 打包node_modules中的文件（上面的 lodash）
                vendor: {
                    name: "vendor",
                    test: /node_modules/,
                    chunks: "all",
                    priority: 10
                }
            }
        },
        usedExports:true,
        //压缩后删除不被使用的代码
        minimize:true
    },
    // ...其它选项,不需要打包
    externals: {
        jquery: "jQuery",
    }
}