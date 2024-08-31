import express from 'express';
import { deleteSavedMovie, deleteSavedSeries, getSavedMovies, getSavedSeries, saveMovie, saveSeries } from '../controller/save.controller.js';

const router = express.Router();

router.post('/movie', saveMovie);
router.post('/tv', saveSeries);

router.get('/movie', getSavedMovies);
router.get('/tv', getSavedSeries);

router.delete('/movie/:id', deleteSavedMovie);
router.delete('/tv/:id', deleteSavedSeries);

export default router;