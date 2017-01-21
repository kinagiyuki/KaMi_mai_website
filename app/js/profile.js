initalizeFirebase();
var frag_uploadPhoto = false;

var displayPhotoURL="";
firebase.auth().onAuthStateChanged(function(user) {
	if(user){
		displayPhotoURL=user.photoURL;
		if(displayPhotoURL!=null)
			{document.getElementById("displayPhoto").src = displayPhotoURL;}
		else
			{document.getElementById("displayPhoto").src = "img/default_icon.png";}
	}
});

var uid = localStorage.getItem("_uid");
var displayUsername="";
var displayMainame="";
var displayRating="";
var displayIsAdmin=false;
var displayMissionRecord={};
var displayEmail="";
firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
	displayUsername = snapshot.val().username;
	displayMainame = snapshot.val().maiName;
	displayRating = snapshot.val().rating;
	displayIsAdmin = snapshot.val().isAdmin;
	displayMissionRecord = snapshot.val().missionRecord;
	displayEmail = snapshot.val().email;
	document.getElementById("displayUsername").value = displayUsername;
	document.getElementById("displayMainame").value = displayMainame;
	document.getElementById("displayRating").value = displayRating;
});

function uploadIcon()
{
	var photoFile = document.getElementById("iconUpload");
	if(photoFile.files.length>1)
		{alert("Only one image can be uploaded!");return;}
	else if(photoFile.files.length<=0)
		{alert("No file is selected!");return;}
	var ext = photoFile.value.match(/\.([^\.]+)$/)[1];
	if(ext!='jpg' && ext!='bmp' && ext!='png' && ext!='git')
		{alert("Only photo (jpg, png, bmp, gif) is accepted!");return;}
	console.log(photoFile.files[0].name);
	var fileToUpload = photoFile.files[0];

	var storageRef = firebase.storage().ref();
	var uploadTask = storageRef.child('images/' + uid + '/icon.jpg').put(fileToUpload);
	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
	  function(snapshot) {
	    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
	    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    console.log('Upload is ' + progress + '% done');
	    switch (snapshot.state) {
	      case firebase.storage.TaskState.PAUSED: // or 'paused'
	        console.log('Upload is paused');
	        break;
	      case firebase.storage.TaskState.RUNNING: // or 'running'
	        console.log('Upload is running');
	        break;
	    }
	  }, function(error) {
	  switch (error.code) {
	    case 'storage/unauthorized':
	      // User doesn't have permission to access the object
	      break;

	    case 'storage/canceled':
	      // User canceled the upload
	      break;

	    case 'storage/unknown':
	      // Unknown error occurred, inspect error.serverResponse
	      break;
	  }
	}, function() {
	  // Upload completed successfully, now we can get the download URL
	  var downloadURL = uploadTask.snapshot.downloadURL;
	  console.log(downloadURL);
	  firebase.auth().onAuthStateChanged(function(user) {
			if(user){
				user.updateProfile({
				  photoURL: downloadURL
				}).then(function() {
				  // Update successful.
				  frag_uploadPhoto = true;
				  updateInfo();
				}, function(error) {
				  // An error happened.
				});
			}
		});
	  document.getElementById("displayPhoto").src = downloadURL + new Date().getTime();
	});
}
console.log(frag_uploadPhoto);
function updateInfo()
{
	var newUsername = document.getElementById("displayUsername").value;
	var newMainame = document.getElementById("displayMainame").value;
	var newRating = document.getElementById("displayRating").value;
	if(newUsername == displayUsername && newMainame == displayMainame && newRating == displayRating && frag_uploadPhoto==false)
		{alert("Saved.");return;}
	var updateData = {
		username: newUsername,
		maiName: newMainame,
		rating: newRating,
		email: displayEmail,
		isAdmin: displayIsAdmin,
		missionRecord: displayMissionRecord,
		photoURL: ""
	};
	firebase.auth().onAuthStateChanged(function(user) {
		if(user){
			user.updateProfile({
				displayName: newUsername
			}).then(function() {
				  // Update successful.
				updateData.photoURL = user.photoURL;
				var update = {};
				update['users/' + uid] = updateData;
				firebase.database().ref().update(update);
				alert("Saved.");
				location.reload();
			}, function(error) {
				  // An error happened.
			});
		}
	});
}

/*window.onload = function() {

	document.getElementById("click_to_upload").onclick = iconUpload;
};*/