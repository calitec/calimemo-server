const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");
const passport = require("passport");
const passportConfig = require("./passport");
const cookieParser = require("cookie-parser");

const userAPIRouter = require("./api/user");
const dateAPIRouter = require("./api/date");
const placeAPIRouter = require("./api/place");

dotenv.config();
const db = require("./models");
const app = express();

db.sequelize.sync().then(async () => {
  await db.User.create({
    username: "test123",
    password: "test123",
  });
});
passportConfig();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    cors({
      origin: "https://calimemo.herokuapp.com",
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

app.enable("trust proxy");
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // domain: process.env.NODE_ENV === "production" && ".herokuapp.com",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", userAPIRouter);
app.use("/date", dateAPIRouter);
app.use("/place", placeAPIRouter);
app.listen(PORT, () => console.log(`server is running localhost:${PORT}`));
