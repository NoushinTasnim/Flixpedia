import express from 'express';
import { getCastDetails, getCastMovies, getCastSeries } from '../controller/cast.controller.js';

const router = express.Router();

router.get('/:id', getCastDetails());
router.get('/:id/movies', getCastMovies());
router.get('/:id/series', getCastSeries());

export default router;