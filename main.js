import "uno.css";
import "@unocss/reset/tailwind.css";
import Dom from "./src/dom.js";
import {randomString} from "./src/utils/stringUtils.js";

const Status  = ["web","Update","design","Content"];

class TaskVO {
    constructor(title, date, status) {
        this.title = title;
        this.date  = date;
        this.status = status;
    }
}

const task = new TaskVO("Read")

const DOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);
DOM(Dom.Button.CREATE_TASK).onclick = () => {
    console.log("> domPopupCreateTask.classList");

    const domPopupCreateTask = DOM(
        Dom.Popup.CREATE_TASK
    );

    const domClosePopupCreateTask = QUERY(
        domPopupCreateTask,
        Dom.Button.CLOSE_POPUP_CREATE_TASK
    );

    const domBtnConfirm = QUERY(
        domPopupCreateTask,
        Dom.Button.CLOSE_POPUP_CREATE_TASK
    );

    domPopupCreateTask.classList.remove("hidden");

    const onClosePopup = () => {
        domPopupCreateTask.classList.add("hidden");
        domBtnClose.onclick = null;
        domBtnConfirm.onclick = null;
    };

    domBtnConfirm.onclick = () => {
        const taskVO = new TaskVO(randomString(12),Date.now(), Tags[0]);
        const taskView = domTask.cloneNode(true);
        QUERY (taskView, DOM.Template.Task.TITLE).innerText = taskVO.title;

        domTask.parentNode.prepend(taskView);
        tasks.push(taskVO);

        console.log("confirm", taskVO);
    };
};