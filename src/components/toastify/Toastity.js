import {toast} from "react-toastify";

export default function Toastify({displayName, content}) {
    toast(`${displayName} ${content}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
        onClick: () => {
        }
    })
}