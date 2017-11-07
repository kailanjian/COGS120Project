// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from './recipes.js';

Meteor.methods({
  'recipes.insert'(
      name, time, difficulty, 
      meal, servings, ingredients, 
      instructions, keywords, foodImg, recipeImg, owner) {

    return Recipes.insert({
      name: name,
      time: time,
      difficulty: difficulty,
      meal: meal,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions,
      keywords: keywords,
      foodImg: foodImg,
      recipeImg: recipeImg,
      owner: owner,
    });
  },
  'recipes.update'(id, name, time, difficulty,
      meal, servings, ingredients,
      instructions, keywords, foodImg, recipeImg, owner) {
      console.log("updating recipe on server");
      return Recipes.update(id, { $set: {
        name: name,
        time: time,
        difficulty: difficulty,
        meal: meal,
        servings: servings,
        ingredients: ingredients,
        instructions: instructions,
        keywords: keywords,
        foodImg: foodImg,
        recipeImg: recipeImg,
        owner: owner }
      } )
  },
  'recipes.delete'(_id) {
    return Recipes.remove(_id);
  },
});
