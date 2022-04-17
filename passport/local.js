const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({
            where: { username },
          });
          if (!user) {
            return done(null, false, {
              reason: "존재하지 않는 아이디 입니다.",
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, {
            reason: "아이디 또는 비밀번호를 잘못 입력 하였습니다.",
          });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
