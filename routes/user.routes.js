import express from 'express'
import RecipeModel from '../model/recipe.model.js'
import UserModel from '../model/user.model.js'

const userRoute = express.Router()

userRoute.get('/all', async (req, res) => {
    try {
        const allUsers = await UserModel.find({}).populate('recipes')
        return res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

userRoute.post('/create', async (req, res) => {
    try {
        const form = req.body;
        const newUser = await UserModel.create(form)
        return res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

userRoute.get('/read/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserModel.findById(userId).populate('recipes')
        if (!user) {
            return res.status(400).json({ msg: " Usuário não encontrado!" });
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

userRoute.put('/update/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const updatedUser = await RecipeModel.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true, runValidators: true }
        )
        return res.status(201).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

userRoute.delete('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params
        const deleteById = await UserModel.findByIdAndDelete(userId)
        if (!deleteById) {
            return res.status(400).json({ msg: "Usuário não encontrado" });
        }
        await RecipeModel.findByIdAndUpdate(
            deleteById.recipes,
            {
                $pull: {
                    creator: id,
                }
            },
            { new: true, runValidators: true }
        )
       // await Recipe.deleteMany({ creator: id })
        return res.status(204)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

export default userRoute
