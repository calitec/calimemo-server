const db = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User, Date } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const guard = await db.User.findOne({
      where: { username },
    });
    if (guard) return res.status(403).send("이미 사용중인 아이디입니다.");
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  try {
    // local 인증과정 실행
    return passport.authenticate("local", (passportError, user, info) => {
      // 인증 실패 or 유저 데이터 가드
      if (passportError || !user) {
        res.status(401).json({ message: info.reason });
        return;
      }

      // 로그인 진행
      req.login(user, async (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }
        const userInfo = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: Date,
              attributes: ["id"],
            },
          ],
        });
        res.status(200).json(userInfo);
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
      });
      fullUserWithoutPassword.dataValues.isValid = true;
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

module.exports = router;
