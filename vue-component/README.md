# vue-component

#####
```
scripts": {
  "lib": "vue-cli-service build --target lib --name vue-component --dest lib packages/index.js"
},
--target lib：target有好几个选项。这里是打包成一个库（lib），发布插件的话，一般就是lib。
--name lm-menu-scroll： 打包生成的文件名。
--dest dist ：打包生成的目录名称。这里是lib，默认为dist
packages/index.js：打包的入口文件。
```
##### 上线包
  1. npm login        // 登录， 然后输入账号密码，在控制台看到 logged in as xxx ... 说明登陆成功
  2. npm run lib      如果已经打好了包且没有更新，则不需要这一步
  3. npm publish      // 发布包
