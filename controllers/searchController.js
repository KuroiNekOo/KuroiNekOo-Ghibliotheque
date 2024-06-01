const films = require("../public/json/films.json");

const view = {

  get(req, res) {

    const q = req.query.title;

    const words = q.replace(/\s\s+/g, ' ').trim().split(" ");

    const search = new Set();

    words.forEach((word) => {

      films.forEach((film) => {

        if (film["title"].toLowerCase().includes(word.toLowerCase())) {
          search.add(film["title"]);
        }

      });

    });

    res.render("search.ejs", {
      search
    });

  }

}

module.exports = view;