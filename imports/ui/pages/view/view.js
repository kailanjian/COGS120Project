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
