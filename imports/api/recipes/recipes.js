// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Recipes = new Mongo.Collection('recipes');

// structure of a Recipes document
/*
{
  name: recipe name
  time: recipe time
  difficulty: recipe difficulty
  meal: breakfast, lunch, or dinner
  servings:
  ingredients:
  instructions:
  keywords:
  owner: userId of owner
}
*/