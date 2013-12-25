var Notice = (function(){
	this.GetNotice = function(){
		var url = path+"notice/";
		var data = {
			"number" 	: 	0
		};
		$.ajax({
			type: 	"POST",
			url : 	url,
			data: 	data,
			dataType: 	"json",
			timeout: 30000,
			success: function(data){
				console.log(data);
				// data = $.parseJSON(data);
				if(data["ErrorMessage"]){
					return;
				}
				PostNotice(data["Content"]);
			},
			error: function(){
				console.log("error");
				GetNotice();
				return;
			}
		});
	}

	var PostNotice = function(msg){
		$("#notice-msg").text(msg);
	}
	return this;
})();