import express from 'express';
import { Router } from 'express';
import { getApartment } from '../controllers/apartmentController.js';


const apartmentRouter = Router();

apartmentRouter.get('/', getApartment);


export default apartmentRouter;