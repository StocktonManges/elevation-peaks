const baseURL = "http://localhost:5173/";

export const Global = {
  baseURL,
  preventScroll: (bool: boolean) => {
    const htmlElm = document.getElementsByTagName("html")[0];
    if (bool) {
      htmlElm.id = "no-scroll";
    } else {
      htmlElm.id = "";
    }
  },
};
