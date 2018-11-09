window.dataLayer = window.dataLayer || [];

/**
 * Push some extra attribute on the GTag data layer.
 */
const gtag = (...args) => {
  window.dataLayer.push(args);
};

export default gtag;
