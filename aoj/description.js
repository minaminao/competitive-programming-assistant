(function () {
    'use strict';

    if (!location.href.match(/lang=jp/))
        location.href = location.href + "&lang=jp";

    function getProblemId() {
        var number = location.href.match(/[0-9]{4}/);
        return ('000' + number).slice(-4);
    }

    chrome.storage.local.get({
        userid: ""
    }, function (items) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://judge.u-aizu.ac.jp/onlinejudge/webservice/user?id=" + items.userid);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // xhr.status が undefined になる
                var doc = xhr.responseXML.documentElement;
                var ids = doc.getElementsByTagName("id");
                var accepted = false;
                var id = getProblemId();
                for (var i = 0; i < ids.length; i++)
                    if (ids[i].innerHTML == id)
                        accepted = true;
                chrome.runtime.sendMessage({ accepted: accepted });
            }
        }
        xhr.send();
    });
})();