const User = require("../models/customerSchema");
const UserAuth = require("../models/userauth");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const user_index_get = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index.ejs", {
        mytitle: "home page",
        user: result,
        time: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  User.find({
    $or: [
      { FirstName: req.body.searchText },
      { LastName: req.body.searchText },
      { gender: req.body.searchText },
    ],
  })
    .then((result) => {
      res.render("user/search", {
        mytitle: "Search",
        user: result,
        time: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view.ejs", {
        oneUser: result,
        time: moment,
        title: "view customer",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add.ejs", { country: country_list });
};

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit.ejs", {
        oneUser: result,
        country: country_list,
        title: "edit user",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.redirect("/home");
  });
};

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body).then(() => {
    res.redirect("/home");
  });
};

const user_welcome_get = (req, res) => {
  res.render("welcome", { mytitle: "Welcome", currentPage: "welcome" });
};

const user_signup_get = (req, res) => {
  res.render("signup", { mytitle: "Sign up", currentPage: "signup" });
};

const user_signup_post = async (req, res) => {
  try {
    const objError = validationResult(req);
    console.log(objError.errors);

    if (objError.errors.length > 0) {
      return res.json({ validatorInput: objError.errors });
    }
    const isCurrentEmail = await UserAuth.findOne({ email: req.body.email });
    if (isCurrentEmail) {
      return res.json({ currentEmail: "Email already exist" });
    }
    const result = await UserAuth.create(req.body);
    var token = jwt.sign({ id: result._id }, process.env.user_secret);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: result._id });
  } catch (error) {
    console.log(error);
  }
};

const user_login_get = (req, res) => {
  res.render("login", { mytitle: "Log in", currentPage: "login" });
};

const user_login_post = async (req, res) => {
  const objError = validationResult(req);
  if (objError.errors.length > 0) {
    return res.json({ validatorInput: objError.errors });
  }
  const result = await UserAuth.findOne({ email: req.body.email });
  if (result == null) {
    res.json({ currentEmail: "wrong email" });
  } else {
    const match = await bcrypt.compare(req.body.password, result.password);
    if (match) {
      console.log("email and password are true");
      var token = jwt.sign({ id: result._id }, process.env.user_secret);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.json({ id: result._id });
    } else {
      res.json({ currentPassword: "wrong password" });
    }
  }
};

module.exports = {
  user_index_get,
  user_search_post,
  user_view_get,
  user_add_get,
  user_post,
  user_edit_get,
  user_delete,
  user_put,
  user_welcome_get,
  user_signup_get,
  user_signup_post,
  user_login_get,
  user_login_post
};
