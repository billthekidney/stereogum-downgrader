(function() {

function isEmpty(node) {
    return !node || node.length == 0;
}

function getNoBonusBeatsTargetNode() {
    var targetNodes = document.getElementsByClassName("article-author");
    if (isEmpty(targetNodes)) {
	console.log("QQQ: No article-author class");
	return null;
    }
    return targetNodes.item(0);
}

function getTargetNode() {
    var strongs = document.getElementsByTagName("strong");
    if (!strongs) {
	console.log("QQQ: No strong elements");
	return getNoBonusBeatsTargetNode();
    }
    var lim = strongs.length;
    for (var i = 0; i < lim; i++) {
	let strong = strongs.item(i);
	if (strong && strong.textContent.trim().startsWith("BONUS BEATS")) {
	    return strong;
	}
    }
    console.log("QQQ: No BONUS BEATS");
    return getNoBonusBeatsTargetNode();
}

function downgrade() {
    var rating = document.getElementsByClassName("post-carousel-hero__rating");
    if (isEmpty(rating)) {
	console.log("stereogum downgrader: No rating");
	return false;
    }
    rating = rating.item(0);
    var span = rating.getElementsByTagName("span");
    if (isEmpty(span)) {
	console.log("stereogum downgrader: No span in rating");
	return false;
    }
    span = span.item(0);
    var textContent = span.textContent;
    if (!textContent.match(/^[0-9\.]+\/10+$/)) {
	console.log("stereogum downgrader: Not a rating: <" + textContent + ">");
	return false;
    }
    var targetNode = getTargetNode();
    if (!targetNode) {
	return false;
    }

    var p = document.createElement("p");
    p.setAttribute("style", "margin-after:24pt;")
    p.innerHTML = "<strong>GRADE:</strong> " + textContent.trim();

    targetNode.parentNode.insertBefore(p, targetNode);
    p = document.createElement("p");
    p.innerHTML = " ";
    targetNode.parentNode.insertBefore(p, targetNode);

    rating.parentNode.removeChild(rating);
}
    try {
	downgrade();
    }catch(ex) {
	console.log("stereogum downgrader: Error downgrading");
	console.log("stereogum downgrader: " + ex);
    }

})();
