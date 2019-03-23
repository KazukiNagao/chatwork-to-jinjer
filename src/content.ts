chrome.runtime.onMessage.addListener((msg: object) => {
    if (msg['key'] == "gotowork") {
        putMessage("#出勤", "今日も1日がんばりましょう！");
    } else if (msg['key'] == 'outwork') {
        putMessage("#退勤", "お疲れ様でした！");
    }
});

async function putMessage(message: string, alertMessage: string) {
    let roomList = <HTMLCollection>document.getElementsByClassName('roomListItem');
    await getRoom(roomList).then((room: HTMLElement) => {
        room.click();
        let chat_area: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('_chatText');
        if (!chat_area) {
            return;
        }
        chat_area!.value = message;
        let submit_btn: HTMLDivElement = <HTMLDivElement>document.getElementById('_sendButton');
        submit_btn.click();
        window.alert(alertMessage);
    });
}

function awaitForClick(room: HTMLElement): Promise<string> {
    return new Promise((resolve) => {
        room.click();
        return resolve();
    });
}

function getRoom(roomList: HTMLCollection): Promise<Element> {
    return new Promise((resolve) => {
            chrome.storage.local.get(['cwroomid'], (v) => {
            for (var i = 0; i < roomList.length; i++) {
                let room = roomList.item(i);
                let roomID = room.getAttribute('data-rid');
                if (roomID == v.cwroomid) {
                    return resolve(room);
                }
            }
        })
    });
}