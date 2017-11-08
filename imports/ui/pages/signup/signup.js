import './signup.html';

Template.App_signup.events({
  "submit #signupForm"(event) {
    event.preventDefault();
    let email = $("#emailInput").val();
    let password = $("#passwordInput").val();
    let passConfirm = $("#passwordConfirmInput").val();
    let name = $("#nameInput").val();

    if (password != passConfirm) {
      alert("Your passwords did not match!");
      return;
    }
    // TODO validate email here
    Accounts.createUser({
      email: email,
      password: password,
      profile: {name: name}
    }, function(error) {
      if (error) {
        // TODO better error message
        alert("Error with one of the fields!");
        console.log(error);
      } else {
        console.log("Signup was a success!")
        FlowRouter.go("/");
      }
    })
  }
})

Template.App_signup.events({
  "click #cancelButton"(event){
    event.preventDefault();
    FlowRouter.go("/login")
  }
})