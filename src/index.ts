class Chatwork {
    api_key: string = ""
    room_id: string = ""

    constructor(api_key: string, room_id: string) {
        this.api_key = api_key;
        this.room_id = room_id;
    }

    sendMessage(body: any) {
        fetch('https://api.chatwork.com/v2/rooms/' + this.room_id + '/messages',{
            method: 'POST', 
            headers: {
                'X-ChatWorkToken': this.api_key,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        }).then(response => console.log(response.json()));
    }

}

// 出勤
let start_btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('ctoj-start-btn');
start_btn.addEventListener('click', () => {
    chrome.storage.local.get(['cwid', 'cwroomid'], (v) => {
        let c = new Chatwork(v.cwid, v.cwroomid);
        c.sendMessage('body=#出勤');
        window.alert('今日も1日がんばりましょう！');
    })    
});

// 退勤
let end_btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('ctoj-end-btn');
end_btn.addEventListener('click', () => {
    chrome.storage.local.get(['cwid', 'cwroomid'], (v) => {
        let c = new Chatwork(v.cwid, v.cwroomid);
        c.sendMessage('body=#退勤');
        window.alert('今日も1日お疲れ様でした！');
    })
});

// 保存
let save_btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('ctoj-save-id');
save_btn.addEventListener('click', () => {
    let input_text: HTMLInputElement = <HTMLInputElement>document.getElementById('ctoj-form-chatwork-id');
    let input_text_room: HTMLInputElement = <HTMLInputElement>document.getElementById('ctoj-form-room-id');
    let input_time: HTMLInputElement = <HTMLInputElement>document.getElementById('ctoj-form-morning-alarm');
    chrome.storage.local.set({ 'cwid': input_text.value });
    chrome.storage.local.set({ 'cwroomid': input_text_room.value });
    chrome.storage.local.set({ 'ctoj-morning-alarm': input_time.value});
});

// 設定
let setting_btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('ctoj-setting-btn');
setting_btn.addEventListener('click', () => {
    let input_box: HTMLDivElement = <HTMLDivElement>document.getElementById('ctoj-chatwork-input-box');
    input_box.style.display = "block";
})

// 初期化
chrome.storage.local.get(['cwid', 'cwroomid'], (v) => {
    if (!v.cwid || !v.cwroomid) {
        return;
    }
    let input_box: HTMLDivElement = <HTMLDivElement>document.getElementById('ctoj-chatwork-input-box');
    input_box.style.display = "none";
    let input_text: HTMLInputElement = <HTMLInputElement>document.getElementById('ctoj-form-chatwork-id');
    input_text.value = v.cwid;
    let input_text_room: HTMLInputElement = <HTMLInputElement>document.getElementById('ctoj-form-room-id');
    input_text_room.value = v.cwroomid
});