var today = new Date();
var startdate = new Date(2016,11,22);
var deadline = new Date(2017,0,5);
var dateDifference = parseInt((deadline-today)/(24*3600*1000));
var period = parseInt((deadline-startdate)/(24*3600*1000));
var percent = parseInt((period-dateDifference)/period*100);

var content = "";
content+= "<h4><span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span> : " + startdate.toDateString() + " ~ " + deadline.toDateString() + "</h4>";
content+= "<div class=\"row\"><div class=\"col-xs-6\"><div class=\"progress\"><div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"" + (period-dateDifference) + "\" aria-valuemin=\"0\" aria-valuemax=\"" + period + "\" style=\"width: " + percent + "%\">";
if(dateDifference==1)
{
	content+= dateDifference + " day left</div></div></div></div>";
}
else
{
	content+= dateDifference + " days left</div></div></div></div>";
}
document.getElementById("deadline").innerHTML = content;