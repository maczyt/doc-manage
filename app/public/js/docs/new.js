/* eslint-disable no-undef */

'use strict';

$(function () {

  // init tui.edit
  const editor = new tui.Editor({
    el: document.querySelector('#editMain'),
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: '300px',
  });

  // 隐藏WYSIWYG，只显示MARKDOWN
  editor.getUI().getModeSwitch().hide();

  $('.submit').click(function () {
    console.log($('.form').serializeArray());
  });
});