// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Images } from '../images.js';

Meteor.publish('images.all', function () {
  return Images.find();
});

