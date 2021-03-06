import './add.html';
import '/imports/ui/components/tagInput/tagInput.js';

import {ReactiveVar} from 'meteor/reactive-var';
import {Meteor} from 'meteor/meteor';
import {Recipes} from '/imports/api/recipes/recipes.js';
import {Images} from '/imports/api/images/images.js';

import {DietOptions} from '/imports/api/dietoptions/dietoptions.js';
import {analytics} from 'meteor/okgrow:analytics';

let difficultyInput = undefined;
let mealInput = undefined;
let foodImg = undefined;
let recipeImg = undefined;
let tagInput = new ReactiveVar([]);

var id = new ReactiveVar("");

Template.App_add.onRendered(function () {
  $("#foodPicture").hide();
  $("#recipePhoto").hide();
});

function imageSource(imageID) {
  return "/cfs/files/images/" + imageID;
}

function showFoodPicture(source) {
  $("#foodPicture").attr('src', source).show();
  $("#galleryButton").hide();
  $("#foodPhotoDescription").text("change food photo");
}

function showRecipePicture(source) {
  $("#recipePhoto").attr('src', source).show();
  $(".recipe_photo_button").text("change recipe photo");
}


function initializePage() {
  // initialize page data
  id.set(FlowRouter.current().params.id);
  let recipe = Recipes.findOne(id.get());

  // clear out globals
  difficultyInput = undefined;
  mealInput = undefined;
  foodImg = undefined;
  recipeImg = undefined;
  tagInput.set([]);

  if (!id.get())
    return;

  if (recipe.foodImg) {
    showFoodPicture(imageSource(recipe.foodImg));
  }

  if (recipe.recipeImg) {
    showRecipePicture(imageSource(recipe.recipeImg));
  }

  let r = $("<span id=\"delete_button\" class=\"btn btn-default add_bottom_buttons\" >delete</span>");
  $(".go_home").append(r);
  $(".add_bottom_buttons").css("width", "27%");

  console.log("page initialized with an id");

  $(".recipe_name").val(recipe.name);
  $("#servingsInput").val(recipe.servings);
  $("#timeInput").val(recipe.time);
  $(".ingredients").val(recipe.ingredients);
  $(".instructions").val(recipe.instructions);
  //$(".keywords").val(recipe.keywords);
  if (recipe.keywords) {
    tagInput.set(recipe.keywords.split(",").map((keyword) => keyword.trim()));
    console.log(recipe.keywords.split(",").map((keyword) => keyword.trim()));
  }
  else
    tagInput.set([]);

  difficultyInput = recipe.difficulty;
  mealInput = recipe.meal;
  foodImg = recipe.foodImg;
  recipeImg = recipe.recipeImg;

  $("#difficultySelector").val(recipe.difficulty);
  $("#mealSelector").val(recipe.meal);
}

Template.App_add.onCreated(function () {
  console.log("App_add created");
  Meteor.subscribe("recipes.user", function () {
    console.log("subscribed to user recipes")
    initializePage();
  });
  Meteor.subscribe("images.all");
  /*
  if (id) {
    $(".recipe_name").val(recipe.name);
  }
  */
});

Template.App_add.helpers({
  id() {
    console.log("id helper ran: " + id);
    return id.get();
  },
  dietoptions() {
    return DietOptions;
  },
  matchedTags() {
    return tagInput.get();
  }
});

Template.pictureHolder.events({
  "click .picture_holder"(event) {
    event.preventDefault();
    $("#file-input").click();
  },
});

function fileInputShowPhoto (event, showPictureFunction) {
  let file = event.originalEvent.srcElement.files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    showPictureFunction(reader.result);
  };
  reader.readAsDataURL(file);
}

