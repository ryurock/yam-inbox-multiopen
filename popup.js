// Copyright (c) 2014 ryurock All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var yamGenerator = {
  /**
   * Yammer API URL that will give us lots and lots of whatever we're looking for.
   *
   * See https://developer.yammer.com/restapi/#rest-messages
   *
   * @type {string}
   * @private
   */
  searchMessageInboxUnSeen_: 'https://www.yammer.com/api/v1/messages/inbox.json?' +
      'filter=inbox_unseen;unarchived&' +
      'threaded=extended',


  requestYam: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchMessageInboxUnSeen_, true);
    req.onload = this.unSeen2Seen_.bind(this);
    req.send(null);
  },

  unSeen2Seen_: function (e) {
    var messages = JSON.parse(e.target.response).messages;

    messages.forEach(function(value, index) {
      chrome.tabs.create({url: value.web_url, active: false});
    });
  },


  removeSeenTab_: function (id) {
    chrome.tabs.remove(id);
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  yamGenerator.requestYam();
});
