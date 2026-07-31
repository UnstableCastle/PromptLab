// Simple pub-sub so toast.success()/toast.error() can be called from
// ANYWHERE - not just React components. This matters because API calls
// often live in redux thunks or axios interceptors, which can't use
// React Context or hooks. ToastContainer subscribes to this and renders.

let listeners = [];

function emit(payload) {
  listeners.forEach((listener) => listener(payload));
}

const toast = {
  /**
   * @param {string} message
   * @param {{ title?: string, duration?: number }} [options]
   */
  success: (message, options = {}) => {
    emit({ type: "success", message, ...options });
    // console.log(message,"s=s=s=s=s=s");
  },
  error: (message, options = {}) =>
    emit({ type: "error", message, ...options }),
  warning: (message, options = {}) =>
    emit({ type: "warning", message, ...options }),
  info: (message, options = {}) => emit({ type: "info", message, ...options }),

  // Used internally by ToastContainer - you shouldn't need to call this directly.
  subscribe: (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export default toast;
