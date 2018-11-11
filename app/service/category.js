'use strict';

const join = require('path').join;
const Service = require('egg').Service;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(join(__dirname, '../../db/doc.json'));
const db = lowdb(adapter);

class CategoryService extends Service {
  async index(docId) {
    const categorys = db.get('category').cloneDeep().value() || [];
    return categorys.filter(c => {
      return c.docId === +docId;
    });
  }
}

module.exports = CategoryService;