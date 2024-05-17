const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./catogory");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoryRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
