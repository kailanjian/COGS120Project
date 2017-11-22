import './help.html'

import { ReactiveVar } from 'meteor/reactive-var';

let ht = [
  {
    title: "help topic 1",
    content:
    "    <p> Wow this is all very useful. Imagine that. Here's how to do it. </p>\n" +
    "    <ul>\n" +
    "      <li>Step 1: Wow this app is so intutive</li>\n" +
    "      <li>Step 2: Use your intuition</li>\n" +
    "      <li>Step 3: Solve your problem</li>\n" +
    "    </ul>\n" +
    "    <p> Wow your problems are solved!!!!</p>"
  },
  {
    title: "how do I change my diet preferences?",
    content:
    "    <p> This is how to modify your diet preferences. </p>\n" +
    "    <ul>\n" +
    "      <li>Step 1: Click on \'Your Profile' at the bottom of the screen</li>\n" +
    "      <li>Step 2: Use your intuition</li>\n" +
    "      <li>Step 3: Solve your problem</li>\n" +
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