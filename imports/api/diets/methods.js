import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Diets } from './diets.js';

Meteor.methods({
  'diets.update'(id, importance) {
    return Diets.update(id, {
      $set: {importance: importance}
    });
  },

  'diets.insert'(
    name, importance, owner) {

      return Diets.insert({
        name: name,
        importance: importance,
        owner: owner,
      });
    },

    'diets.delete' (_id) {
      return Diets.remove(_id);
    },
  });
