var missionName = getURLParameter("m");
console.log(missionName);


var url = "../src/" + missionName + ".txt";
console.log(url);

var jsonFile = new XMLHttpRequest();
    jsonFile.open("GET",url,true);
    jsonFile.send();

    jsonFile.onreadystatechange = function(){
                                              if (jsonFile.readyState== 4 && jsonFile.status == 200){
                                                document.getElementById("MIS_content").innerHTML = jsonFile.responseText;
                                              }
                                            }