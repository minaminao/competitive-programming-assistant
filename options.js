function save_options() {
    chrome.storage.local.set({
        userid: document.getElementById("userid").value,
        language: document.getElementById("language").selectedIndex
    }, function () {
        var status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function () {
            status.textContent = "";
        }, 1000);
    });
}

function restore_options() {
    chrome.storage.local.get({
        userid: "",
        language: 1
    }, function (items) {
        document.getElementById("userid").value = items.userid;
        document.getElementById("language").selectedIndex = items.language;
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);