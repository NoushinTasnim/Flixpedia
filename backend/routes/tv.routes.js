import express from 'express';
import { getContentCategory, getContentDetails, getContentKeywords, getContentReviews, getContentTrailers, getContentWatchProviders, getSimilarContents, getTopContents, getTrendingContent } from '../controller/content.controller.js';

const router = express.Router();

router.get('/trending', getTrendingContent('tv'));
router.get('/top', getTopContents('tv'));
router.get('/:category', getContentCategory('tv'));
router.get('/:id/trailers', getContentTrailers('tv'));
router.get('/:id/details', getContentDetails('tv'));
router.get('/:id/keywords', getContentKeywords('tv'));
router.get('/:id/reviews', getContentReviews('tv'));
router.get('/:id/similar', getSimilarContents('tv'));
router.get('/:id/watch/providers', getContentWatchProviders('tv'));

export default router;