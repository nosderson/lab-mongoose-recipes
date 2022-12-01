import express from 'express'
import RecipeModel from '../model/recipe.model.js'

const recipeRoute = express.Router()

recipeRoute.post('/new', async (req, res) => {
    try {
        const form = req.body;
        const newRecipe = await RecipeModel.create(form)
        return res.status(201).json(newRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

recipeRoute.post('/insert-many', async (req, res) => {
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

recipeRoute.get('/all', async (req, res) => {
    try {
        const allRecipes = await RecipeModel.find({})
        return res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

recipeRoute.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedRecipe = await RecipeModel.findByIdAndDelete(id)
        if (!deletedRecipe) {
            return res.status(400).json({ msg: "Receita não encontrada!" });
          }
          const allRecipes = await RecipeModel.find({})
          return res.status(200).json(allRecipes)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})

recipeRoute.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        )
        return res.status(201).json(updatedRecipe)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.errors)
    }
})


export default recipeRoute

