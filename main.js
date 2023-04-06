import "uno.css";
import '@unocss/reset/tailwind.css';

const domBtnCreateTask = document.getElementById('btnCreateTask');
const domBtnCreateTask = document.getElementById('popupCreateTask');
const domBtnCreateTaskPopup = document.getElementById('popupCreateTaskpopup');

domBtnCreateTask.onclick = (e) => {
    console.log(e);
    domBtnCreateTask.classList.remove('hidden');

    const domBtnCloseCreateTaskPopup = document.getElementById("btnCloseCreateTaskPopup");
     domBtnCloseCreateTaskPopup.onclick = () => {
        domBtnCreateTask.classList.add("hidden");
        domBtnCreateCreateTaskPopup.onclick= null;
    };
};