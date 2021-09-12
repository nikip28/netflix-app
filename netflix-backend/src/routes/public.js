import express from "express";
import * as netflixController from "../controllers/netflix";

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.get("/categories", netflixController.getCategories);

router.get("/category", netflixController.getPaginatedData);

module.exports = router;
