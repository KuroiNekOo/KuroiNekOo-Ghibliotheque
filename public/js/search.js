// import * as moviesModule from "/js/movies.js"; 

const search = {

  articles: document.querySelectorAll(".slider__movies article"),
  images: [],
  index: 0,

  verifNumberCards() {

    document.querySelector(".slider__movies").style.display = "flex";

    switch (search.images.length) {
      case 1:
        search.articles[0].classList.add("slide-2");
        search.articles[0].querySelector("img").classList.add("redirect");
        search.articles[0].querySelector("img").setAttribute("src", `${search.images[0]["image_src"]}`);
        search.articles[0].querySelector("img").id = search.images[0]["id"];
        break;
      case 2:
        search.articles[0].classList.add("slide-1");
        search.articles[1].classList.add("slide-3");

        search.articles[0].querySelector("img").setAttribute("src", `${search.images[0]["image_src"]}`);
        search.articles[0].querySelector("img").id = search.images[0]["id"];
        search.articles[0].querySelector("img").classList.add("redirect");

        search.articles[1].querySelector("img").setAttribute("src", `${search.images[1]["image_src"]}`);
        search.articles[1].querySelector("img").id = search.images[1]["id"];
        search.articles[1].querySelector("img").classList.add("redirect");
        break;
      default:
        document.querySelector(".slider__movies").style.display = "none";
        break;
    }

  },

  indexAnalysis(i) {

    if (i < 0) {
      return (search.images.length - 1);
    } else if (i > (search.images.length - 1)) {
      return 0;
    }
    return i;

  },

  displayCards() {

    if (search.images.length < 3) {
      search.verifNumberCards();
    } else {
      document.querySelector(".btn-left").style.display = "block";
      document.querySelector(".btn-right").style.display = "block";

      if (search.index === -1) {
        search.index = search.images.length - 1;
      } else if (search.index === search.images.length) {
        search.index = 0;
      }

      search.articles.forEach((article, i) => {

        if (i === 0) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").setAttribute("src", `${search.images[search.indexAnalysis(search.index - 1)]["image_src"]}`);
          article.querySelector("img").id = search.images[search.indexAnalysis(search.index - 1)]["id"];
        } else if (i === 1) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").classList.add("redirect");
          article.querySelector("img").setAttribute("src", `${search.images[search.index]["image_src"]}`);
          article.querySelector("img").id = search.images[search.index]["id"];
        } else if (i === 2) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").setAttribute("src", `${search.images[search.indexAnalysis(search.index + 1)]["image_src"]}`);
          article.querySelector("img").id = search.images[search.indexAnalysis(search.index + 1)]["id"];
        }

      });
    }

  },

  switchRight() {
    search.index++;
    search.displayCards();
  },

  switchLeft() {
    search.index--;
    search.displayCards();
  },

  recreateArrayImages() {

    const newTable = [];

    search.articles.forEach((article) => {

      const linkImg = article.querySelector("img").getAttribute("src");

      search.images.forEach((image) => {

        if (image["image_src"] === linkImg) {
          newTable.push(image);
        }

      })

    });

    search.images = [...newTable];
    console.log(search.images);

  },

  init() {

    // Récupération des paramètres de l'url /search
    const params = new URLSearchParams(window.location.search);
    console.log("order = " + params.get("order"));

    // Utilisation de la méthode fetch pour récupérer les données JSON
    fetch('/json/films.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((elem, i) => {
        search.images.push(elem);
      });
      console.log(search.images);

      // if (params.get("order") !== "asc") {
      //   search.recreateArrayImages();
      //   search.displayCards();
      // } else {
      //   movies.init();
      // }
      search.recreateArrayImages();
      search.displayCards();
      
    })
    .catch(error => {
      console.error('Erreur:', error);
    });

    const arrowLeft = document.querySelector(".btn-left");
    const arrowRight = document.querySelector(".btn-right");

    arrowLeft.addEventListener("click", () => {
      search.switchLeft();
    })

    arrowRight.addEventListener("click", () => {
      search.switchRight();
    })

    search.articles.forEach((article) => {
      article.addEventListener("click", (e) => {
        const id = e.target.id;
        if (e.target.classList.value === "redirect") {
          window.location = `/films/${id}`;
        }
      });
    });

  }

}

document.addEventListener("DOMContentLoaded", () => {

  search.init();

});