/* eslint-disable */
// leancloud存储服务
var AV = require('leancloud-storage/live-query');
var { Query, User } = AV;

//初始化
//用户管理系统
// var App_ID = 'Rkae71rKXdodEKYbyVG0iyHH-gzGzoHsz'; 
// var App_KEY = 'ssU269tQ7xBjKpgRTlMSE6yl'; 
//个人博客
var App_ID = 'x2LkeH4wfdgX8Xegf5iARoz0-gzGzoHsz'; 
var App_KEY = 'zO9SCE5jIuSj0Ewh9Q3itGgs'; 
AV.init({
    appId: App_ID,
    appKey: App_KEY
})
module.exports =  AV