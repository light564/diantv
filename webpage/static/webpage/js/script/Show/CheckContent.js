var CheckContent = (function(){
	this.RemoveNode = function(str){
		var dom = $("<msg>"+str+"</msg>");
		for(var i = 0; i < dom.length; i++){
			if(dom[i].nodeName == "SCRIPT"){
				return "此人恶意插入js";
			}
		}
		if(dom.find('script').length > 0){
			return "此人恶意插入js";
		}
		var result = "";
		for(var i = 0; i < dom.length; i++){
			if($(dom[i]).text() != "" || dom[i].nodeName != "p"){
				result += dom[i].outerHTML;
			}
		}
		return result;
	}
	return this;
})();