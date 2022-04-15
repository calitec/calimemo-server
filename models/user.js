module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  User.associate = (db) => {
    db.User.hasMany(db.Date);
  };
  return User;
};
