'use strict';

module.exports = app => {
  app.router.post('/vuepress/generate', app.controller.vuepress.generate);
};