//Modificado: 10/08/2009
//Modificó: Ing. Victor Hugo Zamarripa Gómez
var ContentHeight = 0;
var FilaHeight  = 0;
var TimeToSlide = 250.0;
var Array_tablas= new Array();
var Array_Filas_hijos= new Array();
var Array_estado_tablas= new Array();
var Array_estado_inicial= new Array();
var Array_tablas_bk= new Array();
var Array_tablas_tmp= new Array();
var Array_padres= new Array();
var IsPostBack;
var contador = 0;
var contador2 = 1;
var Height_contenedor=0;
var Height_acc_click=0;
var Estado_acc_click=0;
var alto_crece=0;
var alto_tb_resumen=0;
var alto_tb_degradado=0;
var consec='';
//Funcion que se corre al cargar la página
//Guarda las alturas de cada acordeon dentro de arrays e minimiza o maximiza los accordeones según lo que se tenga en el array de estados
function inicializa(){
 var bandera=0;
 var padres=0;
 while (bandera==0){
    if (document.layers){
    if (!document.layers["TablaMenu" + contador] && ((contador + 1)>Array_estado_tablas.length))
     bandera=1;
    else{
     if (document.layers["TablaMenu" + contador]){			
    Array_tablas[contador]=document.layers["TablaMenu" + contador].clientHeight;
      Array_tablas_bk[contador]=document.layers["TablaMenu" + contador].clientHeight;
     }
     contador++;
    }			
   }
   else if (document.all){
    if (!document.all["TablaMenu" + contador] && ((contador + 1)>Array_estado_tablas.length))
     bandera=1;
    else{
     if (document.all["TablaMenu" + contador]){
      Array_tablas[contador]=document.all["TablaMenu" + contador].clientHeight;
      Array_tablas_bk[contador]=document.all["TablaMenu" + contador].clientHeight;
     }
     contador++;
    }
   }
   else if (document.getElementById) {
    if (!document.getElementById("TablaMenu" + contador) && ((contador + 1)>Array_estado_tablas.length))
     bandera=1;
    else{
     if (document.getElementById("TablaMenu" + contador)){
      Array_tablas[contador]=document.getElementById("TablaMenu" + contador).offsetHeight;
      Array_tablas_bk[contador]=document.getElementById("TablaMenu" + contador).offsetHeight;
     }
     contador++;
    }
   }
  }
//Checa si la cookie trae valores de estado del cuadro
if (leerCookie('Estados_cuadro' + consec)==1){
  var Estados = getCookie('Estados_cuadro' + consec);
  var Array_states='';
  if (Estados!=null && Estados!=''){
   Array_states=Estados.split(',');
   for (x=0;x<Array_states.length-1; x++)
    Array_estado_tablas[x]=Array_states[x];
  }
 }
 bandera=0;
 var Ndivs=document.documentElement.getElementsByTagName('div').length;
 var nombre='';
 for(i=0;i<Ndivs;i++){
   if (document.getElementById('TablaMenu' + i)){
    nombre=document.getElementById('TablaMenu' + i).id;
    if (document.layers){
     if (!document.layers[nombre])
      bandera=1;
     else{
       if (document.layers["Accordion" + i + "Content"]){
        if (espadre("Accordion" + i + "Content")==1){
         Array_padres[padres]=i;
         padres++;
        }
        if (Array_estado_inicial[i]!=1){
         document.layers["Accordion" + i + "Content"].style.display = Array_estado_tablas[i];
         Array_tablas_tmp[i]=document.layers["TablaMenu" + i].clientHeight;
        }
       }
       contador++;
      }
     }
     else if (document.all){
      if (!document.all[nombre])
       bandera=1;
      else{
       if (document.all["Accordion" + i + "Content"]){
        if (espadre("Accordion" + i + "Content")==1){
         Array_padres[padres]=i;
         padres++;
        }
		if (Array_estado_inicial[i]!=1){
         document.all["Accordion" + i + "Content"].style.display = Array_estado_tablas[i];
         Array_tablas_tmp[i]=document.all["TablaMenu" + i].clientHeight;
        }
       } 
       contador++;
      }			
     }
     else if (document.getElementById){
      if (!document.getElementById(nombre))
       bandera=1;
      else{		
       if (document.getElementById("Accordion" + i + "Content")){
        if (espadre("Accordion" + i + "Content")==1){
         Array_padres[padres]=i;
         padres++;
        }
        if (Array_estado_inicial[i]!=1){
         document.getElementById("Accordion" + i + "Content").style.display = Array_estado_tablas[i];
         Array_tablas_tmp[i]=document.getElementById("TablaMenu" + i).offsetHeight;  
        }
       }
       contador++;
      }			
     }
    }
   }
   if (document.getElementById('pcnt_tb_resumen')){
    var ws=screen.width;
    var wi=document.getElementById('pcnt_tb_resumen').style.width;
    document.getElementById('pcnt_tb_panel').style.width=(ws-wi) + 'px';
   }
  }
