/*Script creado por Armando Humberto Cazarin Meza*/
/*Replicado en produccion Marzo de 2012*/

$(document).ready(function(){
            //var url='http://10.1.32.58:5082/'+'restsdmx/Dataflow/ALL/ALL/ALL?alt=json&callback=flujos_infodisp';
            var url='http://www.sdmx.snieg.mx/sistemas/sdmx/'+'restsdmx/Dataflow/ALL/ALL/ALL?alt=json&callback=flujos_infodisp';
        bObj = new JSONscriptRequest(url); 
        bObj.buildScriptTag(); 
        bObj.addScriptTag();
});
    
function flujos_infodisp(obj2){
    var flujos_dsds=obj2.RegistryInterface.QueryStructureResponse['registry:Dataflows']['structure:Dataflow'];
    if(flujos_dsds.length>1)
        {
    $.each(flujos_dsds,function(j,dd){
        if(dd['structure:Name'].length>1)
            $('#camposelector_flujo').append('<option value='+dd['@id']+'>'+get_lenguaje(dd['structure:Name'])+' '+'('+dd['@id']+')'+'</option>');
        else
            $('#camposelector_flujo').append('<option value='+dd['@id']+'>'+dd['structure:Name']['#text']+' '+'('+dd['@id']+')'+'</option>');
    });
        }
        else
        {
            if(flujos_dsds['structure:Name'].length>1)
                $('#camposelector_flujo').append('<option value='+flujos_dsds['@id']+'>'+get_lenguaje(flujos_dsds['structure:Name'])+' '+'('+flujos_dsds['@id']+')'+'</option>');
            else
                $('#camposelector_flujo').append('<option value='+flujos_dsds['@id']+'>'+flujos_dsds['structure:Name']['#text']+' '+'('+flujos_dsds['@id']+')'+'</option>');
        }    
     bObj.removeScriptTag();
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