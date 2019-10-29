function emina(){
	var mojDiv=document.getElementById("mojDivPoruke");
	var inputNaziv=document.getElementById("zad");
	var validacija=new Validacija(mojDiv);
	validacija.ime(inputNaziv);
	return true;
}