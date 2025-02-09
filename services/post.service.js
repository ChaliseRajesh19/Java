import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to create a new post
const createPost = async ({content,likesCount}) => {
    try {

        const newPost = await prisma.posts.create({
            data: {
                likesCount,
                content
            }
        });
        return { success: true, post: newPost };
    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, error: error.message };
    }
};

const getPost = async () => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Fetch posts in descending order of creation
        return { success: true, data: posts };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { success: false, message: 'Error fetching posts' };
    }
};

export {createPost,getPost};

