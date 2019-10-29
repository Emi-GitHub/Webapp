var tabela
function dodajTabelu(){
	
	var mojDiv=document.getElementById("addtable");
	var brojZadataka=parseInt(document.getElementById("zadaciKonstruktor").value); 
	
	tabela= new CommitTabela(mojDiv,brojZadataka);

}

function dodajCommit(){ 
	
	var rbZadatka=parseInt(document.getElementById("broj").value);
	var url=document.getElementById("link").value;
	tabela.dodajCommit(rbZadatka,url);
}

function obrisiCommit(){ 
	
	var rbZadatka=parseInt(document.getElementById("brojDelete").value);	
	var rbCommita=parseInt(document.getElementById("brojDelete1").value);
	tabela.obrisiCommit(rbZadatka,rbCommita);
}

function editujCommit(){ 
	
	var rbZadatka=parseInt(document.getElementById("brojEdit").value);	
	var rbCommita=parseInt(document.getElementById("brojEdit1").value);
	var url=document.getElementById("linkEdit").value; 
	tabela.editujCommit(rbZadatka,rbCommita,url);
}
