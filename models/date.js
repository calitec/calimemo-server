module.exports = (sequelize, DataTypes) => {
  const Date = sequelize.define(
    "Date",
    {
      selectedDate: {
        type: DataTypes.STRING,
      },
      emotion: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  return Date;
};
