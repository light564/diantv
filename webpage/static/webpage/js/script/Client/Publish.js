var Publish = (function(){
	this.PublishMsg = function(author, msg){
		var url = path+"publish/";
		var data = {
			"author" 	: 	author,
			"message" 	: 	msg
		};
		$.ajax({
			type: 	"POST",
			url : 	url,
			data: 	data,
			dataType: 	"json",
			success: function(data){
				console.log(data);
				console.log("finish");
				setTimeout(window.location.reload(true), 5000);
				// data = $.parseJSON(data);
			}
		});
	}
	return this;
})();