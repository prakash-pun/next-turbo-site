const withTM = require("next-transpile-modules")(["ui", "utils"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["aanay.pythonanywhere.com"],
  },
});
