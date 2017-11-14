import "./plan.html"

import { Diets } from '/imports/api/diets/diets.js';
import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';
import { Images } from '/imports/api/images/images.js';

import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';


let recipeDataMock = [
  { name: "Pancakes",
    time: 30,
    difficulty: "hard",
    meal: "breakfast",
    servings: 1,
    ingredients: "ingredient 1 \n ingredient 2",
    instructions: "cook ingredients \n eat",
    keywords: "paleo",
    foodImg: "url",
    foodUrl: "https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg",
    recipeImg: undefined,
    owner: "internet"
  },
  {
    name: "BLT",
    time: 20,
    difficulty: "easy",
    meal: "lunch",
    servings: 1,
    ingredients: "bacon \n lettuce \n tomato",
    instructions: "cook ingredients \n eat",
    keywords: "low-carb, low-fat",
    foodImg: "url",
    foodUrl: "http://hagerstownpizzabrothers.com/wp-content/uploads/2015/02/BLT-Sandwich.jpg",
    recipeImg: undefined,
    owner: "internet"
  },
  {
    name: "Steak and Potatoes",
    time: 40,
    difficulty: "med",
    meal: "dinner",
    servings: 1,
    ingredients: "ingredient 1 \n ingredient 2",
    instructions: "cook ingredients \n eat",
    keywords: "high-environmental-impact",
    foodImg: "url",
    foodUrl: "https://www.nestleprofessional.us/sites/g/files/gfb131/f/styles/recipe/public/media/beefy-roasted-steak-potatoes-gluten-free-minors-nestle-professional-food-service-recipe-540x400.jpg?itok=652ZCHdN",
    recipeImg: undefined,
    owner: "internet"
  },
]

let recipeDataDynamic = new ReactiveVar(recipeDataMock);

Template.App_plan.helpers({
  internetRecipes() {
    if (recipeDataDynamic)
      return recipeDataDynamic.get();
    return recipeDataDynamic;
  }
})

Template.App_plan.events({
  "click .saveButton"(event) {
    console.log(this.name);
    console.log("save clicked");
    console.log("url: ");
    console.log(this.foodUrl);
    console.log(this);
    let curr = this;
    var fileObj = new FS.File();
    fileObj.attachData(this.foodUrl, function () {
      Images.insert(fileObj, function (err, fileObj) {
        console.log(fileObj._id);
        Meteor.call("recipes.insert", 
          curr.name, curr.time, curr.difficulty,
          curr.meal, curr.servings, curr.ingredients,
          curr.instructions, curr.keywords, fileObj._id, undefined, Meteor.userId());
        alert("Recipe saved successfully!");
        FlowRouter.go("/");
      });
    });
  }
})

Template.App_plan.onCreated(function() {
  Meteor.subscribe('images.all');
  Meteor.subscribe('diets.user', function() {
    // tODO why isn't this showing up
    let userDiets = Diets.find({}).map((item) => item);

    let mockCopy = $.extend(true, {}, recipeDataMock);
    console.log("mockCopy: ");
    console.log(mockCopy);
    let mockCopyArr = Object.keys(mockCopy).map((i) => mockCopy[i])
    recipeDataDynamic.set(mockCopyArr);
    console.log("mockCopyArr: ");
    console.log(mockCopyArr);
    let recipes = recipeDataDynamic.get();
    console.log("recipes: ");
    console.log(recipes);
    recipes.forEach(function(recipe) {
      additionalUserDiets = userDiets.map((diet) => diet.name).join(",");
      if (additionalUserDiets) {
        additionalUserDiets = ", " + additionalUserDiets;
      }
      recipe.keywords =
        recipe.keywords + additionalUserDiets;
      console.log("keywords new: " + recipe.keywords);
    });
  });
})

Template.App_plan.onRendered(function() {
});

Template.internetRecipe.helpers({
  tags() {
    console.log(this);
    return this.keywords.split(",").map((keyword) => keyword.trim());
  }
})
