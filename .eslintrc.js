const {ESLint} = require('eslint');

// TODO: eslint를 구성해 보세요.
module.exports = {
  parser: "babel-eslint",
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  extends: "eslint:recommended",
  env: {
    node: true,
    browser:true
  }
}