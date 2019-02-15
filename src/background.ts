function create_notification() {
    let options = {
        type: 'basic',
        title: 'chatwork-to-jinjer',
        iconUrl: 'icon.png',
        message: 'そろそろ出勤のお時間です。',
        buttons: [{ title: '出勤' }]
    }
    chrome.notifications.create('', options);
}

chrome.alarms.create({periodInMinutes: 1})
chrome.alarms.onAlarm.addListener(() => {
    let now = new Date();
    if (now.getHours() == 8 && now.getMinutes() == 50) {
        create_notification();
    }
});