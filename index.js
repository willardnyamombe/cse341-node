const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const corsOptions = {
  origin: "https://cellullar-store.herokuapp.com/",
  optionsSuccessStatus: 200
};
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://willardnyamombe:Nthando-36@cse341cluster-3dwlw.mongodb.net/shop?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f5d8b59c603a9462389ee7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//const cors = require('cors') // Place this with other requires (like 'path' and 'express')


app.use(cors(corsOptions));

const options = {
    family: 4
};


mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Will',
          email: 'will@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });


// mongoose
//   .connect(
//     'mongodb+srv://willardnyamombe:Nthando-36@cluster0.rmdzj.mongodb.net/shop?retryWrites=true&w=majority'
//   )
//   .then(result => {
//     User.findOne().then(user => {
//       if (!user) {
//         const user = new User({
//           name: 'Will',
//           email: 'will@test.com',
//           cart: {
//             items: []
//           }
//         });
//         user.save();
//       }
//     });
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
