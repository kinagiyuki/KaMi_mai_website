initalizeFirebase();
var database = firebase.database();

function addNameToUserAndGetUID(name)
{
	firebase.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				user.updateProfile({
				  displayName: name,
				  photoURL: ""
				}).then(function() {
				  // Update successful.
				  alert("Update successful");
				}, function(error) {
				  // An error happened.
				  alert("Something happened");
				});
				//uid = user.uid;
				localStorage.setItem('_uid', user.uid);
				console.log("User Information updated");
			}
			else{alert("User has not been logged-in.");}
			});
}

function writeUserData(userId, name, email, mainame, RT) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    maiName: mainame,
    rating: RT,
    missionRecord: "",
    isAdmin: false
  });
}

var signUp = function() {
	var Email = document.getElementById('userEmail').value;
	var Password = document.getElementById('userPassword').value;
	var confirmPassword = document.getElementById('confirmPassword').value;
	var Name = document.getElementById('userName').value;
	var maiName = document.getElementById('maiName').value;
	var maiRT = document.getElementById('maiRating').value;
	var uid="";
	console.log(Email);
	console.log(Password);
	console.log(Name);
	console.log(maiName);
	console.log(maiRT);
	if(Email=="" || Password=="" || Name=="" || maiName=="" || maiRT=="")
	{
		alert("There's something missing.")
		return;
	}
	if(Password!=confirmPassword)
	{
		alert("Two passwords are different!");
		return;
	}
	firebase.auth().createUserWithEmailAndPassword(Email, Password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert(errorMessage);
	});
	console.log("Created");
	setTimeout(addNameToUserAndGetUID(Name),3500);
	uid = localStorage.getItem('_uid');
	console.log(uid);
	setTimeout(writeUserData(uid, Name, Email, maiName, maiRT), 3500);
};

window.onload = function() {

	document.getElementById("click_to_signup").onclick = signUp;
}
// inject firebase service
/*var app = angular.module("signupApp", ["firebase"]); 
app.controller("signupCtrl", 

	// User information
	function($scope, $firebaseArray) {

		$scope.input = {
			uid: "",
			maiName: "",
			rating: "",
			missionRecord: "",
			isAdmin: false
		};

		$scope.userEmail="";
		$scope.userPassword="";
		$scope.confirmPassword="";
		$scope.userName="";

		// sync with firebaseArray
		var ref = firebase.database().ref("users");
		$scope.userInfos = $firebaseArray(ref);

		$scope.regUser = function() {
			console.log($scope.userEmail);
			console.log($scope.userPassword);
			if($scope.userEmail!="" && $scope.userPassword!="")
			{
				firebase.auth().createUserWithEmailAndPassword($scope.userEmail, $scope.userPassword).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  alert(errorMessage);
				  console.log("Created");
				});
			}

			firebase.auth().signInWithEmailAndPassword($scope.userEmail, $scope.userPassword).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  alert(errorMessage);
			  console.log("Logged in");
			});

			firebase.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				user.updateProfile({
				  displayName: $scope.userName,
				  photoURL: ""
				}).then(function() {
				  // Update successful.
				}, function(error) {
				  // An error happened.
				  alert("Something happened");
				});
				$scope.input.uid = user.uid;
				console.log("User Information updated");
			}
			else{alert("User has not been reged.");}
			});
			if($scope.input.maiName!="" && $scope.input.rating!="" && $scope.input.uid!="")
			{
				$scope.userInfos.$add($scope.input);
			}
		};
	}
);*/
