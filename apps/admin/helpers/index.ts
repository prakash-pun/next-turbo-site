import toast from "react-hot-toast";

export const successMessage = (message: string): any => {
  toast.success(message);
};

export const handleError = (err: any, showToast = true): void => {
  if (err?.response) {
    if (showToast) {
      if (err.response.data && typeof err.response.data === "object") {
        const keys = Object.keys(err.response.data);
        keys.forEach((item) => {
          if (item === "image") {
            const newObj = err.response.data[item];

            Object.keys(newObj).forEach((itm) => {
              toast.error(`${itm.toUpperCase()}: ${newObj[itm]}`);
            });
          } else {
            toast.error(
              `${item.toUpperCase()}: ${
                err.response.data[item] || err.response.data
              }`
            );
          }
        });
      } else if (err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error(`Error with Status code : ${err.response.status}`);
      }
    }
  } else if (err?.request) {
    if (err.request?.status < 100) {
      if (showToast) {
        toast.error("Network Error!");
      }
    }
  } else {
    toast.error(err.detail);
  }
};
