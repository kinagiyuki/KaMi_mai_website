var title=new String();
title+="<div class=\"row\"><div class=\"col-md-6 col-lg-6 col-sm-6 col-xs-6\"><img class=\"pull-right img-responsive\" src=\"img/logo_maimai.png\"></div>"
title+="<div class=\"col-md-6 col-lg-6 col-sm-6 col-xs-6\"><div class=\"brand\">Team KaMi</div>";
title+="<div class=\"address-bar\">Koakari is bigbig</div></div></div>";
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
//content+="<li><a href=\"blog.html\">Blog</a></li>";
//content+="<li><a href=\"contact.html\">Contact</a></li>";
content+="</ul></div>";
//.navbar-collapse
content+="</div>";
//.container
content+="</nav>";

document.getElementById("JS_title").innerHTML = title;
document.getElementById("JS_navigate").innerHTML = content;