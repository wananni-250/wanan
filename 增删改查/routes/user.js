var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const user = require("../sql/users");
/* GET home page. */
router.get("/", function (req, res, next) {
  // 先请求数据库数据，将数据渲染到页面模板
  user.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.render("u3", {
      index: 2,
      data: data
    })
  })
});
//添加商品  
router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

//点击提交按钮 数据进行页面的渲染
router.post("/addAction", function (req, res, next) {
  let obj = req.body;
  obj.price = Number(obj.price);
  obj.discount = obj.discount - 0;
  obj.score = obj.score * 1;
  console.log(obj);
  user.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })

});

//删除商品
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log(req.query)

  user.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })
})

//搜索商品
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;

  let reg = new RegExp(obj.search);
  user.find({ username: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("u3", {
      index: 2,
      data,
    });
  })
});

//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id
  console.log(req.query)
  const _id = req.query._id;
  console.log("_id", _id);

  user.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('updata', {
      index: 2,
      data: data
    })
  })


});

router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  obj.price = Number(obj.price);
  obj.stock = parseFloat(obj.stock);
  obj.discount = obj.discount - 0;
  obj.sales = obj.sales - 0;
  obj.score = obj.score * 1;
  console.log('obj_id', obj)
  user.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");

  })
});

module.exports = router;