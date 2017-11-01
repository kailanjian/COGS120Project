import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/add/add.js';
import '../../ui/pages/view/view.js';
import '../../ui/pages/load/load.js';
import '../../ui/pages/camera/camera.js';
import '../../ui/pages/diet/diet.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/add', {
  name: 'App.add',
  action() {
    BlazeLayout.render('App_body', { main: 'App_add' });
  },
})

FlowRouter.route('/view', {
  name: 'App.view',
  action() {
    BlazeLayout.render('App_body', { main: 'App_view' });
  },
})

FlowRouter.route('/load', {
  name: 'App.load',
  action() {
    BlazeLayout.render('App_body', { main: 'App_load' });
  },
})

FlowRouter.route('/camera', {
  name: 'App.camera',
  action() {
    BlazeLayout.render('App_body', { main: 'App_camera' });
  },
})

FlowRouter.route('/diet', {
  name: 'App.diet',
  action() {
    BlazeLayout.render('App_body', { main: 'App_diet' });
  },
})

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
