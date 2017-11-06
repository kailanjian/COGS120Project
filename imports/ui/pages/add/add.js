import './add.html';

import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '/imports/api/recipes/recipes.js';

let difficultyInput = undefined;
let mealInput = undefined;

var id = new ReactiveVar("");

function initializePage() {
  // initialize page data
  id.set(FlowRouter.current().params.id);
  let recipe = Recipes.findOne(id.get())
  if (!id.get())
    return;

  $(".recipe_name").val(recipe.name);
  $("#servingsInput").val(recipe.servings);
  $("#timeInput").val(recipe.time);
  $(".ingredients").val(recipe.ingredients);
  $(".instructions").val(recipe.instructions);
  $(".keywords").val(recipe.keywords);
  difficultyInput = recipe.difficulty;
  mealInput = recipe.meal;
  $(".difficulty_and_servings .selector_buttons").each(function() {
      console.log(this);
      console.log($(this));
      if ($(this)[0].outerText == difficultyInput) {
          console.log("matched");
          $(this).css("background-color", "#DEDEDE");
      }
  })
  $(".meal .selector_buttons").each(function() {
    if ($(this)[0].outerText == mealInput) {
        $(this).css("background-color", "#DEDEDE");
    }
  });
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

Template.App_add.helpers({
    id() {
        console.log("id helper ran: " + id);
        return id.get();
    }
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

        if (id) {
            Meteor.call('recipes.update', id,
                name,
                time,
                difficulty,
                meal,
                servings,
                ingredients,
                instructions,
                keywords,
                Meteor.userId());

        } else {

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
