import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';

import './view.html'

var id;
Template.App_view.onCreated(function() {
  Meteor.subscribe("recipes.user");
  
  id = FlowRouter.current().params.id;
  console.log("set id");


});

console.log("why why why");
Template.App_view.helpers({
  currentRecipe() {
    console.log("ran helper");
    return Recipes.findOne(id);
  }
})
