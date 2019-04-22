chrome.runtime.onMessage.addListener((msg: object) => {
    if (msg['key'] == "gotowork") {
        putMessage("#出勤", "今日も1日がんばりましょう！");
    } else if (msg['key'] == 'outwork') {
        putMessage("#退勤", "お疲れ様でした！");
    }
    return true;
});

async function putMessage(message: string, alertMessage: string) {
    const roomListDiv = <HTMLDivElement>document.getElementById('_roomListArea');
    const roomList = <HTMLCollection>roomListDiv.getElementsByTagName('roomlist');
    const roomListULlist = <HTMLCollection>roomList[0].getElementsByTagName('li');
    await getRoom(roomListULlist).then((room: HTMLElement) => {
        room.click();
        let chat_area: HTMLTextAreaElement = <HTMLTextAreaElement>(
            document.getElementById("_chatText")
        );
        if (!chat_area) {
            return true;
        }
        let chat_area_title: HTMLCollection = <HTMLCollection>(
            document.getElementsByClassName("_roomTitleText")
        );

        let roomLabel = room.getAttribute('aria-label');
        if (chat_area_title[0].textContent != roomLabel) {
            window.alert('うまく打刻できなかったから、もう一回ボタン押してください。')
            return;
        }

        chat_area!.value = message;
        let submit_btn: HTMLDivElement = <HTMLDivElement>(
            document.getElementById("_sendButton")
        );
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