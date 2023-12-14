import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import MediaController from '../controllers/media.controller.ts.js';

let MediaRouter = Router();

MediaRouter.get("/search/:query", MediaController.searchMedia);
MediaRouter.get("/discover", MediaController.discoverMedias);
MediaRouter.get("/data/:MediaId", MediaController.getMedia);

export default MediaRouter;
