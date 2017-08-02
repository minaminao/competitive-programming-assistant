(function () {
    'use strict';

    function getTaskName() {
        var taskname = location.href.match(/\/[^\/]+$/)[0];
        return taskname.slice(1);
    }
    chrome.storage.local.get({
        userid: ""
    }, function (items) {
        var hostname = location.hostname;
        var taskname = getTaskName();
        var xhr = new XMLHttpRequest();
        var url = "http://" + hostname + "/submissions/all?task_screen_name=" + taskname + "&language_screen_name=&status=AC&user_screen_name=" + items.userid;
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // xhr.status が undefined になる
                var doc = xhr.responseXML.documentElement;
                var accepted = doc.getElementsByClassName("label-success").length ? true : false;
                chrome.runtime.sendMessage({ content: "atcoder/ac.js", accepted: accepted });
            }
        }
        xhr.responseType = "document";
        xhr.send();
    });
})();