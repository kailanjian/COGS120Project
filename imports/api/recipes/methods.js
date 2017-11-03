// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recipes } from './recipes.js';

Meteor.methods({
  'recipes.insert'(name, time, difficulty, meal, owner) {
    check(name, String);
    check(time, String);
    check(difficulty, String);
    check(meal, String);
    check(owner, String);

    return Recipes.insert({
      name: name,
      time: ime,
      difficulty: difficulty,
      meal: meal,
      owner: owner,
    });
  },
  'recipes.delete'(_id) {
    return Recipes.remove(_id);
  },
});
