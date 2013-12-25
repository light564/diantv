var CheckContent = (function(){
	this.RemoveNode = function(str){
		var dom = $("<p>"+str+"</p>");
		for(var i = 0; i < dom.length; i++){
			if(dom[i].nodeName == "SCRIPT"){
				return "此人恶意插入js";
			}
		}
		if(dom.find('script').length > 0){
			return "此人恶意插入js";
		}
		return $(dom).html();
	}
	return this;
})();