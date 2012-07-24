/*Script creado por Armando Humberto Cazarin Meza*/
/*Replicado en produccion Marzo de 2012*/

var DSD;
var SERVIDOR;
var request = {
    etiqueta_serie: "INDICADOR_ST",
    etiqueta_dimension_medida: "OBS_VALUE",
    etiqueta_tiempo:"TIME_PERIOD"                            
};

function thead(  ) {
    var thead = "<thead><tr>"; 
    var headers=['Conceptos','Codelist','Codelist_Agency','Codelist_Versi&#243;n','AttachmentLevel','Tipo','Descripci&oacute;n']
    $.each(headers,function(i) {
        thead += "<th class="+"Pob_Th"+">" + headers[i] + "</th>";
    }
    );
    thead += "</tr></thead>";
    return thead;
}
        
function tbody( obj) {
    var tbody = "<tbody>"; 
    var dimensiones=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily']['structure:Components']['structure:Dimension'];
    var timedimension=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily']['structure:Components']['structure:TimeDimension'];
    var primarymeasure=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily']['structure:Components']['structure:PrimaryMeasure'];
    if(DSD=='DSD_ENOE')
        var crossectional=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily']['structure:Components']['structure:CrossSectionalMeasure'];
    var atributos=obj.RegistryInterface.QueryStructureResponse['registry:KeyFamilies']['structure:KeyFamily']['structure:Components']['structure:Attribute'];             
    tbody+=getDimensiones(dimensiones);
    tbody+=getTimedimension(timedimension);
    tbody+=getPrimaryMeasure(primarymeasure);
    if(DSD=='DSD_ENOE')
        tbody+=getCrossSectional(crossectional);
    tbody+=getAtributos(atributos);
    tbody += "</tbody>";
    return tbody;
}
        
function JSONPCallback(jsondata){
    var id='unemp_table';
    var tbl = "<table class="+"Pob_Tabla"+" "+"cellpadding="+"0"+" "+"cellspacing="+"0"+" "+"align="+"center"+" "+"border="+"0"+">";
    tbl += thead();
    tbl += tbody(jsondata);
    tbl += "</table>";
    $("#" + id).html(tbl);
    bObj.removeScriptTag();
}
        
        
function getDimensiones(dimensiones){
    var tbody="";
    var image1="<img src="+"'"+"img/frecuencydimension.gif"+"'"+"/>";
    var image2="<img src="+"'"+"img/dimension.gif"+"'"+"/>";
    for (var r = 0; r < dimensiones.length; r++) {
        tbody += "<tr>";  
        tbody +=  "<td class="+"TdCenso"+">"+dimensiones[r]['@conceptRef'] +"</td>"; 
        tbody+=  "<td class="+"TdCenso"+">"+
        "<a  href='javascript:void(0)' onclick"+"="+"hola("+"'"+dimensiones[r]['@codelist']+"'"+","+"'"+dimensiones[r]['@codelistAgency']+"'"+","+"'"+SERVIDOR+"'"+');'+">"+dimensiones[r]['@codelist']+"</a>"+
        "</td>";
        tbody += "<td class="+"TdCenso"+">"+dimensiones[r]['@codelistAgency']+"</td>";
        tbody += "<td class="+"TdCenso"+">"+dimensiones[r]['@codelistVersion']+"</td>";
        tbody += "<td class="+"TdCenso"+">"+"</td>";
        switch(dimensiones[r]['@conceptRef']){
            case 'FREQ':
                tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
                tbody += "<td class="+"TdCenso"+">"+'frecuencydimension'+"</td>";
                break;
            default:
                tbody +=  "<td class="+"TdCenso"+">"+image2+"</td>";
                tbody += "<td class="+"TdCenso"+">"+'dimension'+"</td>";
                break;     
        }
    }
    return  tbody
}
        
