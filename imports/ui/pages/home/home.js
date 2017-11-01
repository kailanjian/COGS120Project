import { Template } from 'meteor/templating';

import './home.html';

var recipes = [{name: "recipe 1"}, {name: "recipe 2"}, {name: "recipe 3"}];
var recipeGroups = 
  [
    {
      name: "Random", 
      recipes: [{name: "Random Recipe"}]
    },
    {
      name: "A",
      recipes: [{name: "Apple Pie"}, {name: "Avocado dip"}]
    },
    {
      name: "C",
      recipes: [{name: "Chocolate Chip Cookies"}]
    }
  ]


Template.App_home.helpers({
  recipeGroups() {
    return recipeGroups;
  }
});

Template.recipeGroup.helpers({
  recipes() {
    return this.recipes;
  }
})