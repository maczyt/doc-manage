/* eslint-disable no-undef */

'use strict';

$(function () {

  // 初始化折叠菜单
  $('.accordion').accordion({
    selector: {
      trigger: '.title',
    },
  });
});