
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-3S2DVD7EX8");
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
ReactGA.event({
  category: params.category || 'General',
  action: eventName,
  label:params.label,
  value: params.value,
  ...params
})
}

