import { Recipes } from '/imports/api/recipes/recipes.js';
import { Meteor } from 'meteor/meteor';

import './view.html'

var id;
Template.App_view.onCreated(function() {
  Meteor.subscribe("recipes.user");
  
  id = FlowRouter.current().params.id;
  console.log("set id");


});

Template.App_view.helpers({
  currentRecipe() {
    console.log("ran helper");
    return Recipes.findOne(id);
  }
})

Template.difficulty.events({
    'click .selector_buttons': function(e){
      console.log(e);
      difficultyInput = e.currentTarget.outerText;
      $(".difficulty_and_servings .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "#DEDEDE");
    }
});

Template.mealOfDay.events({
    'click .selector_buttons': function(e){
      console.log(e);
      mealInput = e.currentTarget.outerText;
      $(".meal .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "#DEDEDE");
    }
});