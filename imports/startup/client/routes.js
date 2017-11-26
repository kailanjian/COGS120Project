import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';
import { analytics } from 'meteor/okgrow:analytics';

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
    let variation = getExperimentVariation();
    if (variation == 1) {
      redirect('/nani');
    }

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

Template.App_body.onCreated(function mainLayoutOnCreated() {
  const self = this;
  self.log = new ReactiveVar([]);
  self.currentIdentity = new ReactiveVar('No Identity Set');
  console.log("analytics")
  console.log(analytics)
  // We don't want to register analytics if it has been blocked by an adblocker.
  if (typeof analytics === 'undefined') return;

  self.currentIdentity.set(analytics._user._getTraits().email || 'No Identity Set');

  analytics.on('page', (event, properties, options) => {
    const latest = self.log.get();
    latest.push(`Page: ${options.path}`);
    self.log.set(latest);
  });

  analytics.on('identify', (event, properties) => {
    const latest = self.log.get();
    latest.push(`Identify: ${properties.email}`);
    self.log.set(latest);
    self.currentIdentity.set(properties.email);
  });

  analytics.on('track', (event) => {
    const latest = self.log.get();
    latest.push(`Track: ${event}`);
    self.log.set(latest);
  });


  //TODO variation picking works. make it global, then route the home page with it

});

let variation = undefined;
function getExperimentVariation() {
  if (variation) {
    return variation;
  }
  console.log('doing experiment');
  let chosenVar = cxApi.getChosenVariation();
  if (chosenVar == cxApi.NO_CHOSEN_VARIATION) {
    console.log("variation not found, generating");
    let newVar = cxApi.chooseVariation();
    console.log("picked variation " + newVar);
    cxApi.setChosenVariation(newVar);
    chosenVar = newVar;
  }
  console.log("chosen variation is " + chosenVar);
  variation = chosenVar;
  return variation;
}

Template.App_body.onRendered(function mainLayoutOnRendered() {
  Tracker.autorun(() => {
    document.title = FlowRouter.getRouteName();
  });
});