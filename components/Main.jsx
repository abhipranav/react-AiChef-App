import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "../ai"


export default function Main() {
    const [ingredients, setIngredients] = React.useState(["potato","green chutney","refined flour","ajwain","mangrela","onion","curd","all indian spices"])
    const [recipe, setRecipe] = React.useState(false)

    async function getRecipe() {
        const recipeMd = await getRecipeFromMistral(ingredients)
        console.log(recipeMd)
        setRecipe(recipeMd)
    }
    
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && 
            <ClaudeRecipe 
                recipe = {recipe}
            />}
        </main>
    )
}

