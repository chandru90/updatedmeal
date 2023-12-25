import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://chandru-mealserver.onrender.com/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="saverecipe">
      <h1>Saved Recipes</h1>
      <ul className="savedcss">
        {savedRecipes.map((recipe) => (
          <li className="inside" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            
            <div>
              <p>{recipe.instructions}</p>
            </div>
            
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
