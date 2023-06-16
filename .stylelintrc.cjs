module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-html/astro",
    "@namics/stylelint-bem",
    "stylelint-config-clean-order"
  ],
  rules: {
    /** selector class pattern must match [BEM CSS](https://en.bem.info/methodology/css) - [Regex](https://regexr.com/3apms) */
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
        return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
      },
      },
    ]
  }
}
