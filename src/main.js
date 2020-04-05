const TASK_COUNT = 3;

import {createMenuTemplate} from "./components/main-menu";
import {createFilterTemplate} from "./components/site-filter";
import {createBoardTemplate} from "./components/board";
import {createTaskEditTemplate} from "./components/task-edit";
import {createTaskTemplate} from "./components/task-card";
import {createLoadMoreButtonTemplate} from "./components/load-more";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const siteBoard = siteMainElement.querySelector(`.board`);
const siteBoardList = siteMainElement.querySelector(`.board__tasks`);

render(siteBoardList, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteBoardList, createTaskTemplate());
}

render(siteBoard, createLoadMoreButtonTemplate());
