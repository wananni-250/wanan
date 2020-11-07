var express = require("express");
var router = express.Router();
const user = require("../sql/user");

router.get("/", function (req, res, next) {
  res.render("register");
});


router.post("/in", function (req, res, next) {
  console.log("进入register1   /in里面了");
  console.log(req.body);
  user.findOne(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.redirect("/register1");
    } else {
      user.insertMany(req.body, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/login4");
      })
    }
  })


});

module.exports = router;
