/* eslint-disable no-undef, no-unused-vars */
'use strict';

const csrftoken = Cookies.get('csrfToken');

function csrfAjax(url, type, data, success, error) {
  $.ajax(url, {
    type,
    data,
    beforeSend(xhr) {
      xhr.setRequestHeader('x-csrf-token', csrftoken);
    },
    success,
    error,
  });
}