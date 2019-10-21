const Router = require('koa-router')
var router = new Router();

router.get('/incomereader', (ctx, next) => {
    // ctx.router available
    // ctx.body = {a:1,b:3};
    ctx.redirect('https://wwww.baidu.com');
    ctx.status = 301;
  });
module.exports = router