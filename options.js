function save_options() {
    var userid = document.getElementById("userid").value;
    chrome.storage.local.set({
        userid: userid
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
        userid: ""
    }, function (items) {
        document.getElementById("userid").value = items.userid;
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);