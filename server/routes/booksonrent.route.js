import express from "express";
import * as booksonrentController from "../controller/booksonrent.controller.js";

const router = express.Router();

router.get('/get/:id', booksonrentController.getByUserId);
router.post('/rent', booksonrentController.rentBook);
router.put('/return/:id', booksonrentController.returnBook);
router.put('/rate', booksonrentController.rateBook);

export default router;