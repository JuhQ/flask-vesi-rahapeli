// peli means "game" in Finnish

const gameArea = document.querySelector("#game");

let playerName = "";

// reusable function to call backend endpoints and return JSON response
const callBackend = async (path) => {
  const response = await fetch(path);
  const json = await response.json();
  return json;
};

// each api call as their own function
const createNewGame = async (playerName) => {
  return await callBackend("/new-game/" + playerName);
};

const loadOldGame = async (playerName) => {
  return await callBackend("/get-game/" + playerName);
};

const addMoney = async (playerName) => {
  return await callBackend("/add-money/" + playerName);
};

const addWater = async (playerName) => {
  return await callBackend("/add-water/" + playerName);
};

// create new game
// first find the element, then register an event listener for the submit event
document
  .querySelector("form#new-game")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector(
      "form#new-game [name=player-name]",
    ).value;

    if (name.length) {
      console.log("nimi", name);
      playerName = name;

      const data = await createNewGame(name);

      console.log("data", data);
    }
  });

// vanhan pelin lataaminen
document
  .querySelector("form#load-game")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector(
      "form#load-game [name=player-name]",
    ).value;

    if (name.length) {
      console.log("nimi", name);
      playerName = name;

      const data = await loadOldGame(name);
      console.log("data", data);
      document.querySelector("#money").innerHTML = `Money: ${data.money}`;
      document.querySelector("#water").innerHTML = `Water: ${data.water}`;
    }
  });

// rahan lisääminen
document
  .querySelector("button#add-money")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    if (playerName.length) {
      const data = await addMoney(playerName);
      console.log("data", data);

      document.querySelector("#money").innerHTML = `Money: ${data.money}`;
    }
  });

// veden lisääminen
document
  .querySelector("button#add-water")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    if (playerName.length) {
      const data = await addWater(playerName);
      console.log("data", data);

      document.querySelector("#water").innerHTML = `Water: ${data.water}`;
    }
  });
