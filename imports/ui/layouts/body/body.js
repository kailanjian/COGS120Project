import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tracker } from 'meteor/tracker'

import './body.html';

Template.App_body.onRendered(function() {
  Tracker.autorun(() => {
    document.title = FlowRouter.getRouteName();
  });
});
