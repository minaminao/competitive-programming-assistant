(function () {
    'use strict';

    var a = document.getElementsByTagName("a");
    chrome.storage.local.get({
        userid: ""
    }, function (items) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].href.indexOf("atcoder.jp/tasks") >= 0) {
                chrome.runtime.sendMessage({ content: "atcoder/link.js", url: a[i].href, userid: items.userid, idx: i },
                    function (response) { });
            }
        }
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.ac) {
            console.log(message.idx);
            console.log(message.ac);
            a[message.idx].style.backgroundColor = '#5cb85c';
        }
    });
})();