Template.App_add.events({
  "click .recipe_photo_button"(event) {
    event.preventDefault();
    $("#recipe-photo-input").click();
  },
  "click #delete_button"(event) {
    if (confirm("Are you sure you want to delete this recipe?")) {
      console.log("deleting: " + id.get());
      Meteor.call("recipes.delete", id.get());
      FlowRouter.go('/');
    }
  },
  "change #file-input" (event) {
    fileInputShowPhoto(event, showFoodPicture);
  },
  "change #recipe-photo-input"(event) {
    fileInputShowPhoto(event, showRecipePicture);
  },
  "input .keywordInput"(event) {
    let input = event.currentTarget.value.trim();
    console.log("input: " + input);
    let currTags = tagInput.get();
    if (currTags.indexOf(input) < 0)
      currTags.push(input);
    tagInput.set(currTags);
    // TODO check for duplicates
    event.currentTarget.value = "";
  },
  "click .tag-option"(event) {
    console.log(event);
    // need to trim because outerText grabs whitespace too
    let selectedTag = event.currentTarget.outerText.trim();
    console.log("clicked tag: " + selectedTag);
    let currTags = tagInput.get();
    let selectedIndex = currTags.indexOf(selectedTag);
    console.log("selectedIndex: " + selectedIndex);
    currTags.splice(selectedIndex, 1);
    tagInput.set(currTags);

  },
  "click #saveButton"(event) {
    event.preventDefault();
    // collect all data
    // todo: images
    let name = $(".recipe_name").val();
    let difficulty = $("#difficultySelector").val();
    let meal = $("#mealSelector").val();
    let servings = $("#servingsInput").val();
    let time = $("#timeInput").val();
    let ingredients = $("#ingredientsInput").val();
    let instructions = $("#instructionsInput").val();
    let keywords = tagInput.get().join(", ");
    console.log("trying to save " + name + "...");
    console.log("saving keywords: ");
    console.log(tagInput.get() + " as " + tagInput.get().join(", "));


    difficultyInput = difficulty;
    mealInput = meal;

    let recipePhotoInput = $("#recipe-photo-input").prop("files");
    let recipeFile = recipePhotoInput[0];
    let foodFileInput = $("#file-input").prop("files");
    let foodFile = foodFileInput[0];

    let recipePhotoPromise = new Promise((resolve, reject) => {
      console.log("recipeFile: " + recipeFile);
      if (!recipeFile)
        resolve("")
      else {
        Images.insert(recipeFile, function (err, file) {
          if (file)
            resolve(file._id);

          // probably never called but lets hope this method never fails
          reject("Err: " + err);
        });
      }
    });

    let foodPhotoPromise = new Promise((resolve, reject) => {
      console.log("foodFile: " + foodFile);
      if (!foodFile) {
        resolve("");
      } else {
        Images.insert(foodFile, function (err, file) {
          if (file)
            resolve(file._id);

          // probably never called but lets hope this method never fails
          reject("Err: " + err);
        });
      }
    });

    recipePhotoPromise.then(function (recipePhotoId) {
      foodPhotoPromise.then(function (foodPhotoId) {
        console.log("wow you used promises correctly");
        let isValid = validateInputs(recipePhotoId);

        if (!recipePhotoId && recipeImg)
          recipePhotoId = recipeImg;

        if (!foodPhotoId && foodImg)
          foodPhotoId = foodImg;

        if (!isValid) {
          return;
        }

        // is valid
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
            foodPhotoId,
            recipePhotoId,
            Meteor.userId());
          FlowRouter.go("/view/" + id.get());
        } else {
          analytics.track("click", {category: "add"})
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
            foodPhotoId,
            recipePhotoId,
            Meteor.userId())
          FlowRouter.go("/");
        }
      });
    });

    function validateInputs(recipeFile) {
      if (!name) {
        alert("Please add in a name for your recipe!")
        return false;
      }

      /*
      if (difficultyInput == null || mealInput == null) {
        alert("Please select the difficulty/time of the meal!");
        return false;
      }
      */

      /*
      if (!time) {
        alert("Please add in how much time it takes to make!")
        return false;
      }

      if (!servings) {
        alert("Please indicate the number of servings this recipe has!")
        return false;
      }
      */

      if (!recipeFile && !instructions) {
        alert("Please input instructions!");
        return false;
      }

      if (!recipeFile && !ingredients) {
        alert("Please input ingredients!");
        return false;
      }

      return true;
    }

    // todo: if a recipe image is inserted, will bypass the validation
    /*
    if (recipeFile) {
        console.log("inserting recipeFile");
        Images.insert(recipeFile, finishedPhotoInput);
    } else {
        finishedPhotoInput(undefined, undefined);
    }*/

    // filledOut = true;

    /*
    function finishedPhotoInput(err, res) {
        console.log("Starting save, is the form filled out?");
        console.log(filledOut);
        if (!filledOut){
          return;
        }
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
    */
    /*
    function finishedFile(err, res) {
        if (!filledOut){
          return;
        }
        console.log(filledOut);
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

    */
  }
});

Template.camButton.events({
  'click .camButton': function (e) {
    e.preventDefault();
    console.log("pressed bois");
    FlowRouter.go('/camera')
  },
});

Template.difficulty.events({
  'click .selector_buttons': function (e) {
    console.log(e);
    difficultyInput = e.currentTarget.outerText;
    $(".difficulty_and_servings .selector_buttons").css("background-color", "inherit");
    $(e.currentTarget).css("background-color", "#DEDEDE");
  }
});

Template.mealOfDay.events({
  'click .selector_buttons': function (e) {
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
