import {createMenuTemplate} from "./components/main-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskEditTemplate} from "./components/task-edit";
import {createTaskTemplate} from "./components/task-card";
import {createLoadMoreButtonTemplate} from "./components/load-more";
import {generateFilters} from "./mocks/filter";
import {generateTasks} from "./mocks/task";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const siteBoard = siteMainElement.querySelector(`.board`);
const siteBoardList = siteMainElement.querySelector(`.board__tasks`);

render(siteBoardList, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const generateTaskOnBoard = (positionTask) => {
  tasks.slice(positionTask, showingTasksCount)
    .forEach((task) => render(siteBoardList, createTaskTemplate(task), `beforeend`));
};

generateTaskOnBoard(1);

render(siteBoard, createLoadMoreButtonTemplate());

const loadMoreButton = siteBoard.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  generateTaskOnBoard(prevTasksCount);

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
