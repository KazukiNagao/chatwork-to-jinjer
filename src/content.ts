function main() {
    let bar_div = document.getElementById('_chatSendToolbar');
    if (!bar_div) {
        return;
    }
    let bar_list = bar_div.querySelector("ul");
    if (!bar_list) {
        return;
    }

    let chat_area: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById('_chatText');
    if (!chat_area) {
        return;
    }

    let submit_btn: HTMLDivElement = <HTMLDivElement>document.getElementById('_sendButton');
    if (!submit_btn) {
        return;
    }
    
    let start_btn = document.createElement('button');
    start_btn.textContent = "出勤";
    start_btn.classList.add('jinjer-start-btn');
    start_btn.addEventListener('click', () => {
        chat_area!.value = "#出勤";
        submit_btn!.click();
    });
    let start_li = document.createElement('li');
    start_li.appendChild(start_btn);
    bar_list.appendChild(start_li);

    let end_btn = document.createElement('button');
    end_btn.textContent = "退勤";
    end_btn.classList.add('jinjer-end-btn');
    end_btn.addEventListener('click', () => {
        chat_area!.value = "#退勤";
        submit_btn!.click();
    });
    let end_li = document.createElement('li');
    end_li.appendChild(end_btn);
    bar_list.appendChild(end_btn);
}