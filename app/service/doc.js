'use strict';

const join = require('path').join;
const Service = require('egg').Service;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(join(__dirname, '../../db/doc.json'));
const db = lowdb(adapter);

db._.mixin({
  docId(doc) {
    return doc[doc.length - 1].id;
  },
});
class DocService extends Service {
  /**
   * 文档列表
   */
  async list() {
    let data = db.get('doc').value();
    data = data.map(doc => {
      const user = db.get('user').find({
        id: doc.user,
      }).value();

      return Object.assign({}, doc, {
        user: user || {},
      });
    });

    return data;
  }

  /**
   * 创建文档
   * @param {*} doc 
   */
  async create(doc) {
    Object.assign(doc, {
      id: +db.get('doc').docId().value() + 1,
    });
    return await db.get('doc').push(doc).write();
  }

  /**
   * 获取文档
   */
  async get(docId) {
    const doc = db.get('doc').find({
      id: +docId,
    }).value();
    return doc || null;
  }
}

module.exports = DocService;