import { Router } from 'express';
import loginRoutes from './login.routes.js';
import postRoutes from './post.route.js';


const router = Router();

router.use('/auth', loginRoutes);
router.use("/post",postRoutes);

export default router;