import './add.html';

import { Meteor } from 'meteor/meteor';
import { Recipes } from '/imports/api/recipes/recipes.js';

let difficultyInput = undefined;
let mealInput = undefined;

var id;

function initializePage() {
  // initialize page data
  id = FlowRouter.current().params.id;
  let recipe = Recipes.findOne(id)
  if (!id)
    return;

  $(".recipe_name").val(recipe.name);
  // TODO add in rest of page stuff
  // TODO add flag to mark page as to update rather than to save
}

Template.App_add.onCreated(function() {
  Meteor.subscribe("recipes.user", function() {
    initializePage();
  });
  /*
  if (id) {
    $(".recipe_name").val(recipe.name);
  }
  */
})

Template.App_add.events({
    "click #saveButton"(event) {
        // collect all data
        // todo: images
        let name = $(".recipe_name").val();
        let difficulty = difficultyInput;
        let meal = mealInput;
        console.log("inserted recipe with meal " + meal);
        let servings = $("#servingsInput").val();
        let time = $("#timeInput").val();
        let ingredients = $("#ingredientsInput").val();
        let instructions = $("#instructionsInput").val();
        let keywords = $("#keywordsInput").val();

        Meteor.call('recipes.insert', 
            name, 
            time, 
            difficulty, 
            meal, 
            servings,
            ingredients,
            instructions,
            keywords,
            Meteor.userId())
    }
});

Template.camButton.events({
    'click .camButton': function(e){
        e.preventDefault();
        console.log("pressed bois");
        FlowRouter.go('/camera')
    },
});

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

$("#first").click(function () {
    $("#uploadfile").click();
});
