//Useful function
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

//Initialize Firebase
function initalizeFirebase() {
	if (firebase.apps.length === 0) {
		  var config = {
		    apiKey: "AIzaSyCNDu-fjb9fNCl8tUlsfQqZ5je7pd2AAbU",
		    authDomain: "teamkami-maimai.firebaseapp.com",
		    databaseURL: "https://teamkami-maimai.firebaseio.com",
		    storageBucket: "teamkami-maimai.appspot.com",
		    messagingSenderId: "26088081835"
		  };
		  firebase.initializeApp(config);
	}
}

initalizeFirebase();

var Admin = localStorage.getItem("_admin");

//Title
var title="";
/*title+="<div class=\"row\"><div class=\"col-md-6 col-lg-6 col-sm-6 col-xs-6\"><a href=\"index.html\"><img class=\"pull-right img-responsive\" src=\"img/logo_maimai.png\"></a></div>"
title+="<div class=\"col-md-6 col-lg-6 col-sm-6 col-xs-6\"><div class=\"brand\">Team KaMi</div>";
title+="<div class=\"address-bar\">Koakari is bigbig</div></div></div>";*/
title+="<a href=\"index.html\"><img class=\"img-responsive center-block\" src=\"img/KaMi_logo.png\"></a>";
//Navigation bar
var content="";
content+="<nav class=\"navbar navbar-default\" role=\"navigation\">";
content+="<div class=\"container\">";
//Brand and toggle get grouped for better mobile display
content+="<div class=\"navbar-header\">";
content+="<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">";
content+="<span class=\"sr-only\">Toggle navigation</span>";
content+="<span class=\"icon-bar\"></span>";
content+="<span class=\"icon-bar\"></span>";
content+="<span class=\"icon-bar\"></span>";
content+="</button>";
//navbar-brand is hidden on larger screens, but visible when the menu is collapsed
content+="<a class=\"navbar-brand\" href=\"index.html\">Team KaMi</a></div>";
//Collect the nav links, forms, and other content for toggling
content+="<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">";
content+="<ul class=\"nav navbar-nav\">";
content+="<li><a href=\"index.html\">Home</a></li>";
content+="<li><a href=\"info.html\">Info</a></li>";
content+="<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Mission<span class=\"caret\"></span></a>";
content+="<ul class=\"dropdown-menu\">";
content+="<li><a href=\"previous_mission.html?m=m1\">Murasaki week2/3</a></li>";
content+="<li><a href=\"previous_mission.html?m=m2\">Murasaki week4/5</a></li>";
content+="</ul></li>";
firebase.auth().onAuthStateChanged(function(user) {
	if(user)
	{
		console.log("Logged in");
		console.log(Admin);
		if(Admin=='true')
			{content+="<li><a href=\"admin.html\">Admin</a></li>";}
		content+="<li><a href=\"profile.html\">Profile</a></li>";
		content+="</ul>";
		content+="<p class=\"navbar-text\">Signed in as " + user.displayName + "</p>";
		content+="<button type=\"button\" class=\"btn btn-default navbar-btn\" id=\"click_to_logout\" onclick=\"logOut()\">Logout</button>";
		//.navbar-collapse
		content+="</div></div>";
		//.container
		content+="</nav>";
		document.getElementById("JS_navigate").innerHTML = content;
	}
	else
	{
		console.log("Logged out");
		content+="<li><a href=\"sign_up.html\">Sign-up</a></li>";
		content+="</ul>";
		content+="<form class=\"navbar-form navbar-right\">";
		content+="<div class=\"form-group\"><input type=\"email\" class=\"form-control\" placeholder=\"Email\" id=\"loginEmail\"></div>　";
		content+="<div class=\"form-group\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" id=\"loginPassword\"></div>　";
		content+="<button type=\"button\" class=\"btn btn-default navbar-btn\" id=\"click_to_login\" onclick=\"logIn()\">Login</button></form>";
		//.navbar-collapse
		content+="</div></div>";
		//.container
		content+="</nav>";
		document.getElementById("JS_navigate").innerHTML = content;	

		document.getElementById("loginEmail")
		    .addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode == 13) {
		        document.getElementById("click_to_login").click();
		    }
		});

		document.getElementById("loginPassword")
		    .addEventListener("keyup", function(event) {
		    event.preventDefault();
		    if (event.keyCode == 13) {
		        document.getElementById("click_to_login").click();
		    }
		});
	}
});
//content+="<li><a href=\"blog.html\">Blog</a></li>";
//content+="<li><a href=\"contact.html\">Contact</a></li>";
/*content+="</ul>";
if(user)
{
	content+="<p class=\"navbar-text\">Signed in as " + user.displayName + "</p>";
	content+="<button type=\"button\" class=\"btn btn-default navbar-btn\" id=\"click_to_logout\" onclick=\"logOut()\">Logout</button></form>";
}
else
{
	content+="<form class=\"navbar-form navbar-right\">";
	content+="<div class=\"form-group\"><input type=\"email\" class=\"form-control\" placeholder=\"Email\" id=\"loginEmail\"></div>　";
	content+="<div class=\"form-group\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" id=\"loginPassword\"></div>　";
	content+="<button type=\"button\" class=\"btn btn-default navbar-btn\" id=\"click_to_login\" onclick=\"logIn()\">Login</button></form>";
}
//.navbar-collapse
content+="</div></div>";
//.container
content+="</nav>";*/

//Footer
var footer="";
footer+="<footer><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12 text-center\">";
footer+="<img src=\"img/logo_sega.png\"><small>v.0.07</small>";
footer+="</div></div></div></footer>";

document.getElementById("JS_title").innerHTML = title;
//document.getElementById("JS_navigate").innerHTML = content;
document.getElementById("JS_footer").innerHTML = footer;


function logOut() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  if(localStorage.getItem('_uid')!=null)
	  	localStorage.removeItem('_uid');
	  if(localStorage.getItem('_username')!=null)
	  	localStorage.removeItem('_username');
	  if(localStorage.getItem('_admin')!=null)
	  	localStorage.removeItem('_admin');
	  window.location.href = "index.html";
	}, function(error) {
	  // An error happened.
	  alert("Something goes wrong");
	});
}

function logIn() {
	var Email = document.getElementById("loginEmail").value;
	var Password = document.getElementById("loginPassword").value;
	firebase.auth().signInWithEmailAndPassword(Email, Password).then(function(user) {

		firebase.database().ref('users/' + user.uid).once('value').then(function(snapshot) {
		  var isAdmin = snapshot.val().isAdmin;
		  localStorage.setItem('_uid', user.uid);
		  localStorage.setItem('_username', user.displayName);
		  localStorage.setItem('_admin', isAdmin);
		  window.location.href = "index.html";
		});

	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorCode);
	  alert(errorMessage);
	});
}

/*window.onload = function() {
	document.getElementById("click_to_logout").onclick = logOut;
	document.getElementById("click_to_login").onclick = logIn;
}*/