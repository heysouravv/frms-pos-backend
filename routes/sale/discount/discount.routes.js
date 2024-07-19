const express = require("express");
const {
  createDiscount,
  updateDiscount,
  getDiscounts,
  getLatestDiscount
} = require("./discount.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const discountRoutes = express.Router();

discountRoutes.post(
  "/",
  //   authorize("create-discount"),
  createDiscount
)
  .get(
    "/",
    //   authorize("read-discount"),
    getLatestDiscount
  );
discountRoutes.put(
  "/:id",
  //   authorize("update-discount"),
  updateDiscount
);
discountRoutes.get(
  "/:status",
  //   authorize("read-discounts"),
  getDiscounts
);
module.exports = discountRoutes;