function getTimedimension(TimeDimension){
    var image1="<img src="+"'"+"img/timedimension.gif"+"'"+"/>";
    var  tbody = "<tr>";
    tbody +=  "<td class="+"TdCenso"+">"+TimeDimension['@conceptRef'] +"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    switch(TimeDimension['@conceptRef']){
        case 'TIME_PERIOD':
            tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
            tbody += "<td class="+"TdCenso"+">"+'timedimension'+"</td>";
            break;
        case 'TIME':
            tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+'timedimension'+"</td>";
            break;
        case 'TIME_FORMAT':
            tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+'timedimension'+"</td>";
            break;
    }
    return  tbody
}
        
function getPrimaryMeasure(PrimaryMeasure){
    var image1="<img src="+"'"+"img/primarymeasure.gif"+"'"+"/>";
    var tbody = "<tr>";
    tbody +=  "<td class="+"TdCenso"+">"+PrimaryMeasure['@conceptRef'] +"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+'primarymeasure'+"</td>";
    return  tbody
}


function getCrossSectional(Cross){
    var image1="<img src="+"'"+"img/measure.gif"+"'"+"/>";
    var tbody="";
    $.each(Cross,function(o){
        tbody += "<tr>";
        tbody +=  "<td class="+"TdCenso"+">"+Cross[o]['@conceptRef'] +"</td>";
        tbody +=  "<td class="+"TdCenso"+">"+"</td>";
        tbody +=  "<td class="+"TdCenso"+">"+"</td>";
        tbody +=  "<td class="+"TdCenso"+">"+"</td>";
    tbody +=  "<td class="+"TdCenso"+">"+"</td>";
        tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
        tbody +=  "<td class="+"TdCenso"+">"+'CrossSectional'+"</td>";
    });
    return  tbody
}


function getAtributos(attribute){
    if(attribute!=null){
    var image1="<img src="+"'"+"img/attribute.gif"+"'"+"/>";
    var tbody="";
    for (var r = 0; r < attribute.length; r++) {
        tbody += "<tr>";
        tbody +=  "<td class="+"TdCenso"+">"+attribute[r]['@conceptRef'] +"</td>";
        if(attribute[r]['@conceptRef']=='REPORTINGBEGIN'||attribute[r]['@conceptRef']=='REPORTINGEND')
        {
            tbody+=  "<td class="+"TdCenso"+">"+"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+"</td>";
            tbody+=  "<td class="+"TdCenso"+">"+attribute[r]['@attachmentLevel'] +"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
            tbody +=  "<td class="+"TdCenso"+">"+'attribute'+"</td>";
        }
        else{
            if(attribute[r]['@codelist']!=null)
            {
                tbody+= "<td class="+"TdCenso"+">"+
                "<a href='javascript:void(0)' onclick"+"="+"hola("+"'"+attribute[r]['@codelist']+"'"+","+"'"+attribute[r]['@codelistAgency']+"'"+","+"'"+SERVIDOR+"'"+');'+">"+attribute[r]['@codelist']+"</a>"+
                "</td>";
                tbody += "<td class="+"TdCenso"+">"+attribute[r]['@codelistAgency']+"</td>";
        tbody += "<td class="+"TdCenso"+">"+attribute[r]['@codelistVersion']+"</td>";
                tbody+=  "<td class="+"TdCenso"+">"+attribute[r]['@attachmentLevel'] +"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+'attribute'+"</td>";
            }
            else
            {
                tbody +=  "<td class="+"TdCenso"+">"+"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+"</td>";
                tbody+=  "<td class="+"TdCenso"+">"+attribute[r]['@attachmentLevel'] +"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+image1+"</td>";
                tbody +=  "<td class="+"TdCenso"+">"+'attribute'+"</td>";
            }
        }
    }
    }
    else
        tbody="";
    return  tbody
}
        
function getURL(dsd,servidor){
    this.DSD=dsd;
    this.SERVIDOR=servidor
    if(servidor=='http://www.sdmx.snieg.mx/sistemas/sdmx/')
        var url=servidor+'restsdmx/DataStructure/ALL/'+dsd+'/ALL?alt=json&callback=JSONPCallback';
    return url
}

function insertChart (dsd,servidor ) {
    var url=getURL(dsd,servidor);
    bObj = new JSONscriptRequest(url); 
    bObj.buildScriptTag(); 
    bObj.addScriptTag();
}