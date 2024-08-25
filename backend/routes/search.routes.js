import express from 'express';
import { deleteSearchedContent, getSearchedMovie, getSearchedPerson, getSearchedTVShow, getSearchHistory } from '../controller/search.controller.js';

const router = express.Router();

router.get('/movie/:query', getSearchedMovie);
router.get('/tv/:query', getSearchedTVShow);
router.get('/person/:query', getSearchedPerson);
router.get('/history', getSearchHistory);
router.delete('/history/:id', deleteSearchedContent);

export default router;