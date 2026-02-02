import express , {Request , Response}from 'express';
import { getAllUsers,  createUser } from './users.service';


const router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router;



