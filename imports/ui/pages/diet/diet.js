import './diet.html';

import { Diets } from '/imports/api/diets/diets.js';

var modifications = [];

Template.restrictions.helpers({
  restrictions(){
    return restrictions;
  },
  diets(){
    return Diets.find({});
  }
})

Template.App_diet.onCreated(function() {
  Meteor.subscribe("diets.all");
})
