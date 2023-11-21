import express from 'express';
import { Router } from 'express';
import { getReview }  from '../controllers/reviewController.js';



const reviewRouter = Router();

reviewRouter.get('/', getReview);


export default reviewRouter;