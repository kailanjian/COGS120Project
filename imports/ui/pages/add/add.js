import './add.html';

//import '../../components/hello/hello.js';
//import '../../components/info/info.js';
import '../../components/nav/nav.js';


Template.myButton.events({
    'click #button': function(e){
        e.preventDefault();
        console.log("pressed bois");
        FlowRouter.go('/camera')
    
    }
});