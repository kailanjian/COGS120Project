import { Recipes } from '/imports/api/recipes/recipes.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './home.html';



var recipes = [{name: "recipe 1"}, {name: "recipe 2"}, {name: "recipe 3"}];
var recipeGroups;
var searchText;

Template.App_home.onCreated(function() {
  searchText  = new ReactiveVar("");

  recipeGroups = 
    [
      {
        name: "Recommended Based on Diet Restrictions", 
        classifier: function(recipe) {
          if (recipe.difficulty == "easy") {
            return true;
          }
        }
      },
    ];
  var aCode = "a".charCodeAt(0);
  var zCode = "z".charCodeAt(0);
  for (let i = aCode; i <= zCode; i++) {
    let char = String.fromCharCode(i);
    recipeGroups.push(
      {
        name: char.toUpperCase(),
        classifier: function(recipe) {
          return (recipe.name.charAt(0).toUpperCase() == char.toUpperCase());
        }
      }
    )
  }
});


Template.App_home.helpers({
  recipeGroups() {
    return recipeGroups;
  },
});


Template.App_home.events({
  'click .sideBarOverlay'(event) {
    $('.sideBarOverlay').hide();
  },
  'click .navButtonWrapper'(event) {
    $('.sideBarOverlay').show();
  },
  'click .removeRecipeButton'(event) {
    $('.deleteButton').show();
  },
  'input .searchBar'(event) {
    let text = $(".searchInput").val();
    searchText.set(text);
    console.log(text);
  }
});

Template.recipeGroup.onCreated(function () { 
  Meteor.subscribe('recipes.all');
});

Template.recipeGroup.helpers({
  recipes() {
    console.log(this);
    var classifier = this.classifier;
    // important to activate Tracker
    var search = searchText.get();
    var filteredClassifier = function(recipe) {
      if (classifier(recipe) && recipe.name.match(new RegExp(search, 'i'))){
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

Template.recipe.events({
  'click .deleteButton'(event) {
    event.preventDefault();
    console.log("minus clicked");
    console.log(this._id);
    Meteor.call("recipes.delete", this._id);
  }
})

Template.recipe.onRendered(function() {
  // initialize states
  $('.deleteButton').hide();
})