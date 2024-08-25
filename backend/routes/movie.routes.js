import express from 'express';
import { getContentCategory, getContentDetails, getContentKeywords, getContentReviews, getContentTrailers, getContentWatchProviders, getSimilarContents, getTopContents, getTrendingContent } from '../controller/content.controller.js';

const router = express.Router();

router.get('/trending', getTrendingContent('movie'));
router.get('/top', getTopContents('movie'));
router.get('/:category', getContentCategory('movie'));
router.get('/:id/trailers', getContentTrailers('movie'));
router.get('/:id/details', getContentDetails('movie'));
router.get('/:id/keywords', getContentKeywords('movie'));
router.get('/:id/reviews', getContentReviews('movie'));
router.get('/:id/similar', getSimilarContents('movie'));
router.get('/:id/watch/providers', getContentWatchProviders('movie'));

export default router;