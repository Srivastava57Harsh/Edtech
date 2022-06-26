import { toast } from 'react-toastify';

export async function sendToast(displayString: string, errorType: string) {
  if (errorType == 'success') {
    toast.success(displayString, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      progress: undefined,
    });
  } else if (errorType == 'warn') {
    toast.warn(displayString, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      progress: undefined,
    });
  } else if (errorType == 'error') {
    toast.error(displayString, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
      progress: undefined,
    });
  }
}
