import { Recipes } from '/imports/api/recipes/recipes.js';
import { Images } from '/imports/api/images/images.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';

import './view.html'

var id = new ReactiveVar("");
Template.App_view.onCreated(function() {
  Meteor.subscribe("recipes.user");
  Meteor.subscribe("images.all");
  
  id.set(FlowRouter.current().params.id);
  console.log("set id to " + id.get);
});
Template.App_view.helpers({
  currentRecipe() {
    console.log("ran helper: " + id.get());
    return Recipes.findOne(id.get());
  }
})

Template.difficulty.events({
    'click .selector_buttons': function(e){
      console.log(e);
      difficultyInput = e.currentTarget.outerText;
      $(".difficulty_and_servings .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "@primary");
    }
});

Template.mealOfDay.events({
    'click .selector_buttons': function(e){
      console.log(e);
      mealInput = e.currentTarget.outerText;
      $(".meal .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "@primary");
    }
});