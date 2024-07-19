const express = require("express");
const {
  createGst,
  updateGst,
  getGsts,
  getLatestGst
} = require("./gst.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const gstRoutes = express.Router();

gstRoutes.post(
  "/",
  //   authorize("create-gst"),
  createGst
)
  .get(
    "/",
    // authorize("read-gst"),
    getLatestGst
  );
gstRoutes.put(
  "/:id",
  //   authorize("update-gst"),
  updateGst
);
gstRoutes.get(
  "/:status",
  //   authorize("read-gsts"),
  getGsts
);
module.exports = gstRoutes;
