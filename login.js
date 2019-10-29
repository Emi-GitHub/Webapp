function emina(){
	var mojDiv=document.getElementById("mojDivPoruke");
	//var inputPassword = document.querySelector('#login input[id="pass"]').value;
	//validacija.password(inputPassword);
	var inputPassword=document.getElementById("pass");
	var validacija=new Validacija(mojDiv);
	validacija.password(inputPassword);
	return true;
}