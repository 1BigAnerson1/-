import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/dom.js";
import {randomString} from "./src/utils/stringUtils.js";

const Status  = ["web","Update","design","Content"];

class TaskVO {
    constructor(title, date, tag) {
        this.title = title;
        this.date  = date;
        this.tag = tag;
    }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTask = getDOM(DOM.Template.Task);

const tasks = [];

getDOM(Dom.Button.CREATE_TASK).onclick = () => {
    console.log('> domPopupCreateTask.classList');

    const domPopupCreateTask = getDOM(Dom.Popup.CREATE_TASK);
    const domBtnClose = QUERY(
        domPopupCreateTask,
        Dom.Button.POPUP_CREATE_TASK_CLOSE
    );
    const domBtnConfirm = QUERY(
        domPopupCreateTask,
        Dom.Button.POPUP_CREATE_TASK_CLOSE
    );

    domPopupCreateTask.classList.remove("hidden");

    const onClosePopup = () => {
        domPopupCreateTask.classList.add("hidden");
        domBtnClose.onclick = null;
        domBtnConfirm.onclick = null;
    };

    domBtnClose.onclick = onClosePopup;

    domBtnConfirm.onclick = () => {
        const taskVO = new TaskVO(randomString(12),Date.now(), Tags[0]);
        const taskView = domTask.cloneNode(true);


        QUERY (taskView, DOM.Template.Task.TITLE).innerText = taskVO.title;

        domTask.parentNode.prepend(taskView);
        tasks.push(taskVO);

        console.log("confirm", taskVO);

        onClosePopup();
    };
};