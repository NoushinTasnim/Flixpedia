import express from 'express';
import { getCasts, getContentCategory, getContentDetails, getContentKeywords, getContentPosters, getContentReviews, getContentTrailers, getContentWatchProviders, getSimilarContents, getTopContents, getTrendingContent } from '../controller/content.controller.js';

const router = express.Router();

router.get('/trending', getTrendingContent('movie'));
router.get('/top', getTopContents('movie'));
router.get('/:category', getContentCategory('movie'));
router.get('/:id/trailers', getContentTrailers('movie'));
router.get('/:id/details', getContentDetails('movie'));
router.get('/:id/keywords', getContentKeywords('movie'));
router.get('/:id/reviews', getContentReviews('movie'));
router.get('/:id/similar', getSimilarContents('movie'));
router.get('/:id/cast', getCasts('movie'));
router.get('/:id/watch/providers', getContentWatchProviders('movie'));
router.get('/:id/posters', getContentPosters('movie'));

export default router;