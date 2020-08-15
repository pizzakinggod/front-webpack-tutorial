import "./app.scss";
import MainController from "./controllers/MainController.js";

/**
 * TODO eslint가 중복 세미콜론을 제거합니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  new MainController();
});
