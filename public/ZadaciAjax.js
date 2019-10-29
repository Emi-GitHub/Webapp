var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){
        var ajax = new XMLHttpRequest();
        var postoji=true;
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) callbackFn(ajax.response);
            postoji=false;
        }
        if(postoji==true)({greska:'Već ste uputili zahtjev'});
        if(ajax.readyState == 4 && ajax.status == 404) {ajax.innerHTML = "greska";}
        return {
            dajXML:function(){ 
                ajax.open("get", "http://localhost:8080/zadaci", true);
                ajax.timeout=2000;
                ajax.ontimeout=function(e){};
                ajax.setRequestHeader('Accept','application/xml');
                if(postoji==false) ajax.send();
            },
            dajCSV:function(){
                ajax.open("get", "http://localhost:8080/zadaci", true);
                ajax.timeout=2000;
                ajax.ontimeout=function(e){};
                ajax.setRequestHeader('Accept','text/csv');
                if(postoji==false) ajax.send();
            },
            dajJSON:function(){
                ajax.open("get", "http://localhost:8080/zadaci", true);
                ajax.timeout=2000;
                ajax.ontimeout=function(e){};
                ajax.setRequestHeader('Accept','application/json');
                if(postoji==false) ajax.send();
            }
        }
    }
return konstruktor;
}());

module.exports=ZadaciAjax;