import express from 'express';
import {createPost,getPost} from "../services/post.service.js"

const router= express.Router();

router.post('/', async (req, res) => {
    try {

        const result = await createPost(req.body)
        
        res.json(result);
    } catch (error) {
        console.log("Error at creating post ", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
});
router.get('/', async (req, res) => {
    const result = await getPost();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ message: result.message });
    }
});


export default router;

