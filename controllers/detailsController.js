const films = require("../public/json/films.json");

const view = {

  get(req, res) {

    const url = req.params.id;

    const film = films.find((film) => url === film["id"].toString());

    res.render("details.ejs", {
      film
    });

  }

}

module.exports = view;