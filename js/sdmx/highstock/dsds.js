/*Script creado por Armando Humberto Cazarin Meza*/
/*Replicado en produccion Marzo de 2012*/

$(document).ready(function(){       
            var url='http://www.sdmx.snieg.mx/sistemas/sdmx/'+'restsdmx/DataStructure/ALL/ALL/ALL?alt=json&callback=dsd';
        bObj2 = new JSONscriptRequest(url); 
        bObj2.buildScriptTag(); 
        bObj2.addScriptTag();
});
    
function dsd(obj){
    var dsds=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily'];
    if(dsds.length>1)
        {
    $.each(dsds,function(j,d){  
        if(d['structure:Name'].length>1)
            $('#camposelector3').append('<option value='+d['@id']+'>'+get_lenguaje(d['structure:Name'])+" "+'('+d['@id']+')'+'</option>');
        else
            $('#camposelector3').append('<option value='+d['@id']+'>'+d['structure:Name']['#text']+" "+'('+d['@id']+')'+'</option>');
        
    });
        }
        else
            {
                if(dsds['structure:Name'].length>1)
            $('#camposelector3').append('<option value='+dsds['@id']+'>'+get_lenguaje(dsds['structure:Name'])+" "+'('+dsds['@id']+')'+'</option>');
        else
            $('#camposelector3').append('<option value='+dsds['@id']+'>'+dsds['structure:Name']['#text']+" "+'('+dsds['@id']+')'+'</option>');
            }
    bObj2.removeScriptTag();
}

function get_lenguaje(objeto){
    var nametext=""
    $.each(objeto,function(e,w){
       if(w['@xml:lang']=="en")
           {
           nametext=w['#text'];
           return false
           }
           else
           {
               nametext=w['#text'];
               return
           }
    });
    return nametext
}