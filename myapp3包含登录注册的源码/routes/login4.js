var express = require("express");
var router = express.Router();
const user = require("../sql/user");
// var user =


router.get("/", function (req, res, next) {
  res.render("login")
})


router.post("/in", function (req, res, next) {
  user.findOne(req.body, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data) {
      // req.session.islogin = 'ok';
      res.cookie('islogin', 'ok');
      res.redirect("/pro");
    } else {
      res.redirect("/register1");
    }

  })
});



module.exports = router;