import './login.html';

Template.App_login.events({
  "submit #loginForm"(event) {
    event.preventDefault();
    let email = $("#emailInput").val();
    let password = $("#passwordInput").val();

    // TODO validate email here

    Meteor.loginWithPassword({email: email}, password, function(error) {
      if (error) {
        alert("You're username/password is incorrect!");
        console.log(error);
      } else {
        FlowRouter.go("/")
      }
    });
  },
})
