import "./navbar.html"

import { Meteor } from 'meteor/meteor';

var selectedColor = '#278ee3';

Template.navigation_bar.onRendered(function(){
  console.log(FlowRouter.getRouteName());
  switch (FlowRouter.getRouteName()) {
    case "App.diet":
      $("#diet_nav").css('color', selectedColor);
      break;
    case "App.home_old":
    case "App.home":
      $("#recipes_nav").css('color', selectedColor);
      break;
    case "App.plan":
      $("#plan_nav").css('color', selectedColor);
      break;
    default:
      $("#help_nav").css('color', selectedColor);
  }
});
