const movies = {

  articles: document.querySelectorAll(".slider__movies article"),
  images: [],
  index: 0,

  verifNumberCards() {

    document.querySelector(".slider__movies").style.display = "flex";

    switch (movies.images.length) {
      case 1:
        movies.articles[0].style.display = "none";
        movies.articles[2].style.display = "none";
        movies.articles[1].classList.add("slide-2");
        movies.articles[1].querySelector("img").classList.add("redirect");
        movies.articles[1].querySelector("img").setAttribute("src", `${movies.images[0]["image_src"]}`);
        movies.articles[1].querySelector("img").id = movies.images[0]["id"];
        break;
      case 2:
        movies.articles[1].style.display = "none";

        movies.articles[0].classList.add("slide-1");
        movies.articles[2].classList.add("slide-3");

        movies.articles[0].querySelector("img").setAttribute("src", `${movies.images[0]["image_src"]}`);
        movies.articles[0].querySelector("img").id = movies.images[0]["id"];
        movies.articles[0].querySelector("img").classList.add("redirect");

        movies.articles[2].querySelector("img").setAttribute("src", `${movies.images[1]["image_src"]}`);
        movies.articles[2].querySelector("img").id = movies.images[1]["id"];
        movies.articles[2].querySelector("img").classList.add("redirect");
        break;
      default:
        document.querySelector(".slider__movies").style.display = "none";
        break;
    }

  },

  indexAnalysis(i) {

    if (i < 0) {
      return (movies.images.length - 1);
    } else if (i > (movies.images.length - 1)) {
      return 0;
    }
    return i;

  },

  displayCards() {

    if (movies.images.length < 3) {
      movies.verifNumberCards();
    } else {
      document.querySelector(".btn-left").style.display = "block";
      document.querySelector(".btn-right").style.display = "block";

      if (movies.index === -1) {
        movies.index = movies.images.length - 1;
      } else if (movies.index === movies.images.length) {
        movies.index = 0;
      }

      movies.articles.forEach((article, i) => {

        if (i === 0) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").setAttribute("src", `${movies.images[movies.indexAnalysis(movies.index - 1)]["image_src"]}`);
          article.querySelector("img").id = movies.images[movies.indexAnalysis(movies.index - 1)]["id"];
        } else if (i === 1) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").classList.add("redirect");
          article.querySelector("img").setAttribute("src", `${movies.images[movies.index]["image_src"]}`);
          article.querySelector("img").id = movies.images[movies.index]["id"];
        } else if (i === 2) {
          article.classList.add(`slide-${i + 1}`);
          article.querySelector("img").setAttribute("src", `${movies.images[movies.indexAnalysis(movies.index + 1)]["image_src"]}`);
          article.querySelector("img").id = movies.images[movies.indexAnalysis(movies.index + 1)]["id"];
        }

      });
    }

  },

  switchRight() {
    movies.index++;
    movies.displayCards();
  },

  switchLeft() {
    movies.index--;
    movies.displayCards();
  },

  init() {

    // Utilisation de la méthode fetch pour récupérer les données JSON
    fetch('/json/films.json')
    .then(response => response.json())
    .then(data => {
      data.forEach((elem, i) => {
        movies.images.push(elem);
      });
      console.log(movies.images);

      movies.displayCards();
    })
    .catch(error => {
      console.error('Erreur:', error);
    });

    const arrowLeft = document.querySelector(".btn-left");
    const arrowRight = document.querySelector(".btn-right");

    arrowLeft.addEventListener("click", () => {
      movies.switchLeft();
    })

    arrowRight.addEventListener("click", () => {
      movies.switchRight();
    })

    movies.articles.forEach((article) => {
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

  movies.init();

});

// export { movies };