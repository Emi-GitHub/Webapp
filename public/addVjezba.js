//zadatak 2a
function zad2a(){
	var godine= new zadatak2a();
	godine.years(document.getElementsByName("sGodine")[0]);
	godine.vjezbe(document.getElementsByName("sVjezbe")[0]);
	godine.years(document.getElementsByName("sGodine")[1]);
	godine.vjezbe(document.getElementsByName("sVjezbe")[1]);
	
}

//zadatak 2c
function zad2c(){
	var zad=new zadatak2a();
	zad.zadaci(document.getElementsByName('sZadatak')[0], document.getElementsByName('sVjezbe')[1].value);
}
function posalji(){
	console.log("LAAAA");
	var vj=document.getElementsByName('sVjezbe')[1].value;
	
	var zad=document.getElementsByName('sZadatak')[0].value;
	var ajax = new XMLHttpRequest();
    ajax.open("POST","http://localhost:8080/vjezba/"+vj+"/zadatak",true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("sZadatak="+zad);
}

//zadatak 3
function zad3(){
	var god=new zadatak2a();
	god.years(document.getElementsByName("sGodine")[0]);
}



function emina(){
	var mojDiv=document.getElementById("mojDivPoruke");
	var inputNaziv=document.getElementById("addV");
	var validacija=new Validacija(mojDiv);
	validacija.naziv(inputNaziv);
	return true;
}

