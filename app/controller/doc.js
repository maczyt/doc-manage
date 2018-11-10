'use strict';

const Controller = require('egg').Controller;
const join = require('path').join;
const fs = require('fs');

class DocController extends Controller {
  /**
   * get
   * /doc
   * 文档列表
   */
  async index() {
    const list = await this.ctx.service.doc.list();
    await this.ctx.render('home.pug', {
      docList: list,
    });
  }

  /**
   * get
   * /doc/new
   * 新增文档 页面
   */
  async new() {
    await this.ctx.render('docs/new.pug');
  }

  /**
   * post
   * /doc
   * 新增文档
   */
  async create() {
    const doc = this.ctx.request.body;
    await this.ctx.service.doc.create(Object.assign({}, doc, {
      user: 1,
      create: new Date(),
      update: new Date(),
    }));
    this.ctx.body = {
      code: 200,
      msg: '添加成功',
    };
  }

  /**
   * delete
   * /doc/:id
   * 删除文档
   */
  async destroy() {
    //
  }

  /**
   * put
   * /doc/:id
   * 修改文档
   */
  async update() {
    //
  }

  /**
   * get
   * /doc/:id
   * 查看文档
   */
  async show() {
    const {
      id,
    } = this.ctx.params;
    this.ctx.type = 'html';
    this.ctx.body = fs.readFileSync(join(__dirname, '../public/docDist', id, '.vuepress/dist/index.html'));
  }
}

module.exports = DocController;