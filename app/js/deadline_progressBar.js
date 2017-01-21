var today = new Date();
var startdate = new Date(2017,0,20);
var deadline = new Date(2017,1,2);
var dateDifference = parseInt((deadline-today)/(24*3600*1000));
var period = parseInt((deadline-startdate)/(24*3600*1000));
var percent = parseInt((period-dateDifference)/period*100);

var info = "";
info+= "<h4><span class=\"glyphicon glyphicon-calendar\" aria-hidden=\"true\"></span> : " + startdate.toDateString() + " ~ " + deadline.toDateString() + "</h4>";
info+= "<div class=\"row\"><div class=\"col-xs-6\"><div class=\"progress\"><div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"" + (period-dateDifference) + "\" aria-valuemin=\"0\" aria-valuemax=\"" + period + "\" style=\"width: " + percent + "%\">";
if(dateDifference==1)
{
	info+= dateDifference + " day left</div></div></div></div>";
}
else
{
	info+= dateDifference + " days left</div></div></div></div>";
}
document.getElementById("deadline").innerHTML = info;