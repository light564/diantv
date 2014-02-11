var CheckContent = (function(){
	this.CheckInput = function(author, msg){
		if(author.length > 15){
			alert("作者不要超过15个字")
			return 0;
		}
		if(author.length ==0 ){
			alert("作者不能为空");
			return 0;
		}
		if(msg.length > 140){
			alert("正文不要超过140个字");
			return 0;
		}
		if(msg.length == 0){
			alert("正文不能为空");
			return 0;
		}
		return 1;
	}

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
