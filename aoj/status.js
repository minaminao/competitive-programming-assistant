(function () {
    'use strict';
    chrome.storage.local.get({ language: 1 }, function (items) {
        document.getElementById("submit_language").selectedIndex = items.language;
    })
})();