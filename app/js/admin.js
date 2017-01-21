function assignMission() {
	// body...
	var missionTitle = document.getElementById("missionTitle").value;
	var startDate = document.getElementById("missionStartDate").value;
	var endDate = document.getElementById("missionEndDate").value;
	var trackNo = document.getElementById("trackNo").value;
	console.log(missionTitle);
	console.log(startDate);
	console.log(endDate);
	console.log(trackNo);
	var missionTracks = [];
	for(var i=0;i<trackNo;i++)
	{
		var trackTitle="";
		missionTracks.push(trackTitle);
	}
	console.log(missionTracks);
	var startDate_string = startDate.toString();
	var endDate_string = endDate.toString();
	firebase.database().ref('mission/').set({
	    currentMission: missionTitle
	});
	firebase.database().ref('mission/' + missionTitle).set({
	    startDate: startDate_string,
	    endDate: endDate_string,
	    trackNo: trackNo,
	    missionTracks: missionTracks,
	    playersRecord: ""
	});
	alert("Done!");
}