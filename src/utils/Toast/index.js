import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import LimitedToasts from './LimitedToast';

class ToastController {
  success = new LimitedToasts();

  error = new LimitedToasts();

  message = new LimitedToasts();

  info = new LimitedToasts();

  successToast = (text) => this.success.create(
    toast(text, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'success',
    }),
    2,
  );

    successPayment = (text) => this.success.create(
      toast(text, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'success',
      }),
      2,
    );

  errorToast = (text) => this.error.create(
    toast(text, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      type: 'error',
    }),
    2,
  );

    infoToast = (text) => this.info.create(
      toast(text, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'info',
      }),
      2,
    );

  messageToast = (text) => this.message.create(
    toast(text, {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }),
    5,
  );
}

const Toast = new ToastController();
export default Toast;
