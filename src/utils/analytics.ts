import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-MBSLR0FCG6");
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
