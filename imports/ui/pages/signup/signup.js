import './signup.html';

Template.App_signup.events({
  "submit #signupForm"(event) {
    event.preventDefault();
    let email = $("#emailInput").val();
    let password = $("#passwordInput").val();
    let passConfirm = $("#passwordConfirmInput").val();
    let name = $("#nameInput").val();

    if (password != passConfirm) {
      alert("u scrub the passwords dont match");
    }

    // TODO validate email here
    Accounts.createUser({
      email: email,
      password: password,
      profile: {name: name}
    }, function(error) {
      if (error) {
        // TODO better error message
        alert("error with account!")
        console.log(error);
      } else {
        console.log("signup success")
        FlowRouter.go("/");
      }
    })
  }
})
