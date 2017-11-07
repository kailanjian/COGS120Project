import './add.html';

import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '/imports/api/recipes/recipes.js';
import { Images } from '/imports/api/images/images.js';

let difficultyInput = undefined;
let mealInput = undefined;

var id = new ReactiveVar("");

function initializePage() {
  // initialize page data
  id.set(FlowRouter.current().params.id);
  let recipe = Recipes.findOne(id.get())
  if (!id.get())
    return;

    console.log("page initialized with an id");

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
    console.log("App_add created");
  Meteor.subscribe("recipes.user", function() {
      console.log("subscribed to user recipes")
    initializePage();
  });
  Meteor.subscribe("images.all");
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
    "click .recipe_photo_button"(event) {
        event.preventDefault();
        $("#recipe-photo-input").click();
    },
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

        let recipePhotoInput = $("#recipe-photo-input").prop("files");
        let recipeFile = recipePhotoInput[0];
        if (recipeFile) {
            Images.insert(recipeFile, finishedPhotoInput); 
        } else {
            finishedPhotoInput(undefined, undefined);
        }

        let recipeFileId;
        let fileInput = $("#file-input").prop("files");
        let file = fileInput[0];
        function finishedPhotoInput(err, res) {
            if (!err && res) {
                console.log("set recipe file id");
                recipeFileId = res._id;
            }

            if (file) {
                Images.insert(file, finishedFile);
            } else {
                finishedFile(undefined, undefined);
            }
        }

        let fileId;
        function finishedFile(err, res) {
            if (res) {
                console.log("set recipe file id");
                fileId = res._id;
            }

            if (err) {
                console.log("ERROR");
                console.log(err)
            } else {
                if (id.get()) {
                    console.log("updating recipe");
                    console.log("id: " + id.get());
                    console.log("name: " + name);
                    console.log("difficulty: " + difficulty);
                    Meteor.call('recipes.update', id.get(),
                        name,
                        time,
                        difficulty,
                        meal,
                        servings,
                        ingredients,
                        instructions,
                        keywords,
                        fileId,
                        recipeFileId,
                        Meteor.userId());
                } else {
                    console.log("inserting recipe");
                    Meteor.call('recipes.insert', 
                        name, 
                        time, 
                        difficulty, 
                        meal, 
                        servings,
                        ingredients,
                        instructions,
                        keywords,
                        fileId,
                        recipeFileId,
                        Meteor.userId())
                }
            }
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
