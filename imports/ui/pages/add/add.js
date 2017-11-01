import './add.html';

//import '../../components/hello/hello.js';
//import '../../components/info/info.js';
import '../../components/nav/nav.js';


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
      $(".difficulty_and_servings .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "#DEDEDE");
    }
});

Template.mealOfDay.events({
    'click .selector_buttons': function(e){
      console.log(e);
      $(".meal .selector_buttons").css("background-color", "inherit");
      $(e.currentTarget).css("background-color", "#DEDEDE");
    }
});

$("#first").click(function () {
    $("#uploadfile").click();
});
