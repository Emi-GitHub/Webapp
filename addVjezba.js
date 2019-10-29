function emina(){
	var mojDiv=document.getElementById("mojDivPoruke");
	var inputNaziv=document.getElementById("addV");
	var validacija=new Validacija(mojDiv);
	validacija.naziv(inputNaziv);
	return true;
}