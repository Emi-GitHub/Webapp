var glavniDiv= document.getElementById("glavniSadrzaj");
//var xhttp = new GodineAjax(glavniDiv);
//xhttp.osvjezi();

window.onload = function() {
	var div = document.getElementById("glavniSadrzaj");
	var xhttp = new GodineAjax(div);
	xhttp.osvjezi();
}

function emina1(){
	var mojDiv=document.getElementById("mojDivPoruke1");
	var inputNaziv1=document.getElementById("addG1");
	var validacija=new Validacija(mojDiv);
	validacija.naziv(inputNaziv1);
	return true;
}
function emina2(){
	var mojDiv=document.getElementsById("mojDivPoruke2");
	var inputNaziv2=document.getElementById("addG2");
	var validacija=new Validacija(mojDiv);
	validacija.naziv(inputNaziv2);
	return true;
}
function emina3(){
	var mojDiv=document.getElementsById("mojDivPoruke3");
	var inputNaziv3=document.getElementsById("addG3");
	var validacija=new Validacija(mojDiv);
	validacija.naziv(inputNaziv3);
	return true;
}

