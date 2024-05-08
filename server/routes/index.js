const userRouter = require("./user");

const initRoutes = (app) => {
  app.use("/api/users", userRouter);
};

module.exports = initRoutes;
