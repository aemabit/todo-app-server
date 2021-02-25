import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../middlewares/verifyToken";
import { signup, signin, user } from "../controllers/auth.controller";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/current", TokenValidation, user);

export default router;
