// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Diets } from '../diets.js';

Meteor.publish('diets.all', function () {
  return Diets.find();
});

Meteor.publish('diets.user', function () {
  return Diets.find({owner: Meteor.userId()});
});
