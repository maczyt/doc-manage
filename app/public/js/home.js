/* eslint-disable no-undef */

'use strict';

$(function () {

  // 生成文档
  $('.generate').click(function () {
    const $this = $(this);
    const docId = $this.data('docid');
    $this.addClass('loading disabled');
    csrfAjax(
      '/vuepress/generate',
      'POST', {
        docId,
      },
      function (res) {
        console.log('res', res);
        $this.removeClass('loading disabled');
      }
    );
  });
});