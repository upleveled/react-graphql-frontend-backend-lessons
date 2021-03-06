const { getRecipes } = require('../models/Recipe');
// const { getIngredient, getIngredients } = require("../models/Ingredient");
const sleep = require('../utils/sleep');
const { recipeDb } = require('../models/db');

module.exports = {
  // Recipe: {
  //   name: (actualR) =>
  // },
  Query: {
    recipes: (parent, parameters) => {
      return getRecipes({ vegetarian: parameters.vegetarian });
    },
  },
  Mutation: {
    addRecipe: async (parent, { title, vegetarian }) => {
      // recipe === {title: "Gemischter Salat", vegetarian: true}

      await sleep(1500);
      const recipeSavedInDatabase = await recipeDb.insert({
        title: title,
        vegetarian: vegetarian,
        createdAt: new Date().toISOString(),
      });

      return { ...recipeSavedInDatabase, id: recipeSavedInDatabase._id };
    },
  },
};
