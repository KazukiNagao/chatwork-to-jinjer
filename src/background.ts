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
    getAlarm(now).then(d => {
        if (now.getHours() == d.getHours() && now.getMinutes() == d.getMinutes()) {
            create_notification();
        }        
    });
});

function getAlarm(now: Date): Promise<Date> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['ctoj_morning_alarm'], (v) => {
            const times = v.ctoj_morning_alarm.split(':')
            return resolve(new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(times[0]), parseInt(times[1])));
        });
    });
}