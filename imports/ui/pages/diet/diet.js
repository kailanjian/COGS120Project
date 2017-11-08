import './diet.html';

import { Diets } from '/imports/api/diets/diets.js';

import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';

var modifications = [];

Template.restrictions.helpers({
  diets(){
    return Diets.find({});
  },
})

Template.restriction.helpers({
  needSelected() {
    if (Diets.findOne(this._id)) {
      let diet = Diets.findOne(this._id);
      if (diet.importance == "need") {
        return "selected";
      }
    } 
    return "";
  },
  wantSelected() {
    if (Diets.findOne(this._id)) {
      let diet = Diets.findOne(this._id);
      if (diet.importance == "want") {
        return "selected";
      }
    } 
    return "";
  },
})

Template.restriction.events({
  "change .dietImportanceSelect"(event) {
    Meteor.call("diets.update", this._id, event.currentTarget.value);
  }
})

Template.App_diet.onCreated(function() {
  Meteor.subscribe("diets.user");
})

Template.App_diet.helpers({
  dietoptions() {
    return DietOptions;
  }
})

Template.App_diet.events({
  "input .searchInput"(event) {
    if (DietOptions.find(function(word) {
      return (word == event.currentTarget.value);
    })) {
      // insert 
      Meteor.call("diets.insert", event.currentTarget.value, "need", Meteor.userId());
      event.currentTarget.value = "";
    }
  }
})
