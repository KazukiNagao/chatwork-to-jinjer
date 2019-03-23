var Chatwork = /** @class */ (function () {
    function Chatwork(api_key, room_id) {
        this.api_key = "";
        this.room_id = "";
        this.api_key = api_key;
        this.room_id = room_id;
    }
    Chatwork.prototype.sendMessage = function (body) {
        fetch('https://api.chatwork.com/v2/rooms/' + this.room_id + '/messages', {
            method: 'POST',
            headers: {
                'X-ChatWorkToken': this.api_key,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(function (response) { return console.log(response.json()); });
    };
    return Chatwork;
}());
// 出勤
var start_btn = document.getElementById('ctoj-start-btn');
start_btn.addEventListener('click', function () {
    chrome.storage.local.get(['cwid', 'cwroomid'], function (v) {
        chrome.tabs.query({ title: '*Chatwork*' }, function (tabs) {
            console.log(tabs);
            chrome.runtime.sendMessage("gotowork");
        });
        // let c = new Chatwork(v.cwid, v.cwroomid);
        // c.sendMessage('body=#出勤');
        // let xhr = new XMLHttpRequest();
        // xhr.onload = (e) => {
        //     console.log(e);
        // }
        // xhr.open('GET', 'https://www.chatwork.com/#!rid65959993');
        window.alert('今日も1日がんばりましょう！');
    });
});
// 退勤
var end_btn = document.getElementById('ctoj-end-btn');
end_btn.addEventListener('click', function () {
    chrome.storage.local.get(['cwid', 'cwroomid'], function (v) {
        var c = new Chatwork(v.cwid, v.cwroomid);
        c.sendMessage('body=#退勤');
        window.alert('今日も1日お疲れ様でした！');
    });
});
// 保存
var save_btn = document.getElementById('ctoj-save-id');
save_btn.addEventListener('click', function () {
    var input_text = document.getElementById('ctoj-form-chatwork-id');
    var input_text_room = document.getElementById('ctoj-form-room-id');
    var input_time = document.getElementById('ctoj-form-morning-alarm');
    chrome.storage.local.set({ 'cwid': input_text.value });
    chrome.storage.local.set({ 'cwroomid': input_text_room.value });
    chrome.storage.local.set({ 'ctoj-morning-alarm': input_time.value });
});
// 設定
var setting_btn = document.getElementById('ctoj-setting-btn');
setting_btn.addEventListener('click', function () {
    var input_box = document.getElementById('ctoj-chatwork-input-box');
    input_box.style.display = "block";
});
// 初期化
chrome.storage.local.get(['cwid', 'cwroomid'], function (v) {
    if (!v.cwid || !v.cwroomid) {
        return;
    }
    var input_box = document.getElementById('ctoj-chatwork-input-box');
    input_box.style.display = "none";
    var input_text = document.getElementById('ctoj-form-chatwork-id');
    input_text.value = v.cwid;
    var input_text_room = document.getElementById('ctoj-form-room-id');
    input_text_room.value = v.cwroomid;
});
