var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;

/* GET all games */
router.get("/", function(req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});
// lists all games
// returns 200 code and game object on success
// returns 400 code and error object on failure
router.get("/:id", function (req, res, next) {
Game.findAll({
    where: {
    id: req.params.id
  }
})
  .then(game => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(game));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({error})
  });
});


// updates the specific information of a game with an id appended in the uri
router.put("/:id", function (req, res, next){
    Game.update(
      {
        title: req.body.title,
        price: req.body.price,
        releaseYear: req.body.releaseYear,
        active: req.body.active
      },
      {
        returning: true,
        where: {
          id: parseInt(req.params.id)
        }
      }
    )
      .then(([rowsUpdate, [updatedGame]]) => {
        res.setHeader("Content-Type", "application/json");
        res.status(202).send(JSON.stringify(updatedGame));
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).send({ error });
      })
});
// take a second look at this promise ^
router.delete("/:id", function(req, res, next) {
  Game.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(204);
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

router.post("/", function(req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router; //this should stay at the bottom of the file
