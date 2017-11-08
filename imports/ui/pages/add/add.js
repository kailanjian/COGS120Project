import './add.html';
import '/imports/ui/components/tagInput/tagInput.js';

import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Recipes } from '/imports/api/recipes/recipes.js';
import { Images } from '/imports/api/images/images.js';

import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';

let difficultyInput = undefined;
let mealInput = undefined;
let foodImg = undefined;
let recipeImg = undefined;

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
  foodImg = recipe.foodImg;
  recipeImg = recipe.recipeImg;
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
        event.preventDefault();
        if(difficultyInput == null || mealInput== null)
        {
            alert("Please select the difficulty/time of the meal!");
            return;
        }
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
        let fileInput = $("#file-input").prop("files");
        let file = fileInput[0];
        if (recipeFile) {
            console.log("inserting recipeFile");
            Images.insert(recipeFile, finishedPhotoInput); 
        } else {
            finishedPhotoInput(undefined, undefined);
        }
        

        function finishedPhotoInput(err, res) {
            if (!err && res) {
                console.log("set recipe file id");
                recipeImg = res._id;
            }

            if (file) {
                console.log("inserting file");
                Images.insert(file, finishedFile);
            } else {
                console.log("file not found: " + file);
                finishedFile(undefined, undefined);
            }
        }

        function finishedFile(err, res) {
            if (res) {
                console.log("set recipe file id");
                foodImg = res._id;
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
                        foodImg,
                        recipeImg,
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
                        foodImg,
                        recipeImg,
                        Meteor.userId())
                }
            }
        }
        FlowRouter.go("/")
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


/*
let tagInputText = new ReactiveVar("");
let tagInputWord = new ReactiveVar("");

Template.tagInput.onCreated(function() {
    console.log("tag input created");

});

Template.tagInput.helpers({
    matchedTags() {
        if (tagInputWord.get()) {
            return DietOptions.filter(function(word) {
                return word.match(tagInputWord.get());
            }).slice(0, 5);
        }
        return false;
    }
})

Template.tagInput.events({
    "input .keywords"(event) {
        console.log("hello");
        let textInput = $(event.currentTarget).val();
        console.log("input changed to: " + textInput);
        tagInputText.set(textInput);

        if (!(textInput.match(","))) {
            tagInputWord.set(tagInputText.get());
        } else {
            tagInputWord.set(tagInputText.get().split(",").slice(-1)[0].trim());
            console.log("tagInputWord set to: " + tagInputWord.get());
        }

        console.log("tag input word set to: " + tagInputWord.get())
    },
    "click .tag-option"(event) {
        let replaceWord = event.currentTarget.outerText.trim();
        console.log(event);
        console.log("replaced word: " + replaceWord);
        let newInputText = tagInputText.get();
        let splitInput = newInputText.split(",").map(function(word) {return word.trim()});
        splitInput[splitInput.length - 1] = replaceWord;
        newInputText = splitInput.join(", ");

        tagInputText.set(newInputText);
        tagInputWord.set("");
        $(".keywords").val(tagInputText.get());
        $(".keywords").focus();

    }
});*/