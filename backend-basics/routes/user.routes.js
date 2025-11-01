import {Router} from 'express';
import { getUsers, getUserById } from '../controllers/user.conroller.js';
import authorize from '../middleware/auth.middleware.js';

const userRouter = Router();

// 🟢 GET: Retrieve all users
userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUserById);

// 🟡 POST: Add a new user
userRouter.post('/', async (req, res) => {
    const { name, email } = req.body
    const user = await User.create({ name, email })
    res.status(201).json(user)
});

// 🔵 PUT: Update a user (entire object)
userRouter.put('/:id', async (req, res) => {
    const user = await users.find(u => u.id == req.params.id);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        const updatedUser = await user.save()
        res.json(updatedUser)
      } else {
        res.status(404).json({ message: 'User not found' })
      }
});

// 🟠 PATCH: Partially update a user
userRouter.patch('/:id', async (req, res) => {
    const user = await users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (req.body.name) user.name = req.body.name; 
    res.json(user);
});

// 🔴 DELETE: Remove a user
userRouter.delete('/:id', async (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
      } else {
        res.status(404).json({ message: 'User not found' })
      }
});

export default userRouter;