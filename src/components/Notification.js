import { ToastContainer, toast,Slide,Flip,Bounce,Zoom } from 'react-toastify';

export function Notification(content,type){
  if(type.toUpperCase()=="SUCCESS"){
      return toast.success(content, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
  }
  else if(type.toUpperCase()=="ERROR"){
    return toast.error(content, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  }
}