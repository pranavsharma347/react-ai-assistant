import NProgress from "nprogress";
import "nprogress/nprogress.css";

// OPTIONAL: Customize
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
});

export default NProgress;
