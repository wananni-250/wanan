var express = require("express");
var router = express.Router();
const user = require("../sql/users");
// var user =


router.get("/", function (req, res, next) {
  res.render("login")
})


router.post("/in", function (req, res, next) {
  let obj = req.body;
  obj.price = Number(obj.price);
  obj.discount = obj.discount - 0;
  obj.score = obj.score * 1;
  console.log(obj);
  user.insertMany(obj, (err, data) => {
    if (err) {
      res.redirect("/");
    }
    res.redirect("/pro");
  })
});



module.exports = router;