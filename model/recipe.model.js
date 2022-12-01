import { Schema, model } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
    ingredients: { type: [String] },
    cuisine: { type: String, required: true },
    dishtype: { type: String, venum: ["_breakfast_", "_main_course_", "_soup_", "_snack_", "_drink_", "_dessert_", "_other_"] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg" },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: Date.now },
  },
  {
    timestamps: true
  })

const RecipeModel = model('Recipe', recipeSchema);

export default RecipeModel;