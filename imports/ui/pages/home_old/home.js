import { Recipes } from '/imports/api/recipes/recipes.js';
import { Diets } from '/imports/api/diets/diets.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './home.html';



var recipes = [{name: "recipe 1"}, {name: "recipe 2"}, {name: "recipe 3"}];
var recipeGroups = new ReactiveVar([]);
var searchText;
var subscription;

function isRecommendedRecipe(checkRecipe) {
  // hide the recommendations by filtering always to false
  return false;
  var recipes = Recipes.find({}).map(function (recipe) {
    return recipe;
  });
  console.log("recommending recipes: ");
  console.log("recipes: " + recipes);

  var diets = Diets.find({}).map(function (diet) {
    return diet;
  });
  console.log("diets: ");
  console.log(diets);

  let requirements = diets.filter(function(diet) {
    return (diet.importance == "need");
  }).map(function(diet) {
    return diet.name;
  });
  console.log("requirements: ");
  console.log(requirements);

  // BREAKFAST

  var breakfastRecipes = recipes.filter((recipe) => recipe.meal == checkRecipe.meal);

  var breakfastDietRecipes = [];
  for (let i = 0; i < breakfastRecipes.length; i++) {
    let keywords = breakfastRecipes[i].keywords.split(",").map((keyword) => keyword.trim().toLowerCase());

    let matchCount = 0;
    for (let j = 0; j < keywords.length; j++) {
      for (let k = 0; k < requirements.length; k++) {
        console.log("comparing " + keywords[j] + " with " + requirements[k]);
        if (keywords[j] == requirements[k]) {
          matchCount++;
        }
      }
    }
    console.log("match count");
    console.log(matchCount);
    if (matchCount == requirements.length) {
      console.log("PUSHED BEKFAST");
      breakfastDietRecipes.push(breakfastRecipes[i]);
    }
  }

  let breakfastRecipe;
  if (breakfastDietRecipes.length > 0) {
    breakfastRecipe = breakfastDietRecipes[0];
  } else {
    breakfastRecipe = {_id: "internet" + checkRecipe.meal, name: "INTERNET BREAKFAST"};
  }

  // lunch
/*
  var lunchRecipes = recipes.filter((recipe) => recipe.meal == "lunch");

  var lunchDietRecipes = [];
  for (let i = 0; i < lunchRecipes.length; i++) {
    let keywords = lunchRecipes[i].keywords.split(",").map((keyword) => keyword.trim().toLowerCase());

    let matchCount = 0;
    for (let j = 0; j < keywords.length; j++) {
      for (let k = 0; k < requirements.length; k++) {
        console.log("comparing " + keywords[j] + " with " + requirements[k]);
        if (keywords[j] == requirements[k]) {
          matchCount++;
        }
      }
    }
    console.log("match count");
    console.log(matchCount);
    if (matchCount == requirements.length) {
      console.log("PUSHED BEKFAST");
      lunchDietRecipes.push(lunchRecipes[i]);
    }
  }

  let lunchRecipe;
  if (lunchDietRecipes.length > 0) {
    lunchRecipe = lunchDietRecipes[0];
  } else {
    lunchRecipe = {_id: "internetlunch", name: "INTERNET lunch"};
  }*/


  // dinner
/*
  var dinnerRecipes = recipes.filter((recipe) => recipe.meal == "dinner");

  var dinnerDietRecipes = [];
  for (let i = 0; i < dinnerRecipes.length; i++) {
    let keywords = dinnerRecipes[i].keywords.split(",").map((keyword) => keyword.trim().toLowerCase());

    let matchCount = 0;
    for (let j = 0; j < keywords.length; j++) {
      for (let k = 0; k < requirements.length; k++) {
        console.log("comparing " + keywords[j] + " with " + requirements[k]);
        if (keywords[j] == requirements[k]) {
          matchCount++;
        }
      }
    }
    console.log("match count");
    console.log(matchCount);
    if (matchCount == requirements.length) {
      console.log("PUSHED BEKFAST");
      dinnerDietRecipes.push(dinnerRecipes[i]);
    }
  }

  let dinnerRecipe;
  if (dinnerDietRecipes.length > 0) {
    dinnerRecipe = dinnerDietRecipes[0];
  } else {
    dinnerRecipe = {_id: "internetdinner", name: "INTERNET dinner"};
  }

*/
  return checkRecipe._id == breakfastRecipe._id;
}

