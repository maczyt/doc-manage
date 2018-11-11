'use strict';

const join = require('path').join;
const Service = require('egg').Service;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(join(__dirname, '../../db/doc.json'));
const db = lowdb(adapter);

class ChapterService extends Service {
  async index(docId) {
    const chapters = db.get('chapter').value() || [];
    return chapters.filter(c => {
      return c.docId === +docId;
    });
  }

  async category(categoryId) {
    const chapters = db.get('chapter').value() || [];
    return chapters.filter(c => {
      return c.categoryId === +categoryId;
    });
  }
}

module.exports = ChapterService;