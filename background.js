chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    chrome.pageAction.setIcon({ "tabId": sender.tab.id, "path": "img/ac.png" });
    if (message.accepted)
        chrome.pageAction.show(sender.tab.id);
});