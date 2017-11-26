import './help.html'

import { ReactiveVar } from 'meteor/reactive-var';

let ht = [
  {
    title: "How do I add recipes?",
    content:"<p>There are two ways to <b>add</b> recipes. To add your own recipe, press the '+' button and fill out the information. Then, press 'save'. The recipe should appear on the 'My Recipes' pages\n" +
    "The other way is to save a recipe from 'Discover'. See '<i>How do I get new recipes that fit within my diet preferences?</i>'</p>"
  },
  {
    title: "How do I view or modify my recipes?",
    content:"<p>Click on 'My Recipes' to view all of your recipes</p>\n" +
    "<p>To <b>view</b> a specific recipe, simply click on the recipe.</p>\n" +
    "<p>To <b>edit</b> the recipe, click on the recipe, and click 'edit'. Once you are done editing, press 'save'. While editing, you can also <b>delete</b> the recipe by pressing 'delete'.</p>\n"
  },
  {
    title: "How do I change my diet preferences?",
    content:"<p>Click on 'Your Profile' to see and edit your preferences.</p>\n" +
    "<p>To <b>add a preference</b>, click on 'add a diet preference...' and select a preference.</p>\n" +
    "<p>To <b>remove a preference</b>, click on 'edit' and press the '-' icon next to the preference you want to delete. Once you are done, press done.</p>\n"
  },
  {
    title: "How do I get new recipes that fit within my diet preferences?",
    content:"<p>The 'Discover' page recommends new recipes that fit within your diet preferences.</p>\n" +
    "<p>You can <b>view</b> the details of the recipe by pressing 'see more...'</p>\n" +
    "<p>You can also <b>save</b> the recipe to 'My Recipes' by pressing 'save to my recipes'</p>"
  },
  {
    title: "How do I use this app?",
    content:
    "    <p> Wow this is all very useful. Imagine that. Here's how to do it. </p>\n" +
    "    <ul>\n" +
    "      <li>Wow this app is so intutive</li>\n" +
    "      <li>Use your intuition</li>\n" +
    "      <li>Solve your problem</li>\n" +
    "    </ul>\n" +
    "    <p> Wow your problems are solved!!!!</p>"
  },
];

let topics = new ReactiveVar(ht);

Template.help_topic.events({
  'click .dropdown'(event) {
    let uncle = event.target.parentElement.nextElementSibling;
    if ($(uncle).is(":visible")) {
      $(uncle).slideUp();
      $(event.target).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
      $(uncle).slideDown();
      $(event.target).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }
  },
  'click .title'(event) {
    let uncle = event.target.parentElement.nextElementSibling;
    if ($(uncle).is(":visible")) {
      $(uncle).slideUp();
      $(event.target.nextElementSibling).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
      $(uncle).slideDown();
      $(event.target.nextElementSibling).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    }
  }
});

Template.help_topic.onRendered( function() {
  $(".helpInstructions").hide();
});

Template.App_help.helpers({
  topics() {
    if (topics)
      return topics.get();
    return topics;
  }
});