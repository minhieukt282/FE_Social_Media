import {toast} from "react-toastify";

export default function Toastify() {
    toast.success('Account successfully created', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
        onClick: () => {
        }
    })
}