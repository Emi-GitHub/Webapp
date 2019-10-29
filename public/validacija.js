var Validacija=(function(){
    
    var konstruktor=function(divElementPoruke){
        divElementPoruke.innerHTML="Sljedeća polja nisu validna: ";
        return{
             ime:function(inputElement){
                //var reg=/^[A-Z]{1}[a-z ']{1,} ([\s -]{1}[A-Z]{1}[a-z ']{1, })? ([\s -]{1}[A-Z]{1}[a-z ']{1,})? ([\s -]{1}[A-Z]{1}[a-z ']{1,})?$/; 
				//var reg=/^[A-Z][a-z]{1,}(([ '-])?[A-Z][a-z]{1,}){0,3}$/;
				var reg=/^[A-Z][a-z]{1,}([- ](['])?[A-Z][a-z]{1,})? ([- ](['])?[A-Z][a-z]{1,})? ([- ](['])?[A-Z][a-z]{1,})?$/;
				if (!reg.test(inputElement)) {
					divElementPoruke.innerHTML+="ime ";
					document.getElementById("addS").style.color=orangered; 
					document.getElementById("zad").style.color=orangered; 
				}
             },
             godina:function(inputElement){
                var reg = /^20\d\d\/20\d\d$/g;
                if(reg.test(inputElement)){
                    var brojevi=String(inputElement).split('/');
                    var broj1=Number(brojevi[0]);
                    var broj2=Number(brojevi[1]);
                    return broj2==broj1+1;
                }
                divElementPoruke.innerHTML+="godina ";
             },
             repozitorij:function(inputElement,regex){
                 if(regex=null){
                     regex=/^wt18[A-Z]{2}[0-9]{5}$/;
                 }
				if(!regex.test(inputElement)){
					divElementPoruke.innerHTML+="repozitorij ";
				}
             },
             index:function(inputElement){ //jel ukljucuje 20?
                var reg=/^1[4-9]{1}[0-9]{3}$/;
				if(!reg.test(inputElement)){
					divElementPoruke.innerHTML+="index ";
					document.getElementById("addS1").style.color=orangered;
				}
             }, 
             naziv:function(inputElement){
                 //var reg=/^([A-Za-z]{1,}[\ \/ - " ' ! \? : ; ,]{0,}[0-9a-z]{1,}){3,}$/;
				 //var reg=/^[A-Za-z]{1,}[A-Za-z \ \/ - " ' ! \? : ; , 0-9a-z]{1,}[0-9a-z]{1,}$/;
				 var reg=/^[A-Za-z]{1,}(A-Z|a-z|\|\/|-|"|'|!|\?|:|;|,|0-9a-z){1,}[0-9a-z]{1,}$/;
                 if(!reg.test(inputElement)){
					 divElementPoruke.innerHTML+="naziv ";
					document.getElementById("addZ").style.color=orangered;
					document.getElementsByName("addG2").style.color=orangered;
					document.getElementsByName("addG3").style.color=orangered;
					document.getElementById("addV").style.color=orangered;
					document.getElementById("addG1").style.color=orangered;
				 }
             },
             password:function(inputElement){
                var imaVeliko=false;
                var imaMalo=false;
                var imaBroj=false;
                var brojacVeliko=0;
                var brojacMalo=0;
                var brojacBroj=0;
                var regVeliko= /[A-Z]/;
                var regMalo=/[a-z]/;
                var regBroj=/[0-9]/;

                var niz=inputElement.split("");
                for(var i=0;i<niz.length;i++){
                    if(regVeliko.test(niz[i])) brojacVeliko++;
                    if(regMalo.test(niz[i])) brojacMalo++;
                    if(regBroj.test(niz[i])) brojacBroj++;
                }
                if(brojacVeliko>=2) imaVeliko=true;
                if(brojacMalo>=2) imaMalo=true;
                if(brojacBroj>=2) imaBroj=true;
                //provjera da li se nalazi neki drugi znak osim ova tri
                for(var i=0;i<niz.length;i++){
                    if(regVeliko.test(niz[i])==false && 
                       regMalo.test(niz[i])==false &&
                       regBroj.test(niz[i])==false) return false;
                }
                if(niz.length<8) return false;
				
				if (!(imaVeliko&&imaMalo&&imaBroj)) {
					divElementPoruke.innerHTML+="password ";
					document.getElementById("pass").style.color=orangered; 
				}
             },
             url:function(inputElement){ 
                var reg=/^(http|https|ftp|ssh):\/\/[A-Za-z]{1,}([.][A-Za-z]{1,}){0,} ( \/[A-Za-z]{1,}(\/[A-Za-z]{1,}){0,})? ( \?[a-z0-9]{1,}([-]{0,}[a-z0-9]{1,}){0,}=[a-z0-9]{1,}([-]{0,}[a-z0-9]{1,}){0,}&&[a-z0-9]{1,}([-]{0,}[a-z0-9]{1,}){0,}=[a-z0-9]{1,}([-]{0,}[a-z0-9]{1,}){0,})? $/
                if(!reg.test(inputElement)){
					divElementPoruke.innerHTML+="url ";
				}
			},
		}
    }
    return konstruktor;
}());
