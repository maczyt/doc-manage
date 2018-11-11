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

  editor.setHtml("#{docData.mainContentHtml}");

  $('.submit').click(function () {

    $(this).addClass('loading disabled');

    const formData = $('.form').serializeArray();
    const dataObj = {};
    const featureTitle = [];
    const featureContent = [];
    const ftRE = /^feature-title/;
    const fcRE = /^feature-content/;
    formData.forEach(item => {
      if (ftRE.test(item.name)) {
        featureTitle.push(item.value);
      } else if (fcRE.test(item.name)) {
        featureContent.push(item.value);
      } else {
        dataObj[item.name] = item.value;
      }
    });

    dataObj.features = [];
    featureTitle.forEach((name, index) => {
      dataObj.features.push({
        title: name,
        content: featureContent[index] || '',
      });
    });
    dataObj.mainContent = editor.getMarkdown();

    // csrfAjax('/doc/')

  });

  window.editor = editor;

});