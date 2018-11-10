'use strict';

const Controller = require('egg').Controller;

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
   * 新增文档
   */
  async new() {
    await this.ctx.render('docs/new.pug');
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
    //
  }
}

module.exports = DocController;