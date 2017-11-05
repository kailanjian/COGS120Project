// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from './recipes.js';

Meteor.methods({
  'recipes.insert'(
      name, time, difficulty, 
      meal, servings, ingredients, 
      instructions, keywords, owner) {

    return Recipes.insert({
      name: name,
      time: time,
      difficulty: difficulty,
      meal: meal,
      servings: servings,
      ingredients: ingredients,
      instructions: instructions,
      keywords: keywords,
      owner: owner,
    });
  },
  'recipes.delete'(_id) {
    return Recipes.remove(_id);
  },
});
