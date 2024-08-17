/** @type {import('stylelint').Config} */

module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-clean-order", "stylelint-config-recommended-vue/scss"],
  plugins: ["stylelint-scss"],
  rules: {
    "selector-class-pattern": [
      "^[a-z]+([a-z_]+|__[a-z]+)?$",
      {
        resolveNestedSelectors: true,
      },
    ],
  },
};
