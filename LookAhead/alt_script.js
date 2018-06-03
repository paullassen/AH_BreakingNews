//import Tippy from 'tippy.js';

const maxLen =300

var doc = document.body.getElementsByTagName("a");
for (var i = 0; i < doc.length; i++) {
var oHT = "Any text I want number "+i.toString();
var artex = null;
var tmp = oHT;
cont(doc, i)
}
function cont(docu, it){
fetch(docu[it].href)
		.then((resp) => resp.text())
		.then(function(data) {
      var strng = data.toString();
			//var para = document.createElement("p")
      artex = strng.substring(strng.indexOf("<p>")+3,strng.indexOf("</p>"));
      var newstr = strng.substring(strng.indexOf("</p>")+3);
      while (artex.length<maxLen) {
        artex = artex+" "+newstr.substring(newstr.indexOf("<p>")+3,newstr.indexOf("</p>"));
        newstr = newstr.substring(newstr.indexOf("</p>"));
      }
			textdat = "";
      if(artex[0]!="<"){
        textdat = artex.substring(0,maxLen)+"...\"";
      }
      //doc[i].innerHTML = artex.substring(0,maxLen)+"...";
      console.log(textdat)
			docu[it].title = textdat;
			return textdat;
		})
    //doc[i].title = tmp;
		//console.log(doc[i].outerHTML)
		//docu[it].title = txd
}
