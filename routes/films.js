var express = require("express");
var router = express.Router();
//1.Імпортували модуль
const mongoose = require("mongoose");

//2. Встановлюємо з"єднання
mongoose.connect("mongodb://localhost:27017/criticSitedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//3. Свторюємо схему
const Schema = mongoose.Schema;
// Створення схеми моделі
const filmScheme = new Schema({
  title: String,
  category: String,
  rating: String,
  year: Number,
  image: String,

});

//4. Створення моделі
const Film = mongoose.model("Film", filmScheme);

/* GET films listing. */
router.get("/", function (req, res, next) {
  //Вибірка усіх документів з бази
  Film.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.render("index", {
      title: "Express",
      page: "films-list",
      films: docs,
    });

    // res.status(200).json({films:docs });
  });
});

router.get("/list", function (req, res, next) {
  //Вибірка усіх документів з бази
  Film.find({}, function (err, docs) {
    // mongoose.disconnect();
    if (err) return res.status(500).json({ err: { msg: "Fetch faild!" } });

    res.status(200).json({ success: true, films: docs });
  });
});

router.post(
  "/add",
  function (req, res, next) {
    // var form = new formidable.IncomingForm();
    // form.uploadDir = req.uploaded_images_path;


      //5. Створення документа
      const film = new Film({
        title: req.body.title,
        category: req.body.category,
        rating: req.body.rating,
        year: req.body.year,
        image: req.body.image,

      });
      //6. Збереження документа
      film.save(function (err, film) {
        // mongoose.disconnect();  // від’єднання від бази даних
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Saving faild!" } });
        else res.status(201).json({ success: true, data: film });
      });
    }
);

router.post("/edit", function (req, res) {
    // Знаходимо і оновлюємо
    Film.findByIdAndUpdate({ _id: req.body.id },
      {
        title: req.body.title,
        category: req.body.category,
        rating: req.body.rating,
        year: req.body.year
      }, function (err, doc) {
        // mongoose.disconnect();
    
        if (err)
          return res
            .status(500)
            .json({ success: false, err: { msg: "Saving faild!" } });
        res.json({ success: true });
      });
});



router.delete("/delete", function (req, res, next) {
  console.log(req.query);
  console.log(req.body);
  //5. Видалення
  //Якщо дані передаємо через axios.delete(apiEndpoints.products.delete,{params:{id}})
  // Product.findOneAndDelete({_id:req.query.id}, function(err, doc){

  //axios.delete(apiEndpoints.products.delete,{data:{id}})
  Film.findOneAndDelete({ _id: req.body.id }, function (err, doc) {
    // mongoose.disconnect();

    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Saving faild!" } });
    res.json({ success: true });
  });
});

module.exports = router;
