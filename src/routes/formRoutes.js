import express from 'express';
import { form } from '../controllers/formController.js';


const formRouter = express.Router();


formRouter.post('/submitForm', form);


export default formRouter;