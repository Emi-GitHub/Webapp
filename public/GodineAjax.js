var GodineAjax = (function(){
    var konstruktor = function(divSadrzaj){ 
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var novo=JSON.parse(xhttp.responseText);
                for(var i=0;i<novo.length-1; i++){
                   var kreiraj = document.createElement("div");
                    kreiraj.setAttribute("id", "godina");

	            	var god=document.createElement("p");
	            	god.innerHTML=novo[i].nazivGod;
	            	var vj=document.createElement("p");
	            	vj.innerHTML=novo[i].nazivRepVje;
	            	var sp=document.createElement("p");
                    sp.innerHTML=novo[i].nazivRepSpi;
                    
	            	kreiraj.appendChild(god);
	            	kreiraj.appendChild(vj);
	            	kreiraj.appendChild(sp);
                    divSadrzaj.appendChild(kreiraj);
                }
            }
            else if(xhttp.readyState == 4 && xhttp.status == 404) {divSadrzaj.innerHTML = "greska";}
        }
            
            xhttp.open("GET", "http://localhost:8080/godine", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send();
            return {
                osvjezi:function(){ //kopirano iz konstruktora
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            var novo=JSON.parse(xhttp.responseText);
                            for(var i=0;i<novo.length-1; i++){
                               var kreiraj = document.createElement("div");
                                kreiraj.setAttribute("id", "godina");
            
                                var god=document.createElement("p");
                                god.innerHTML=novo[i].nazivGod;
                                var vj=document.createElement("p");
                                vj.innerHTML=novo[i].nazivRepVje;
                                var sp=document.createElement("p");
                                sp.innerHTML=novo[i].nazivRepSpi;
                                
                                kreiraj.appendChild(god);
                                kreiraj.appendChild(vj);
                                kreiraj.appendChild(sp);
                                divSadrzaj.appendChild(kreiraj);
                            }
                        }
                        else if(xhttp.readyState == 4 && xhttp.status == 404) {divSadrzaj.innerHTML = "greska";}}
                        
                        xhttp.open("GET", "http://localhost:8080/godine", true);
                        xhttp.setRequestHeader("Content-Type", "application/json");
                        xhttp.send(); 
                }    
        }         
    }
    return konstruktor;
}());

module.exports=GodineAjax;
        