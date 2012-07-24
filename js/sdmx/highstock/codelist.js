/*Script creado por Armando Humberto Cazarin Meza*/
/*Replicado en produccion Marzo de 2012*/

var CODELIST;
var AGENCY;

function hola(codelist,agency,servidor){    
    if(servidor=='http://www.sdmx.snieg.mx/sistemas/sdmx/')
        var url=servidor+'restsdmx/Codelist/'+agency+'/'+codelist+'/ALL?alt=json&callback=getcodelist';
    this.CODELIST=codelist;
    this.AGENCY=agency;
    bObj = new JSONscriptRequest(url); 
    bObj.buildScriptTag(); 
    bObj.addScriptTag();  
}

function getcodelist(code){
    var codelists=code.RegistryInterface.QueryStructureResponse['registry:CodeLists']['structure:CodeList'];
    if(codelists.length>1){
        $.each(codelists,function(i){
            if((CODELIST==codelists[i]['@id'])&&(AGENCY==codelists[i]['@agencyID'])){
                var total="Nombre del <em>Codelist</em> consultado:"+" "+codelists[i]['@id']+"<br/>"
                if(codelists[i]['structure:Name'].length>1)
                {
                    $.each(codelists[i]['structure:Name'],function(f,r){
                        total+="Descripci&oacute;n del <em>Codelist</em>:"+" "+[f]+": "+r['#text']+"<br/>"+"<br/>"
                    });
                    //total+="<table class="+"TdCenso"+">"
					total+="<table class="+"Pob_Tabla"+" "+"cellpadding="+"0"+" "+"cellspacing="+"0"+" " +"align="+"center"+" " +"border="+"0"+">"
                    total+="<tr  >"
                    total+="<th class="+"Pob_Th"+">"+"C&oacute;digo"+"</th>"
                    total+="<th class="+"Pob_Th"+">"+"Descripci&oacute;n"+"</th>"
                    total+="</tr>"
                }
                else{
                    total+="Descripci&oacute;n del <em>Codelist</em>:"+" "+codelists[i]['structure:Name']['#text']+"<br/>"+"<br/>"
//                    total+="<table class="+"TdCenso"+">";
total+="<table class="+"Pob_Tabla"+" "+"cellpadding="+"0"+" "+"cellspacing="+"0"+" " +"align="+"center"+" " +"border="+"0"+">"
                    total+="<tr >"
                    total+="<th class="+"Pob_Th"+">"+"C&oacute;digo"+"</th>"
                    total+="<th class="+"Pob_Th"+">"+"Descripci&oacute;n"+"</th>"
                    total+="</tr>"
                }
                $.each(codelists[i]['structure:Code'],function(k,s){
                    if(s['structure:Description'].length>1){
                        $.each(s['structure:Description'],function(m,p){
                            total+="<tr >"
                            total+="<td class="+"TdCenso"+">"+s['@value']+"</td>"
                            total+="<td class="+"TdCenso"+">"+p['#text']+"</td>"
                            total+="</tr>"
                        });
                        return ;
                    }
                    else{
                        total+="<tr >"
                        total+="<td class="+"TdCenso"+">"+s['@value']+"</td>"
                        total+="<td class="+"TdCenso"+">"+s['structure:Description']['#text']+"</td>"
                        total+="</tr>"
                    }
                });
                total+="</table>";
               /* var ScreenWidth=window.screen.width;
                var ScreenHeight=window.screen.height;
                var placementx=(ScreenWidth/2)-((400)/2);
                var placementy=(ScreenHeight/2)-((300+50)/2);
                var WinPop=window.open("CODELIST_INFO","","width=400,height=300,toolbar=0,location=0,directories=0,status=0,scrollbars=1,menubar=0,resizable=1,left="+placementx+",top="+placementy+",scre enX="+placementx+",screenY="+placementy+",");
                WinPop.document.write('<html>\n<head>\n</head>\n<body>'+total+'</body></html>');
                bObj.removeScriptTag(); */
				var caja2 = $('<div title="Codelist">'+total+'</div>');
                caja2.dialog();
                return false;
            }
            else 
                return
        });
    }
    else{
        if((CODELIST==codelists['@id'])&&(AGENCY==codelists['@agencyID'])){
            var total="Nombre del <em>Codelist</em> consultado:"+" "+codelists['@id']+"<br/>"
            if(codelists['structure:Name'].length>1)
            {
                $.each(codelists['structure:Name'],function(f,r){
                    total+="Descripci&oacute;n del <em>Codelist</em>:"+" "+[f]+": "+r['#text']+"<br/>"+"<br/>"
                });
//                total+="<table class="+"TdCenso"+">";
total+="<table class="+"Pob_Tabla"+" "+"cellpadding="+"0"+" " +"cellspacing="+"0"+" " +"align="+"center"+" " +"border="+"0"+">"
                total+="<tr>"
                total+="<th class="+"Pob_Th"+">"+"C&oacute;digo"+"</td>"
                total+="<th class="+"Pob_Th"+">"+"Descripci&oacute;n"+"</td>"
                total+="</tr>"
            }
            else{
                total+="Descripci&oacute;n del <em>Codelist</em>:"+" "+codelists['structure:Name']['#text']+"<br/>"+"<br/>"
//                total+="<table class="+"TdCenso"+">";
total+="<table class="+"Pob_Tabla"+" "+"cellpadding="+"0"+" "+"cellspacing="+"0"+" "+"align="+"center"+ " "+"border="+"0"+">"
                total+="<tr >"
                total+="<th class="+"Pob_Th"+">"+"C&oacute;digo"+"</th>"
                total+="<th class="+"Pob_Th"+">"+"Descripci&oacute;n"+"</th>"
                total+="</tr>"
            }
            if(codelists['structure:Code'].length>1)
            {
                $.each(codelists['structure:Code'],function(k,s){
                    if(s['structure:Description'].length>1){
                        $.each(s['structure:Description'],function(m,p){
                            total+="<tr >"
                            total+="<td class="+"TdCenso"+">"+s['@value']+"</td>"
                            total+="<td class="+"TdCenso"+">"+p['#text']+"</td>"
                            total+="</tr>"
                        });
                        return ;
                    }
                    else{
                        total+="<tr >"
                        total+="<td class="+"TdCenso"+">"+s['@value']+"</td>"
                        total+="<td class="+"TdCenso"+">"+s['structure:Description']['#text']+"</td>"
                        total+="</tr>"
                    }
                });
            }
            else
            {
                if(codelists['structure:Code']['structure:Description'].length>1){
                    $.each(codelists['structure:Code']['structure:Description'],function(m,p){
                        total+="<tr >"
                        total+="<td class="+"TdCenso"+">"+codelists['structure:Code']['@value']+"</td>"
                        total+="<td class="+"TdCenso"+">"+p['#text']+"</td>"
                        total+="</tr>"
                    });
                    return ;
                }
                else{
                    total+="<tr >"
                    total+="<td class="+"TdCenso"+">"+codelists['structure:Code']['@value']+"</td>"
                    total+="<td class="+"TdCenso"+">"+codelists['structure:Code']['structure:Description']['#text']+"</td>"
                    total+="</tr>"
                }
            }
            total+="</table>";
            /**var ScreenWidth=window.screen.width;
            var ScreenHeight=window.screen.height;
            var placementx=(ScreenWidth/2)-((400)/2);
            var placementy=(ScreenHeight/2)-((300+50)/2);
            var WinPop=window.open("CODELIST_INFO","","width=400,height=300,toolbar=0,location=0,directories=0,status=0,scrollbars=1,menubar=0,resizable=1,left="+placementx+",top="+placementy+",scre enX="+placementx+",screenY="+placementy+",");
            WinPop.document.write('<html>\n<head>\n</head>\n<body>'+total+'</body></html>');
            bObj.removeScriptTag(); */
			var caja2 = $('<div title="Codelist">'+total+'</div>');
             caja2.dialog();
            return false;
        }
    }
//    bObj.removeScriptTag();
}