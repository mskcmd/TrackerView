import express, { Router } from "express";
import { uploadFile,getModuleOne, fechHeding, getModuleTwo, getModuleThree } from "../controllers/userController";
import uploadSingleVideo from "../middleware/multer";

const userRoute: Router = express.Router()


userRoute.post('/upload', uploadSingleVideo, uploadFile);
userRoute.get("/moduleone",getModuleOne)
userRoute.get("/moduletwo",getModuleTwo)
userRoute.get("/modulethree",getModuleThree)
userRoute.get('/fechHeding', fechHeding);





export default userRoute