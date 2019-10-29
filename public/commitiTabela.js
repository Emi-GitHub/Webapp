
var CommitTabela=(function(){	
		
		var konstruktor=function(divElement,brojZadataka){
			var table = document.createElement('table');
			table.setAttribute("id", "myTable");
			var brojZadataka=parseInt(document.getElementById("zadaciKonstruktor").value); 
			table.innerHTML = "<tr><th>Zadaci</th><th colspan=1000>Commiti</th></tr>";
			//var divElement=document.getElementById("addtable").appendChild(table); 
			var tbdy = document.createElement('tbody');
			for(var i=0;i<brojZadataka;i++){
				var tr=document.createElement('tr');
					for(var j=0;j<1;j++){
						var td=document.createElement('td');
						if(j==0)td.appendChild(document.createTextNode('Zadatak '+(i+1)));
						tr.appendChild(td);
					}
				tbdy.appendChild(tr);
			}
			table.appendChild(tbdy);
			divElement.appendChild(table); 
		
				
		//DODAJ
		return{
		dodajCommit:function(rbZadatka,url){
		//function dodajCommit(rbZadatka,url) {
			//rbZadatka=parseInt(document.getElementById("broj").value);
			var brojCelija=table.rows[(rbZadatka+1)].cells.length;
			var firstRow = document.getElementById("myTable").rows[rbZadatka+1];	
			rbZadatka=parseInt(document.getElementById("broj").value);
			var x = firstRow.insertCell(-1); 
			//var url=document.getElementById("link").value; 
			x.innerHTML = "<a href="+url+">"+brojCelija+"</a>"; 
		},
		//OBRIŠI
		obrisiCommit:function(rbZadatka,rbCommita){
		//function obrisiCommit(rbZadatka,rbCommita){
			//var rbZadatka=parseInt(document.getElementById("brojDelete").value);	
			//var rbCommita=parseInt(document.getElementById("brojDelete1").value);
			if(rbZadatka> (table.rows.length-1) || rbZadatka<0)return -1;
			if(rbCommita > (table.rows[(rbZadatka+1)].cells.length-1) || rbCommita<0)return -1;	
		    var row = document.getElementById("myTable").rows[rbZadatka+1]; 
            row.deleteCell(rbCommita+1); 
		},
		//EDITUJ
		editujCommit:function(rbZadatka,rbCommita,url){
		//function editujCommit(rbZadatka,rbCommita,url){
			//var rbZadatka=parseInt(document.getElementById("brojEdit").value);	
			//var rbCommita=parseInt(document.getElementById("brojEdit1").value);
			if(rbZadatka> (table.rows.length-1) || rbZadatka<0)return -1;
			if(rbCommita > (table.rows[(rbZadatka+1)].cells.length-1) || rbCommita<0)return -1;	
			var x = document.getElementById("myTable").rows[rbZadatka+1].cells;
			//var url=document.getElementById("linkEdit").value; 
			x[rbCommita+1].innerHTML = "<a href="+url+">"+(rbCommita+1)+"</a>"; 
		}
		}
	}
	return konstruktor;
}());