Template.App_home_old.onCreated(function() {
  console.log("CHANGED");
  recipeGroups = new ReactiveVar([]);
  subscription = Meteor.subscribe('recipes.user');
  Meteor.subscribe('diets.user', function() {
    console.log("DIETS SUBSCRIPTION READY");
    let temp = recipeGroups.get();
    temp.unshift({
      name: "Recommended Based on Diet Restrictions",
      classifier: function(recipe) {
        if (isRecommendedRecipe(recipe)) {
          return true;
        }
      }
    });
    recipeGroups.set(temp);
  });
  searchText  = new ReactiveVar("");

  console.log(isRecommendedRecipe);
  var aCode = "a".charCodeAt(0);
  var zCode = "z".charCodeAt(0);
  for (let i = aCode; i <= zCode; i++) {
    let char = String.fromCharCode(i);
    let temp = recipeGroups.get();
    temp.push(
      {
        name: char.toUpperCase(),
        classifier: function(recipe) {
          return (recipe.name.charAt(0).toUpperCase() == char.toUpperCase()) && recipe._id != "internetbreakfast";
        }
      });
    recipeGroups.set(temp);
  }
});

Template.App_home_old.onRendered( function() {
  $('#homeDoneButton').hide();
});

Template.recipeOld.onRendered( function(){
  $('.deleteButton').hide();
});

Template.recipeOld.events({
  'click .deleteButton'(event) {
    event.preventDefault();
    console.log("minus clicked");
    console.log(this._id);
    Meteor.call("recipes.delete", this._id);
  }
});

Template.App_home_old.helpers({
  recipeGroups() {
    return recipeGroups.get();
  },
  noRecipes() {
    return Recipes.find({}).count() == 0;
  },
});

Template.App_home_old.helpers({
  UserName(){
    if (Meteor.user())
      return Meteor.user().profile.name;
    return "";
  }
})


Template.App_home_old.events({
  'click .sideBarOverlay'(event) {
    $('.sideBarOverlay').hide();
  },
  'click .menuButtonWrapper'(event) {
    $('.sideBarOverlay').show();
  },
  'click #deleteRecipeButton'(event) {
    if($('.bottom_navigation_buttons').is(":visible")){
      $('.deleteButton').show();
      $('.bottom_navigation_buttons').hide();
      $('#homeDoneButton').show();
    } else {
      $('.deleteButton').hide();
      $('.bottom_navigation_buttons').show();
      $('#homeDoneButton').hide();
    }
  },
  'click #homeDoneButton'(event) {
    $('.deleteButton').hide();
    $('#homeDoneButton').hide();
    $('.bottom_navigation_buttons').show();
  },
  'input .searchBar'(event) {
    let text = $(".searchInput").val();
    searchText.set(text);
  }
});


Template.recipeGroupOld.onCreated(function () {
});

Template.recipeGroupOld.helpers({
  recipes() {
    console.log("recipeGroupOld recipe helper");
    var classifier = this.classifier;
    // important to activate Tracker
    var search = searchText.get();
    var filteredClassifier = function(recipe) {
      if (classifier(recipe) && (recipe.name.match(new RegExp(search, 'i')) || recipe.keywords.match(new RegExp(search, 'i')))){
        return true;
      }
      return false;
    }

    let cursor = Recipes.find({$where: function() {
      return filteredClassifier(this)
    }});
    if (cursor.count() > 0) {
      return cursor;
    }
    else
      return 0;
  }
})
