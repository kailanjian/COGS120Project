// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Recipes } from '../recipes.js';

Meteor.publish('recipes.all', function () {
  return Recipes.find();
});

Meteor.publish('recipes.user', function () {
  return Recipes.find({owner: Meteor.userId()});
});
