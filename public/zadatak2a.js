var zadatak2a=(function(){
    var konstruktor=function(){
        return{
            years: function(param){
                var xhttp=new XMLHttpRequest();
                xhttp.onreadystatechange=function(){
                    if(xhttp.status==200 && xhttp.readyState==4){
                        var novo=JSON.parse(xhttp.responseText);
                        for(var i=0;i<novo.length; i++){
                            var god=document.createElement("option");
                            //god.innerHTML=novo[i].nazivGod;
                            god.value=novo[i].id; //ovo je value
                            god.innerHTML=novo[i].nazivGod; //ok?
                            param.appendChild(god);
                        }
                    }
                    else if(xhttp.status == 404) {console.log("greska!");}
                }
                xhttp.open("GET", "http://localhost:8080/godine",true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send();
            },
            vjezbe: function(param1){
                var xhttp=new XMLHttpRequest();
                xhttp.onreadystatechange=function(){
                    if(xhttp.status==200 && xhttp.readyState==4){
                        var novo=JSON.parse(xhttp.responseText);
                        for(var i=0;i<novo.length; i++){
                            var god=document.createElement("option");
                            //god.innerHTML=novo[i].naziv;
                            god.value=novo[i].id; //ovo je value
                            god.innerHTML=novo[i].naziv; //ok?
                            param1.appendChild(god);
                        }
                    }
                    else if(xhttp.status == 404) {console.log("greska!");}
                }
                xhttp.open("GET", "http://localhost:8080/vjezbe",true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send();
            },
            zadaci: function(selectZad, idVjezbe){
                console.log(idVjezbe);
                var xhttp=new XMLHttpRequest();
                xhttp.onreadystatechange=function(){
                    if(xhttp.status==200 && xhttp.readyState==4){
                        var novo=JSON.parse(xhttp.responseText);
                        selectZad.innerHTML="";
                        for(var i=0;i<novo.length; i++){
                            var god=document.createElement("option");
                            god.value=novo[i].id; 
                            god.innerHTML=novo[i].naziv; 
                            selectZad.appendChild(god); 
                        }
                    }
                    else if(xhttp.status == 404) {console.log("greska!");}
                }
                xhttp.open("GET", "http://localhost:8080/zad/?id="+idVjezbe,true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send();
            }
            
        }
    }
    return konstruktor;
}());