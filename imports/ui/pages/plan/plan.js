import "./plan.html"

import { Diets } from '/imports/api/diets/diets.js';
import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';

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

Template.App_plan.onCreated(function() {
  Meteor.subscribe('diets.user', function() {
    // tODO why isn't this showing up
    let userDiets = Diets.find({}).map((item) => item);

    recipeDataDynamic.set(recipeDataMock);
    console.log("userDiets: " + userDiets);
    recipeDataDynamic.get().forEach(function(recipe) {
      recipe.keywords = 
        recipe.keywords + ", " + userDiets.map((diet) => diet.name).join(",");
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