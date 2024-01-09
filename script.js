import { House } from './House.js';
import { Robot, createLayout } from './Robot.js';

const play = () => {
  const houseSize = [10, 10];

  let robot = new Robot();
  let house = new House(createLayout(houseSize), robot);
  let time = 0;
  let speed = 200;

  const workInterval = setInterval(() => {
    console.clear();
    robot.logBattery();
    house.logLayout();
    time += 1;

    if (!house.isAllClean() && robot.doWork(house)) {
      return;
    }

    clearInterval(workInterval);
    console.log(`🤖 a terminé le nettoyage en ${time} fois.`);
  }, speed);
};

play();
