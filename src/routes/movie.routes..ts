import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import MovieController from '../controllers/movie.controller.js';

let movieRouter = Router();

movieRouter.get("/search/:query", MovieController.searchMovie);
movieRouter.get("/discover", MovieController.discoverMovies);
movieRouter.get("/data/:movieId", MovieController.getMovie);

export default movieRouter;
