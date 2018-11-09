'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('home.pug', {
      docList: [{
        title: '字典管理',
        category: '大数据',
        update: new Date(),
        id: 1,
        user: {
          id: 1,
          name: '周宇涛',
          detail: '小辣鸡',
        },
      }],
    });
  }
}

module.exports = HomeController;