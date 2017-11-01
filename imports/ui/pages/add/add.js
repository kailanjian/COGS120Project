import './add.html';

//import '../../components/hello/hello.js';
//import '../../components/info/info.js';
import '../../components/nav/nav.js';


Template.camButton.events({
    'click .camButton': function(e){
        e.preventDefault();
        console.log("pressed bois");
        FlowRouter.go('/camera')
    }
});

$("#first").click(function () {
    $("#uploadfile").click();
});