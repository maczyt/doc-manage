'use strict';

const Controller = require('egg').Controller;

class ChapterController extends Controller {

  async index() {
    const {
      docId,
    } = this.ctx.query;
    const category = await this.ctx.service.category.index(docId);
    let chapters = await this.ctx.service.chapter.index(docId);
    chapters = chapters.slice(0);
    for (let i = 0, len = category.length; i < len; i++) {
      const c = category[i];
      const chapter = await this.ctx.service.chapter.category(c.id) || [];
      c.chapter = await chapter;
    }

    // 剔除不需要的
    for (let i = 0, len = chapters.length; i < len; i++) {
      const c = chapters[i];
      if (typeof c.categoryId === 'undefined') {
        chapters.splice(i, 1);
      }
    }

    await this.ctx.render('chapter/index.pug', {
      category,
      chapters,
    });
  }

  async new() {
    this.ctx.body = 'new Chapter in doc ' + this.ctx.query;
  }

  async show() {
    //
  }

  async edit() {
    //
  }

}


module.exports = ChapterController;