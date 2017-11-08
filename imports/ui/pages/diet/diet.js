import './diet.html';

import { Diets } from '/imports/api/diets/diets.js';

import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';

var modifications = [];

Template.restrictions.helpers({
  restrictions(){
    return restrictions;
  },
  diets(){
    return Diets.find({});
  },
})

Template.App_diet.onCreated(function() {
  Meteor.subscribe("diets.all");
})

Template.App_diet.helpers({
  dietoptions() {
    return DietOptions;
  }
})

Template.App_diet.events({
  "select .searchInput"(event) {
    console.log('selected: ')
    console.log(event);
  }
})
