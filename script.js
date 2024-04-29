const catBreed = document.getElementById("catBreed");
const find = document.getElementById("find");
const main = document.getElementById("main-detail");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.thecatapi.com/v1/breeds")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let output = "";
      data.forEach((cat) => {
        output = output + `${cat.name}!`;
      });
      // console.log(output);
      let catArray = output.split("!").sort();
      catArray.shift();
      // console.log(catArray);
      let catOutput = "";
      catArray.forEach((ele) => {
        catOutput += `<option>${ele}</option>`;
      });
      const catSelect = `<option id="catSelect" selected>--Select cat--</option>`;
      catBreed.innerHTML = catSelect + catOutput;
    })
    .catch((err) => {
      console.log(err);
    });
});

find.addEventListener("click", () => {
  const catBreedName = catBreed.value;
  // console.log(catBreedName);
  const res = fetch(`https://api.thecatapi.com/v1/breeds`);
  res
    .then((data) => data.json())
    .then((result) => {
      // getProfile(result);
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (catBreedName === result[i].name) {
          const pic = result[i].id;
          fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${pic}`)
            .then((data1) => data1.json())
            .then((catPicUrl) => {
              const catURL = catPicUrl[0].url;
              // console.log(catURL);
              const image = document.getElementById("catImg");
              image.innerHTML = `<img src="${catURL}" alt="" />`;
            });

          const catName = result[i].name;
          const catOrigin = result[i].origin;
          const catDescription = result[i].description;
          const catTemperament = result[i].temperament;
          const catAdaptability = result[i].adaptability;
          const catChildFriendly = result[i].child_friendly;
          const catGrooming = result[i].grooming;
          const catIntelligence = result[i].intelligence;
          const catSheddingLevel = result[i].shedding_level;
          const catWiki = result[i].wikipedia_url;

          getProfile(
            catName,
            catOrigin,
            catDescription,
            catTemperament,
            catAdaptability,
            catChildFriendly,
            catGrooming,
            catIntelligence,
            catSheddingLevel,
            catWiki
          );
        }
      }
    });
});

function getProfile(
  catName,
  catOrigin,
  catDescription,
  catTemperament,
  catAdaptability,
  catChildFriendly,
  catGrooming,
  catIntelligence,
  catSheddingLevel,
  catWiki
) {
  let progessCAL = function (number) {
    if (number === 1) {
      return 20;
    } else if (number === 2) {
      return 40;
    } else if (number === 3) {
      return 60;
    } else if (number === 4) {
      return 80;
    } else if (number === 5) {
      return 100;
    }
  };
  const adaptability = progessCAL(catAdaptability);
  const childfriendly = progessCAL(catChildFriendly);
  const grooming = progessCAL(catGrooming);
  const intelligence = progessCAL(catIntelligence);
  const sheddinglevel = progessCAL(catSheddingLevel);
  // console.log(adaptability);
  // console.log(childfriendly);
  // console.log(grooming);
  // console.log(intelligence);
  // console.log(sheddinglevel);

  main.innerHTML = `<div class="details-box d-flex flex-column align-items-center">
  <div id="catImg" class="img-box mt-5">
    <img src="" alt="" />
  </div>
  <h1 class="cat-name mt-3">${catName}</h1>
  <p class="origin"><b>origin :</b> ${catOrigin}</p>
  <p class="Description">
  ${catDescription}
  </p>
  <div class="cat-info d-flex flex-column align-items-start">
    <p class="temperament">
      <b>Temperament :</b> ${catTemperament}
    </p>
  </div>
  <div class="stats mt-3">
    <p class="m-0"><b>Adaptability</b></p>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: ${adaptability}%"
        aria-valuenow="17"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <div class="stats mt-3">
    <p class="m-0"><b>Child Friendly</b></p>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: ${childfriendly}%"
        aria-valuenow="17"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <div class="stats mt-3">
    <p class="m-0"><b>grooming</b></p>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        style="width:${grooming}%"
        aria-valuenow="17"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <div class="stats mt-3">
    <p class="m-0"><b>intelligence</b></p>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: ${intelligence}%"
        aria-valuenow="17"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <div class="stats mt-3">
    <p class="m-0"><b>shedding level</b></p>
    <div class="progress mt-2">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: ${sheddinglevel}%"
        aria-valuenow="17"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
  <button class="wp-btn mt-4">
    <a
      href="${catWiki}"
      target="_blank"
      ><b>wikipedia</b></a
    >
  </button>
</div>`;
}
