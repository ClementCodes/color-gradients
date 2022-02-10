/** @format */
const inputCouleur = document.querySelectorAll(".inp-couleur");
const inputRange = document.querySelector(".inp-range");
const btns = document.querySelectorAll("button");
const fond = document.body;
const containerCouleurs = document.querySelector(".container-couleurs");
const span = document.querySelector("span");
const btnRandom = document.querySelector(".random");
//demarage
let valCouleurs = ["#BA5370", "#F4E2D8"];
let inclinaison = 45;

// comme il y a deja deux index dans le html c'est pour ca que je rajoute un troisieme qui va etre créé
let index = 3;
inputCouleur[0].value = valCouleurs[0];
inputCouleur[1].value = valCouleurs[1];
inputCouleur[0].style.background = valCouleurs[0];
inputCouleur[1].style.background = valCouleurs[1];
fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs[0]}, ${valCouleurs[1]})`;

//ce la aurait pu etre ecrit comme suit
// fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
// console.log(valCouleurs);

inputRange.addEventListener("input", (e) => {
  //fois 3.6 car la range va jusqu 'a 100 et nous on veut fu 360 degres donc nous aurions pu modifier la range mais le plus simple est d utiliser cete facon de faire
  inclinaison = e.target.value * 3.6;

  fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
});

//Rajout / suppression

btns.forEach((btn) => {
  btn.addEventListener("click", rajouteEnleve);
});

function rajouteEnleve(e) {
  span.innerText = "";
  const allInputs = document.querySelectorAll(".inp-couleur");

  const randomColor = Math.floor(Math.random() * 1667215).toString(16);
  //   console.log(randomColor);

  if (e.target.className === "plus") {
    if (allInputs.length > 8) {
      return;
    }

    const nvCouleur = document.createElement("input");
    nvCouleur.setAttribute("class", "inp-couleur");
    nvCouleur.setAttribute("data-index", index);
    nvCouleur.setAttribute("maxlength", 7);
    nvCouleur.value = `#${randomColor.toUpperCase()}`;
    nvCouleur.style.background = `#${randomColor}`;
    containerCouleurs.appendChild(nvCouleur);

    valCouleurs.push(`#${randomColor.toUpperCase()}`);
    // MAJ du fond
    fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
    index++;
  } else if (e.target.className === "moins") {
    if (valCouleurs.length === 2) {
      span.innerText = "il faut au moins deux couleurs ";
    } else {
      valCouleurs.pop();
      allInputs[allInputs.length - 1].remove();
      index--;
      fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
      //inputs de mise a jour //Inputs de base
      allInputs.forEach((inp) => {
        inp.addEventListener("input", MAJCOLORS);
      });
      //
    }
  }
  //Inputs de base
  allInputs.forEach((inp) => {
    inp.addEventListener("input", MAJCOLORS);
  });

  function MAJCOLORS(e) {
    let indexEnCours = e.target.getAttribute("data-index");
    e.target.value = e.target.value.toUpperCase();
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    e.target.style.background = valCouleurs[indexEnCours - 1];
  }
}

// Couleur aleatoires

btnRandom.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".inp-couleur");

  for (let index = 0; index < valCouleurs.length; index++) {
    valCouleurs[index] = `#${Math.floor(Math.random() * 1667215).toString(
      16
    )};`;
    inputs[index].value = valCouleurs[index].toUpperCase();
    inputs[index].style.background = valCouleurs[index].toUpperCase();
    fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
    fond.style.background = `linear-gradient(${inclinaison}deg,${valCouleurs}`;
  }
});
