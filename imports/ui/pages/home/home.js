import { Template } from 'meteor/templating';

import './home.html';

var recipes = [{name: "recipe 1"}, {name: "recipe 2"}, {name: "recipe 3"}];
var recipeGroups = 
  [
    {
      name: "Recommended Based on Diet Restrictions", 
      recipes: [
        {name: "Recommended Breakfast",
         time: "30 min",
         difficulty: "easy",
         meal: "breakfast"}, 
        {name: "Recommended Lunch",
        time: "40 min",
        difficulty: "hard",
        meal: "lunch"}, 
        {name: "Recommended Dinner",
        time: "20 min",
        difficulty: "med",
        meal: "dinner"}]
    },
    {
      name: "A",
      recipes: [
        {name: "Apple Pie",
        time: "40 min",
        difficulty: "hard",
        meal: "desert"}, 
        {name: "Avocado dip",
        time: "20 min",
        difficulty: "med",
        meal: "appetizer"}]
    },
    {
      name: "C",
      recipes: [
        {name: "Chicken McNuggets",
        time: "20 min",
        difficulty: "easy",
        meal: "lunch"}]
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