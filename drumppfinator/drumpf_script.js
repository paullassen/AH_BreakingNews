drumpfinator(document.body);

obamanator(document.getElementsByTagName("img"));

function drumpfinator(node)
{
	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				drumpfinator(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

//return a random integer between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//Function goes over the images tag objects and replaces the image with obama's image if Trump is mentioned in the alt tag
function obamanator(imagesObject){
	var obamas =
	["https://www.rawstory.com/wp-content/uploads/2016/01/obama-laughing-800x430.jpg",
	"https://www.rawstory.com/wp-content/uploads/2016/01/obama-laughing-800x430.jpg",
	"https://s-media-cache-ak0.pinimg.com/736x/1d/77/6a/1d776a8f814ad0a08ab4ccd58340cb2d--obama-administration-political-news.jpg",
	"https://thelibertarianrepublic.com/wp-content/uploads/2016/03/obama-laughing.png",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3V_1dvJbNJyoIidCgmVjRz6ABq03fpv09OU2pIVWNyQQXVm3A",
	"https://s-media-cache-ak0.pinimg.com/originals/f7/a2/8e/f7a28ecce38cdb2418f44c8469a5c4a6.jpg",
	"https://i2.cdn.cnn.com/cnnnext/dam/assets/170112181349-biden-obama-medal-laugh-super-169.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFF-_Ajt9E7DIMk7XcXbwjykN5xbhftN21KC8b8EkrjuX77ZAy",
	"https://pbs.twimg.com/media/DCtrzo5XkAADCSf.jpg",
	"https://www.technobezz.com/files/uploads/2016/04/screen-shot-2014-11-19-at-12-31-23-pm.png",
	"https://www.askideas.com/media/06/Barak-Obama-Funny-Yawning.jpg",
	"http://www.vetogate.com/upload/photo/parags/108/5/425x239o/231.jpg?q=0",
	"https://media.tenor.com/images/001b528635a02a5cdff3c8f63573870e/tenor.gif",
	"https://i.amz.mshcdn.com/polIOLCQhv9m7wLHgSmjs2UN40c=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F08%2Fobama-2.gif",
	"https://media.giphy.com/media/ZEmYj5XWiPoti/giphy.gif",
	"https://wearyourvoicemag.com/wp-content/uploads/2015/12/obama-hotline-bling-drake-wear-your-voice-article.gif",
	"https://i.makeagif.com/media/12-16-2015/F2EkaD.gif",
	"https://media.giphy.com/media/XpOnIoIDxsfTy/200.gif",
	"https://31.media.tumblr.com/d130aa72cb5ab3cc87ea882c8b64a005/tumblr_mvsmeaGi9y1r54qfqo3_500.gif",
	"https://www.reactiongifs.com/r/oh_yeah_obama.gif",
	"https://i.imgur.com/rzjxx.gif",
	"https://media.giphy.com/media/HqhbTFSiL41H2/giphy.gif",
	"https://i.kinja-img.com/gawker-media/image/upload/s--VDzrItB0--/c_scale,f_auto,fl_progressive,q_80,w_800/nxucxv3fbmvd8syaujg6.gif",
	"https://media2.giphy.com/media/o15PHmvYmetdS/giphy.gif?response_id=5921763306be402873f4cfb8",
	"https://media.giphy.com/media/ZeOB7RGM9M8Ew/giphy.gif"];
	var images = imagesObject;
	for (key in images){
		var randomObamaPic = obamas[getRandomInt(0, obamas.length)];
		var alt = images[key].alt;
		var src = images[key].src;
		var srcset = images[key].src;
		if (alt !== undefined || alt === ""){
			var altCondition = alt.includes("Trump") || alt.includes("trump") || alt.includes("Drumpf") || alt.includes("drumpf");
			var srcCondition = src.includes("Trump") || src.includes("trump") || src.includes("Drumpf") || src.includes("drumpf");
			var srcsetCondition = srcset.includes("Trump") || srcset.includes("trump") || srcset.includes("Drumpf") || srcset.includes("drumpf");
			if (altCondition){
				try {
					images[key].attributes.src.nodeValue = randomObamaPic;
				} catch (error) {
					images[key].attributes.srcset.nodeValue = randomObamaPic;
				}
			}else if (srcCondition) {
				images[key].src = randomObamaPic;
			} else if (srcsetCondition){
				images[key].srcset = randomObamaPic;
			}
		}
	}
}

// Takes string text and replaces trump values
function replaceDrumpf(trump){
	trump = trump.replace(/\bTrump\b/g, "Drumpf");
	trump = trump.replace(/\btrump\b/g, "drumpf");
	return trump;
}

function getText(obj) {
    return obj.textContent ? obj.textContent : obj.innerText;
}

function setText(obj, text) {
    obj.textContent? obj.textContent = replaceDrumpf(text) : obj.innerText = replaceDrumpf(text);
}

// Takes DOM node objects and determines their types
function handleText(textNode)
{
	var nodeText = getText(textNode); //returns text

	setText(textNode, nodeText)

}
