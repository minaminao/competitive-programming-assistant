function isAc(url, userid) {
    var matches = url.match(/^.+?:\/\/(.+?)\/tasks\/(.*)$/);
    if (matches == null) return false;
    var hostname = matches[1];
    var taskname = matches[2];
    var xhr = new XMLHttpRequest();
    var submissions_url = "http://" + hostname + "/submissions/all?task_screen_name=" + taskname + "&language_screen_name=&status=AC&user_screen_name=" + userid;

    xhr.open('GET', submissions_url, false);
    xhr.send();
    // accepted を返り値としたいので、非同期リクエストではなく同期リクエストを使う   
    //console.log(xhr.status);
    if (xhr.status == 200) {
        //console.log(xhr.responseText);
        var accepted = xhr.responseText.indexOf("label-success") != -1;
        //console.log(accepted);
        return accepted;
    }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.content == "aoj/description.js"
        || message.content == "atcoder/ac.js") {
        chrome.pageAction.setIcon({ "tabId": sender.tab.id, "path": "img/ac.png" });
        if (message.accepted)
            chrome.pageAction.show(sender.tab.id);
    } else if (message.content == "atcoder/link.js") {
        chrome.tabs.sendMessage(sender.tab.id, { ac: isAc(message.url, message.userid), idx: message.idx }, function (response) { });
    }
});

