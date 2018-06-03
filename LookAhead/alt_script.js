const maxLen =300

var doc = document.body.getElementsByTagName("a");
for (var i = 0; i < doc.length; i++) {
cont(doc, i)

}
function cont(docu, it){
fetch(docu[it].href)
		.then((resp) => resp.text())
		.then(function(data) {
      var strng = data.toString();
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
			docu[it].title = textdat;
			return textdat;
		})
}
