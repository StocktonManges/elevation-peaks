const baseURL = "http://localhost:5173/";

export const Global = {
  baseURL,
  EPSymbolRed: baseURL + "src/assets/images/EP-Symbol-Red.png",
  EPLogoColor: baseURL + "src/assets/images/EP-Logo-Color.png",
  preventScroll: (bool: boolean) => {
    const htmlElm = document.getElementsByTagName("html")[0];
    if (bool) {
      htmlElm.id = "no-scroll";
    } else {
      htmlElm.id = "";
    }
  },
};