function leerCookie(nombre) {
 var i;
 var a = document.cookie.split(";")
 var n, v;
 var pos;
 for (i=0; i<a.length; i++) {
  pos = a[i].indexOf("=");
  n = a[i].substring(0, pos);
  if (trim(n) == trim(nombre))
   return 1;
 }
 return 0;
}
function trim(cadena){
 for(i=0; i<cadena.length; ){
  if(cadena.charAt(i)==" ")
   cadena=cadena.substring(i+1, cadena.length);
  else
   break;
 }
 for(i=cadena.length-1; i>=0; i=cadena.length-1){
  if(cadena.charAt(i)==" ")
   cadena=cadena.substring(0,i);
  else
   break;
 }
 return cadena;
}
function cierra_nodos(index)
{
 var es_padre=0;
 var sons=0;
 var cerrar_franja=1;
 for(acor=0;acor<Array_tablas.length;acor++){
  sons=0;
  es_padre=0;
  for(pd=0;pd<Array_padres.length;pd++)
   if (Array_padres[pd]==acor)
    es_padre=1;
  if (index==acor)
  {
   sons=checa_hijos('TablaMenu' + index);
   if (Array_estado_tablas[index]=='block')
    cerrar_franja=0;
  }
  if (sons>0)
   acor=acor + sons;
  else
   if (es_padre==0 && index!=acor )
   {
    if (Array_estado_inicial[acor]!=1)
    {
     try{
      if (!document.getElementById("Accordion" + acor + "Content").getElementsByTagName('table').namedItem('TablaMenu' + index)){
       Array_estado_tablas[acor]='none';
       document.getElementById("Accordion" + acor + "Content").style.display='none';
       document.getElementById("Accordion" + acor + "Content").style.height=  '0px';
      }
     }
     catch(err){
      nameditem('TablaMenu' + index);
     }
    }
   }
  }
  if (document.getElementById('crecer'))
   if (cerrar_franja==1)
    document.getElementById('crecer').style.height=  '0px';
}
function nameditem(item){
 var s=[], metas=document.getElementById("Accordion" + acor + "Content").getElementsByTagName('table');
 for(var i=0,L=metas.length;i<L;i++){
  if(metas[i].name==item)s[s.length]=metas[i].content;
 }
 s= s.join(',');
}
//Función que se corre al terminar de pintar todos los acordeones
//Guarda los estados (Maximizado ó minimizado) de cada acordeon
function Set_status_table(id,estado){
 Array_estado_tablas[id]=estado;
 if (estado=='block')
  Array_estado_inicial[id]=1;
 else
  Array_estado_inicial[id]=0;
}
//Función que se corre al dar clic sobre un accordeon
//Maximiza o minimiza el acordeon
function runAccordion(index){
 if (Array_estado_inicial[index]!=1){
  var nID = "Accordion" + index + "Content";
  if (document.getElementById(nID) &&  (espadre("Accordion" + index + "Content")==0 || getParameter('dp')=='1' )){
   cierra_nodos(index);
   var tabla_id="TablaMenu" + index;
   var closeAcordion='';
   var openAccordion = '';
   var imag='';
   document.getElementById(nID).style.overflow='hidden';
   if ((document.getElementById(nID).style.display == 'block' && document.getElementById(nID).style.height != '0px') || document.getElementById(nID).style.display == '')
    closeAcordion= nID;
   else
    openAccordion = nID;
   var nombre='';
   var n_hijos = document.getElementById(tabla_id).getElementsByTagName('div').length;
   var height_hijos = 0;
   var Nosalir = 0;
   var i = 0;
   while (i < n_hijos){
    nombre=document.getElementById(tabla_id).getElementsByTagName('table')[i].id;
    if (nombre.indexOf('TablaMenu')>=0){
     if (document.layers){
      if (document.layers[nombre].style.display=='none' || document.layers[nombre].style.display=='')
       if (Array_tablas[nombre.replace('TablaMenu','')]>0)
        height_hijos=height_hijos + Array_tablas[nombre.replace('TablaMenu','')];
     }
     else if (document.all){
      if (document.all[nombre].style.display=='none' || document.all[nombre].style.display=='')
       height_hijos=height_hijos + Array_tablas[nombre.replace('TablaMenu','')];
      }
      else if (document.getElementById) {
       if (document.getElementById(nombre).style.display=='none' || document.getElementById(nombre).style.display=='')
        if (Array_tablas[nombre.replace('TablaMenu','')]>0)
         height_hijos=height_hijos + Array_tablas[nombre.replace('TablaMenu','')];
      }
      var hijos=0;
      hijos=checa_hijos(nombre);
      i = i + hijos;
      i++;
     }
    }
    Array_tablas_bk[index]=Array_tablas[index]-height_hijos;
    ContentHeight =Array_tablas_bk[index];
    var aumenta_franja;
	aumenta_franja=0;
	if (document.getElementById('crecer')){
	 alto_crece=regresa_height(document.getElementById('crecer').offsetHeight);
	 alto_tb_resumen=regresa_height(document.getElementById('Tabla_resumen').offsetHeight);
	 alto_tb_degradado=regresa_height(document.getElementById('tabla_degradado').offsetHeight);
	}
	setTimeout("animate(" + new Date().getTime() + "," + TimeToSlide + ",'" + closeAcordion + "','" + openAccordion + "','" + aumenta_franja + "','" + index + "')", 33);
    document.getElementById(nID).style.height=ContentHeight + 'px';
	var h_franja;
	h_franja=0;
    if (Array_estado_tablas[index]=='block'){
     Array_estado_tablas[index]='none';
	 h_franja =(-1)*ContentHeight;
	}
    else{
     Array_estado_tablas[index]='block';
	 h_franja =ContentHeight;
    }
    Guarda_estados();
   }
  }
}
function regresa_height(height_px){
 var alto_px=0;
 var regresa=0;
 if (height_px){
  alto_px=height_px;
  if (isNaN(alto_px)){
   if (alto_px.indexOf('px')>=0){
    alto_px=alto_px.replace('px','');
    regresa=parseInt(alto_px);
   }
  }
  else
   regresa=alto_px;
 }
 return regresa;
}
//Guarda los estados de los acordeones en una cookie
function Guarda_estados(){
 var nosalir=1;
 var indice=0;
 var guardar_estados='';
 //duracion en horas
 var duracion = 1;
 var caduca= new Date();
 caduca.setTime(caduca.getTime() + (duracion*60*60*1000));
 while(nosalir==1){
  if (Array_estado_tablas[indice]!=null && Array_estado_tablas[indice]!='')
   guardar_estados = guardar_estados + Array_estado_tablas[indice] + ',';
  else
   nosalir=0;
  indice++;
 }
 setCookie ('Estados_cuadro' + consec , guardar_estados, caduca,'/');
}
function getParameter(parameter){
 // Obtiene la cadena completa de URL
 var url = location.href;
 /* Obtiene la posicion donde se encuentra el signo ?, ahi es donde empiezan los parametros */
 var index = url.indexOf("?");
 /* Obtiene la posicion donde termina el nombre del parametro e inicia el signo = */
 index = url.indexOf(parameter,index) + parameter.length;
 /* Verifica que efectivamente el valor en la posicion actual es el signo = */
 if (url.charAt(index) == "="){
  // Obtiene el valor del parametro
  var result = url.indexOf("&",index);
  if (result == -1){result=url.length;};
   // Despliega el valor del parametro
   return(url.substring(index + 1,result));
 }
}
//Elimina la cookie
function Eliminar_cookie_estados(constemas){
 var duracion = 1;
 var caducar = new Date(1970, 1, 1, 0, 0, 0);
 setCookie ('Estados_cuadro' + constemas, '', caducar,'/');
}
//Función que devuelve el numero de acordeones hijos que tiene un acordeon
function checa_hijos(tabla_id){
 var n_hijos=document.getElementById(tabla_id).getElementsByTagName('div').length;
 return n_hijos;
}
//Función de animación de transición del acordeon
function animate(lastTick, timeLeft, closingId, openingId, aumenta_franja, index){
 //var ContentHeight =document.getElementById("tabla").offsetHeight;
 var curTick = new Date().getTime();
 var elapsedTicks = curTick - lastTick;
 var crecer_h=0;
 var opening = (openingId == '') ? null : document.getElementById(openingId);
 var closing = (closingId == '') ? null : document.getElementById(closingId);
 if(timeLeft <= elapsedTicks){
  if(opening != null){
   /*Se quita validación VHZG 20011 04 06 a petición de bug en Chrome de contenido de servicios web.
   if (navigator.appName.indexOf('Netscape')>=0 || navigator.appName.indexOf('Firefox')>=0)
    opening.style.height=Array_tablas[index] + 'px';
   else*/
   opening.style.height = '100%';
   if (document.getElementById('Tabla_Panel'))
    if (regresa_height(document.getElementById('Tabla_Panel').offsetHeight)>(alto_crece + alto_tb_resumen + alto_tb_degradado)){
     aumenta_franja=regresa_height(document.getElementById('Tabla_Panel').offsetHeight)-(alto_crece + alto_tb_resumen + alto_tb_degradado);
    }
   if (isNaN(alto_crece)) alto_crece=parseInt(alto_crece);
    if (isNaN(aumenta_franja)) aumenta_franja=parseInt(aumenta_franja);
     if (document.getElementById('crecer'))
	  if ((alto_crece  + aumenta_franja )>=0)
	   document.getElementById('crecer').style.height= (alto_crece + aumenta_franja) + 'px';
      else
	   document.getElementById('crecer').style.height=  '0px';
  }
  if(closing != null){
   closing.style.display = 'none';
   closing.style.height = '0px';
   aumenta_franja =(-1)* Array_tablas[index];
   if (document.getElementById('crecer'))
	if ((parseInt(alto_crece) + aumenta_franja )>=0)
     document.getElementById('crecer').style.height= (parseInt(alto_crece) + aumenta_franja);
	else
     document.getElementById('crecer').style.height=  '0px';
    }
    var h_tmp=0;
	if (document.getElementById('crecer'))
	 if (document.getElementById('crecer').style.height)
	  h_tmp=document.getElementById('crecer').style.height;
	   if (h_tmp)
	    if (h_tmp.indexOf('px')>=0) h_tmp=h_tmp.replace('px','');
	     alto_crece=parseInt(h_tmp);
    return;
  }
  timeLeft -= elapsedTicks;
  var newClosedHeight = Math.round((timeLeft/TimeToSlide) * ContentHeight);
  var newClosedHeight2 = Math.round((timeLeft/TimeToSlide) * Array_tablas[index]);
  if(opening != null){
    if(opening.style.display != 'block')
      opening.style.display = 'block';
    opening.style.height = (ContentHeight - newClosedHeight) + 'px';
    if (document.getElementById('Tabla_Panel'))
     if (regresa_height(document.getElementById('Tabla_Panel').offsetHeight)>(alto_crece + alto_tb_resumen + alto_tb_degradado))
	  aumenta_franja=regresa_height(document.getElementById('Tabla_Panel').offsetHeight)-(alto_crece + alto_tb_resumen + alto_tb_degradado);
    crecer_h= (ContentHeight - newClosedHeight);
  }
  if(closing != null){
   closing.style.height = newClosedHeight + 'px';
   aumenta_franja=   (Array_tablas[index]  - newClosedHeight2);
   crecer_h=  (-1) * (ContentHeight - newClosedHeight);
  }
  if (isNaN(alto_crece)) alto_crece=parseInt(alto_crece);
   if (isNaN(aumenta_franja)) aumenta_franja=parseInt(aumenta_franja);
   var var1=0;
   var var2=0;
   var1=parseInt(alto_crece);
   var2=parseInt(aumenta_franja);
   if ((alto_crece  + aumenta_franja )>=0){
	 if(closing != null){
      if (document.getElementById('crecer'))
	   if ((var1 - var2)>=0)
	    document.getElementById('crecer').style.height= (var1 - var2) + 'px';
	   else
		document.getElementById('crecer').style.height=  '0px';
	 }
     else{
	  if (document.getElementById('crecer'))
       document.getElementById('crecer').style.height= (var1 + var2) + 'px';
	 }
   }
   else{
	if (document.getElementById('crecer'))
     document.getElementById('crecer').style.height=  '0px';
   }
   setTimeout("animate(" + curTick + "," + timeLeft + ",'" + closingId + "','" + openingId + "','" + aumenta_franja + "','" + index + "')", 33);
}
function Inicia(){
 var dv=getParameter('dv');
 if (dv=='' || dv==null)
  dv='C1';
 dv=dv.toUpperCase();
 oculta_aparece_div(dv);
 //muestra_titulo_proy();
}
function oculta_aparece_div(id){
 if (document.layers) {
  var ctb=n_tablas();
  for(x=1;x<=ctb;x++)  
   if (document.layers['C' + x])
    document.layers['C' + x].style.display='none';
  document.layers[id].style.display='block';
  if ((document.layers[id].clientHeight-93)>=0)
   document.layers['Tabla_general'].style.height=(document.layers[id].clientHeight-93) + 'px';
  else
   document.layers['Tabla_general'].style.height='0px';
 }
 else if (document.all){
  var ctb=n_tablas();
  for(x=1;x<=ctb;x++) 
   if (document.all['C' + x])
    document.all['C' + x].style.display='none';
  document.all[id].style.display='block';
  if ((document.all[id].clientHeight-93)>=0)
   document.all['Tabla_general'].style.height=(document.all[id].clientHeight-93) + 'px';
  else
   document.all['Tabla_general'].style.height='0px';
 }
 else if (document.getElementById){
 var ctb=n_tablas();
 for(x=1;x<=ctb;x++)
  if (document.getElementById('C' + x))
   document.getElementById('C' + x).style.display='none';
 document.getElementById(id).style.display='block';
 if ((document.getElementById(id).offsetHeight-93)>=0)
  document.getElementById('Tabla_general').style.height=(document.getElementById(id).offsetHeight-93) + 'px';
 else
  document.getElementById('Tabla_general').style.height='0px';
 }
}
function toggleLayer2( whichLayer ){
 var elem, vis;
 if( document.getElementById )
  // this is the way the standards work
  elem = document.getElementById( whichLayer );
 else if( document.all )
  // this is the way old msie versions work
  elem = document.all[whichLayer];
  else if( document.layers )
   // this is the way nn4 works
   elem = document.layers[whichLayer];  vis = elem.style;
 // if the style.display value is blank we try to figure it out here
 if(vis.display==''&&elem.offsetWidth!=undefined&&elem.offsetHeight!=undefined)
  vis.display = (elem.offsetWidth!=0&&elem.offsetHeight!=0)?'block':'none';
 vis.display = (vis.display==''||vis.display=='block')?'none':'block';
}
function crece(tabla_id){
 var height_hijo=regresa_height_padre(tabla_id);
 Height_contenedor=document.getElementById('estructura').offsetHeight + height_hijo;
 if (Height_contenedor<0) Height_contenedor=document.getElementById('estructura').offsetHeight;
  document.all['crecer'].style.height=Height_contenedor;
}
function calcula_height_estructura(){
 var height=0;
 for (x=0;x<Array_tablas.length;x++){
  if (Array_estado_tablas[x]=='block')
   height=height+Array_tablas_bk[x];
 }
 height=document.getElementById('Accordion0Content').offsetHeight;
 return height;
}
function regresa_height_padre(tabla_id){
 var nombre='';
 var n_hijos=document.getElementById('estructura').getElementsByTagName('div').length;
 var height_hijos=0;
 var Nosalir=0;
 var i=0;
 var suma=0;
 while(i<n_hijos){
  nombre=document.getElementById('estructura').getElementsByTagName('div')[i].id;
  if (nombre.indexOf('Accordion')>=0){
   if (document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id)){
	suma1=Array_tablas_bk[document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id).id.replace('TablaMenu','')];
	suma=Array_tablas[document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id).id.replace('TablaMenu','')];
	tab_acc_padre=obten_primer_tabla_div(nombre);
	if (tab_acc_padre==tabla_id  && (Hijos_estados(nombre)==0 || tabla_id=='TablaMenu0')){
	 if (tabla_id!='TablaMenu0')
	  if (Array_estado_tablas[document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id).id.replace('TablaMenu','')]=='block')
		 suma=suma1;
	}
	if (Array_estado_tablas[document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id).id.replace('TablaMenu','')]=='none')
	 suma= (-1)*suma;
	break;
	}
   }
   i++;
  }
 return suma;
}
function obten_primer_tabla_div(div){
 var nombre='';
 var n_hijos=document.getElementById(div).getElementsByTagName('table').length;
 var height_hijos=0;
 var Nosalir=0;
 var i=0;
 var suma=0;
 for(x=0;x<n_hijos;x++){
  nombre=document.getElementById(div).getElementsByTagName('table')[x].id;
  if (nombre.indexOf('TablaMenu')>=0)
  break;
 }
 return nombre;
}
function Hijos_estados(div){
 var nombre='';
 var n_hijos=document.getElementById(div).getElementsByTagName('table').length;
 var height_hijos=0;
 var Nosalir=0;
 var band_abiertos=0;
 var suma=0;
 for(x=0;x<n_hijos;x++){
  nombre=document.getElementById(div).getElementsByTagName('table')[x].id;
  if (nombre.indexOf('TablaMenu')>=0 && Array_estado_tablas[nombre.replace('TablaMenu','')]=='block')
   suma=suma+ Array_tablas_bk[nombre.replace('TablaMenu','')];
  if (nombre.indexOf('TablaMenu')>=0 && x>=1)
	if (Array_estado_tablas[nombre.replace('TablaMenu','')]=='block')
	 band_abiertos=1;
 }
 return band_abiertos;
}
function sumar(){
 if (padre_estado('TablaMenu' + p)==1){
  suma=suma + suma_height_hijos(obten_primer_tabla_div(nombre))
 }
}
function padre_estado(tabla_id){
 var n_hijos=document.getElementById('estructura').getElementsByTagName('div').length;
 var height_hijos=0;
 var Nosalir=0;
 var i=0;
 var suma=0;
 var estado_padre=1;
 while(i<n_hijos){
  nombre=document.getElementById('estructura').getElementsByTagName('div')[i].id;
  if (nombre.indexOf('Accordion')>=0)
   if (document.getElementById(nombre).getElementsByTagName('table').namedItem(tabla_id)){
	if (Array_estado_tablas[obten_primer_tabla_div(nombre).replace('TablaMenu','')]=='none'){
	 estado_padre=0;
	 break;
	}
   }
   i++;
  }
  return estado_padre;
}
function suma_height_hijos(height_click,estado){
 var c_hijos=document.getElementById('estructura').getElementsByTagName('div').length;
 var height_hijos=0;
 var Nosalir=0;
 var t=0;
 var w=0;
 var sumas=0;
 var estado_padre=1;
 var cont_tb=0;
 while(t<c_hijos){
  name=document.getElementById('estructura').getElementsByTagName('div')[t].id;
  if (name.indexOf('Accordion')>=0){
   if (obten_primer_tabla_div(name).indexOf('TablaMenu')>=0){
    if (Array_estado_tablas[obten_primer_tabla_div(name).replace('TablaMenu','')]=='none')
	 estado_padre=0;
	else{
	 var n_hijos_dv=document.getElementById(name).getElementsByTagName('div').length;
	 w=0;
	 while(w<n_hijos_dv){
      nombre_tb=document.getElementById(name).getElementsByTagName('table')[w].id;					
	  sumas=sumas+ Array_tablas[nombre_tb.replace('TablaMenu','')];
      var hijos=0;
	  hijos=checa_hijos(name);
	  w = w + hijos;
	  w++;
     }
	}
   }
   acc_hijos=checa_hijos(obten_primer_tabla_div(name));
   t = t + hijos;
  }
  t++;
 }
 if (estado=='none')
  sumas=sumas-height_click;
 if (sumas<0) sumas=0;
  document.all['crecer'].style.height=sumas;
}
function tmp(){
document.all['crecer'].style.height=document.getElementById('estructura').offsetHeight;
}
function espadre(acc){
 var parent=0;
 var c_hijos=document.getElementById('estructura').getElementsByTagName('div').length;
 var height_hijos=0;
 var Nosalir=0;
 var t=0;
 var w=0;
 var sumas=0;
 var estado_padre=1;
 var cont_tb=0;
 while(t<c_hijos){
  name=document.getElementById('estructura').getElementsByTagName('div')[t].id;
  if (name.indexOf('Accordion')>=0){
   if (acc==name){
    parent=1;
	break;
   }
   acc_hijos=checa_hijos(obten_primer_tabla_div(name));
   t = t + acc_hijos;
  }
  t++;
 }
 return parent;
}
function imprimir(){
 muestra('imprimible');
 document.body.className='oculta';
}
function muestra(clase){
 if (document.layers){
  for(x=1;x<=7;x++)
   if (document.layers['C' + x])
    document.layers['C' + x].className=clase;
 }
 else if (document.all){
  for(x=1;x<=7;x++)
   if (document.all['C' + x])
    document.all['C' + x].className=clase;
 }
 else if (document.getElementById){
  for(x=1;x<=7;x++)
   if (document.getElementById('C' + x))
    document.getElementById('C' + x).className=clase;
 }
}
function Mostrar_div(){
 if (document.layers){
  for(x=1;x<=13;x++)
   if (document.layers['C' + x])
    document.layers['C' + x].style.display='block';
 }
 else if (document.all){
  for(x=1;x<=13;x++)
   if (document.all['C' + x])
    document.all['C' + x].style.display='block';
 }
 else if (document.getElementById){
  for(x=1;x<=13;x++)
   if (document.getElementById('C' + x))
    document.getElementById('C' + x).style.display='block';
 }
}
function imprSelec(nombre){
 var ventimp = window.open('/est/contenidos/proyectos/Preview.aspx' + parametro_preview(), '_blank');
}
function parametro_preview(){
 var par=getParameter('p');
 var paramet='';
 if (par!=''){
  switch (par){
    case '1': paramet='?p=2005'; break;
    case '2': paramet='?p=2000'; break;
    case '3': paramet='?p=1995'; break;
    case '4': paramet='?p=1990'; break;
    case '5': paramet='?p=1980'; break;
    case '6': paramet='?p=1970'; break;
    case '7': paramet='?p=1960'; break;
    case '8': paramet='?p=1950'; break;
    case '9': paramet='?p=1940'; break;
    case '10': paramet='?p=1930'; break;
    case '11': paramet='?p=1921'; break;
    case '12': paramet='?p=1910'; break;
    case '13': paramet='?p=1900'; break;
    case '14': paramet='?p=1895'; break;
	case '15': paramet='?p=Eco1889'; break;
    case '16': paramet='?p=Eco1994'; break;
    case '17': paramet='?p=Eco1999'; break;
    case '18': paramet='?p=Eco2004'; break;
    case '19': paramet = '?p=Eco2009'; break;
    case '20': paramet='?p=Agro'; break;
    case '21': paramet='?p=CA2007'; break;
    case '22': paramet='?p=CA1991'; break;
   }
  }
	return paramet;
}
function n_tablas(){
 var nm_tb='';
 var ntbs=document.getElementById('impresion').getElementsByTagName('table').length;
 var height_hijos=0;
 var Nosalir=0;
 var ct=0;
 var suma=0;
 for(x=0;x<ntbs;x++){
  nm_tb=document.getElementById('impresion').getElementsByTagName('table')[x].id;
  if (nm_tb.indexOf('C')>=0)
    ct++;
 }
 return ct;
}
function set_url(vinculo){
 var dv=getParameter('dv');
 var url = location.href;
 if (dv!='' && dv!=undefined)
  url=url.replace(('dv=' + dv),('dv=' + vinculo));
 else{
  if (url.indexOf('&')>=0 || url.indexOf('?')>=0)
   url=url + '&dv=' + vinculo;
  else
   url=url + '?dv=' + vinculo;
 }
 top.location=url;
}
function calcHeight(frame_hgt){
 // Obtener la altura del iframe desplegado en la pagina
 var the_height= document.getElementById(frame_hgt).contentWindow.document.body.scrollHeight;
 var the_width= document.getElementById(frame_hgt).contentWindow.document.body.scrollWidth;
 // Cambiar la altura del iframe
 document.getElementById(frame_hgt).height= the_height;
 document.getElementById(frame_hgt).width= the_width;
}