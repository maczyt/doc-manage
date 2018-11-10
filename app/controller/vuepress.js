'use strict';

const Controller = require('egg').Controller;
const makeDir = require('make-dir');
const path = require('path');
const write = require('write');
const execa = require('execa');

class VuepressController extends Controller {
  async generate() {
    const data = this.ctx.request.body;
    const {
      docId,
    } = data;

    const docData = await this.ctx.service.doc.get(docId);
    const docPath = makeDir.sync(path.join(__dirname, '../public/docDist', docId));
    const vuepressPath = makeDir.sync(path.join(docPath, '.vuepress'));
    const configStr = `module.exports = {
      base: "/public/docDist/${docId}/.vuepress/dist",
      title: "${docData.title}",
      description: "${docData.description}",
      themeConfig: {},
    }`;


    let featuresStr = 'feature:';
    if (docData.features.length) {
      docData.features.forEach(feature => {
        featuresStr += `
  - title: ${feature.title}
    details: ${feature.content}`;
      });
    }
    const readmeStr = `---
home: true
${featuresStr}
footer: ${docData.footer}
--- 

${docData.mainContent}
`;

    // write .vuepress/config.js
    write.sync(path.join(vuepressPath, 'config.js'), configStr);
    // write README.md
    write.sync(path.join(docPath, 'README.md'), readmeStr);

    try {
      await execa.shell('npx vuepress build ' + path.join(docPath));
      this.ctx.body = {
        code: 200,
        msg: 'ok',
      };
    } catch (err) {
      this.ctx.status = 520;
      this.ctx.body = {
        code: 500,
        msg: err.message,
      };
    }

  }
}

module.exports = VuepressController;