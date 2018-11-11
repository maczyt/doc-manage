'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  // 文档
  router.resources('doc', '/doc', controller.doc);
  // 文章
  router.resources('chapter', '/chapter', controller.chapter);
  // module router
  require('./router/vuepress')(app);
};