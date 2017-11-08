import { Recipes } from '/imports/api/recipes/recipes.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './home.html';



var recipes = [{name: "recipe 1"}, {name: "recipe 2"}, {name: "recipe 3"}];
var recipeGroups;
var searchText;
var subscription;

Template.App_home.onCreated(function() {
  subscription = Meteor.subscribe('recipes.user');
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

Template.App_home.onRendered( function() {
  $('#done_delete').hide();
});

Template.App_home.helpers({
  recipeGroups() {
    return recipeGroups;
  },
  noRecipes() {
    return Recipes.find({}).count() == 0;
  },
});

Template.App_home.helpers({
  UserName(){
    return Meteor.user().profile.name
  }
})


Template.App_home.events({
  'click .sideBarOverlay'(event) {
    $('.sideBarOverlay').hide();
  },
  'click .menuButtonWrapper'(event) {
    $('.sideBarOverlay').show();
  },
  'click .removeRecipeButton'(event) {
    $('.deleteButton').show();
    $('#done_delete').show();
  },
  'click #done_delete'(event) {
    $('.deleteButton').hide();
    $('#done_delete').hide();
  },
  'click .logoutButton'(event) {
    Meteor.logout();
    if (subscription) {
      subscription.stop();
    }
    FlowRouter.go('/login');
  },
  'input .searchBar'(event) {
    let text = $(".searchInput").val();
    searchText.set(text);
  }
});

Template.recipeGroup.onCreated(function () {
});

Template.recipeGroup.helpers({
  recipes() {
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
