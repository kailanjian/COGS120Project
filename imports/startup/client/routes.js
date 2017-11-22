import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/home_old/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/add/add.js';
import '../../ui/pages/view/view.js';
import '../../ui/pages/plan/plan.js';
import '../../ui/pages/diet/diet.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';
import '../../ui/pages/help/help.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  // figure out how to apply this trigger to all login pages
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user() && !Meteor.loggingIn())
      redirect('/login');
  }],
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/nani', {
  name: 'App.home_old',
  // figure out how to apply this trigger to all login pages
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user() && !Meteor.loggingIn())
      redirect('/login');
  }],
  action() {
    BlazeLayout.render('App_body', { main: 'App_home_old' });
  },
});

FlowRouter.route('/plan', {
  name: 'App.plan',
  action() {
    BlazeLayout.render('App_body', { main: 'App_plan' });
  },
})

FlowRouter.route('/add', {
  name: 'App.add',
  action() {
    BlazeLayout.render('App_body', { main: 'App_add' });
  },
})

FlowRouter.route('/add/:id', {
  name: 'App.add',
  action() {
    BlazeLayout.render('App_body', { main: 'App_add' });
  },
})

FlowRouter.route('/view/:id', {
  name: 'App.view',
  action() {
    BlazeLayout.render('App_body', { main: 'App_view' });
  },
})

FlowRouter.route('/diet', {
  name: 'App.diet',
  action() {
    BlazeLayout.render('App_body', { main: 'App_diet' });
  },
})

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'App_login' });
  },
})

FlowRouter.route('/signup', {
  name: 'App.signup',
  action() {
    BlazeLayout.render('App_body', { main: 'App_signup' });
  },
});

FlowRouter.route('/help', {
  name: 'App.help',
  action() {
    BlazeLayout.render('App_body', { main: 'App_help' });
  },
});


FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
