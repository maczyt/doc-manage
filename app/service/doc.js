'use strict';

const join = require('path').join;
const Service = require('egg').Service;
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(join(__dirname, '../../db/doc.json'));
const db = lowdb(adapter);

class DocService extends Service {
  async list() {
    let data = db.get('doc').value();
    data = data.map(doc => {
      return Object.assign(doc, {
        user: db.get('user').find({
          id: doc.id,
        }).value(),
      });
    });

    return data;
  }
}

module.exports = DocService;