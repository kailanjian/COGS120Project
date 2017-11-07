import { Mongo } from 'meteor/mongo';

var imageStore = new FS.Store.GridFS("images");

export const Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'update': function() {
    return true;
  },
  'remove': function(){
    return true;
  },
  'download': function(){
    return true;
    }
});