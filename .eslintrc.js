module.exports = {
  extends: ['react-app'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
    },
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off"
  }
};
