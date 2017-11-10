import "./navbar.html"

import { Meteor } from 'meteor/meteor';

var selectedColor = '#3a86d1';

Template.navigation_bar.onRendered(function(){
  console.log(FlowRouter.getRouteName());
  switch (FlowRouter.getRouteName()) {
    case "App.diet":
      $("#diet_nav").css('color', selectedColor);
      break;
    case "App.home":
      $("#recipes_nav").css('color', selectedColor);
      break;
    case "App.plan":
      $("#plan_nav").css('color', selectedColor);
    default:
  }
})
