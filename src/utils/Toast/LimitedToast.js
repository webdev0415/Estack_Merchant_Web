import { toast } from 'react-toastify';

class LimitedToasts {
  constructor() {
    this.toastList = new Set();
  }

  create(TOAST, LIMIT = 0) {
    if (this.toastList.size === LIMIT) {
      const iterator = this.toastList.values();
      const toastId = iterator.next().value;
      toast.dismiss(toastId);
      this.toastList.delete(toastId);
    }
    this.toastList.add(TOAST);
  }
}

export default LimitedToasts;
