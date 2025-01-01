import express from "express";
import * as bookController from "../controller/books.controller.js";

const router = express.Router();

router.get('/get/:id', bookController.getBooksById);
router.post('/add', bookController.createBook);
router.put('/update/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);
router.get('/fiction', bookController.getFiction);
router.get('/nonfiction', bookController.getNonFiction);
router.get('/get', bookController.getBooks);
router.get('/rented-count', bookController.getBookRentalCount);
router.get('/top-rented', bookController.getTopRentedBooks);
router.get('/currently-rented', bookController.getCurrentlyRentedBooks);

export default router;