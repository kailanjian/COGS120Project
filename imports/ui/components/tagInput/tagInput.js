import './tagInput.html';
import { DietOptions } from '/imports/api/dietoptions/dietoptions.js';
import { ReactiveVar } from 'meteor/reactive-var';

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
});