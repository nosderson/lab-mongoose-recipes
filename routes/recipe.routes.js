import express from 'express'
import RecipeModel from '../model/recipe.model.js'
import UserModel from '../model/user.model.js'

const recipeRoute = express.Router()

recipeRoute.post('/create/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const newRecipe = await RecipeModel.create({ ...req.body, creator: userId })
        await UserModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    recipes: newRecipe._id
                }
            },
            { new: true, runValidators: true }
        )
        return res.status(201).json(newRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})
/*
recipeRoute.post('/create-many', async (req, res) => {
    try {
        const form = req.body;
        await RecipeModel.insertMany(form)
        const allRecipes = await RecipeModel.find({})
        return res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})
*/
recipeRoute.get('/all', async (req, res) => {
    try {
        const allRecipes = await RecipeModel.find({}).populate('users')
        return res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

recipeRoute.delete('/delete/:recipeId', async (req, res) => {
    try {
        const { recipeId } = req.params
        const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId)
        if (!deletedRecipe) {
            return res.status(400).json({ msg: "Receita não encontrada!" });
        }
        await UserModel.findByIdAndUpdate(
            deletedRecipe.creator,
            {
                $pull: {
                    recipes: id,
                }
            },
            { new: true, runValidators: true }
        )
        return res.status(204)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

recipeRoute.put('/update/:recipeId', async (req, res) => {
    try {
        const { recipeId } = req.params
        await RecipeModel.findByIdAndUpdate(
            recipeId,
            { ...req.body },
            { new: true, runValidators: true }
        )
        const recipe = await ProcessoModel.findById(id);
        return res.status(201).json(recipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

export default recipeRoute

