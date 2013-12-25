var Blog = (function(){
	/*外部可调用*/
	this.GetBlog = function(conf){
		var url = path+"bloglist/";
		var data = {
			"number" 	: 	number
		};
		$.ajax({
			type: 	"POST",
			url : 	url,
			data: 	data,
			dataType: 	"json",
			timeout: 30000,
			success: function(data){
				console.log(data);
				if(data["ErrorMessage"]){
					if(conf == "Init"){
						$("#screen").fadeOut("3000",function(){
							setTimeout(function(){
								Animation.BlogAnimation();
								GetBlog();
							}, 10000);
						});
						return;
					}
					setTimeout(function(){
						Animation.BlogAnimation();
					}, 10000);
					setTimeout(function(){
						$("#screen").fadeIn("3000",function(){
							for(var i = 1; i <= number; i++){
								$("#post-"+i).remove();
								// console.log("left: "+ parseFloat($("#post-"+i).css("left")));
								// $("#post-"+i).css("left", parseFloat($("#post-"+i).css("left"))-499)
							}
							number = 0;
							GetBlog("Init");
						})
					}, 21000);
					return;
				}
				if(conf == "Init"){
					Init(data);
					return;
				}
				ShowBlog(data);
			},
			error: function(){
				console.log("error");
				GetBlog(conf);
				return;
			}
		});
	}
	/*仅内部调用*/
	var ShowBlog = function(data){
		var author = data["Author"];
		var msg = data["Content"];
		var time = data["PublishData"];

		author = CheckContent.RemoveNode(author);
		msg = CheckContent.RemoveNode(msg);

		var div_str;

		number++;
					
		var content_height = $("#content-body-frame1").height();
		var div_frame3_height = GetDivHeight("frame3");

		var div_str = PostContent(author, msg, time, number);
		$(div_str).appendTo("#content-body");
					
		if($("#post-"+number).height()+div_frame3_height <= content_height){
			$("#post-"+number).css("top", div_frame3_height);
			$("#post-"+number).addClass("frame3");
			$("#post-"+number).removeClass("hide");
		}
		else{
			$("#post-"+number).remove();
			number--;
			setTimeout(function(){
				Animation.BlogAnimation();
				GetBlog();
			}, 10000);
			return;
		}
		GetBlog();
	}

	var Init = function(data){
		var author = data["Author"];
		var msg = data["Content"];
		var time = data["PublishData"];

		author = CheckContent.RemoveNode(author);
		msg = CheckContent.RemoveNode(msg);

		var div_str;
		number++;

		var div_frame1_height = GetDivHeight("frame1");
		var content_height = $("#content-body-frame1").height();
		var div_frame2_height = GetDivHeight("frame2");
		var div_frame3_height = GetDivHeight("frame3");

		var div_str = PostContent(author, msg, time, number);
		$(div_str).appendTo("#content-body");

		if($("#post-"+number).height()+div_frame1_height <= content_height){
			$("#post-"+number).addClass("frame1");
			$("#post-"+number).removeClass("hide");
			$("#post-"+number).css("top", div_frame1_height);
		}
		else if($("#post-"+number).height()+div_frame2_height <= content_height){
			$("#post-"+number).addClass("frame2");
			$("#post-"+number).removeClass("hide");
			$("#post-"+number).css("top", div_frame2_height);
		}
		else if($("#post-"+number).height()+div_frame3_height <= content_height){
			$("#post-"+number).addClass("frame3");
			$("#post-"+number).removeClass("hide");
			$("#post-"+number).css("top", div_frame3_height);
		}
		else{
			$("#post-"+number).remove();
			number--;
			$("#screen").fadeOut("3000",function(){
				setTimeout(function(){
					Animation.BlogAnimation();
					GetBlog();
				}, 10000);
			});
			return;
		}
		GetBlog("Init");
	}

	var GetDivHeight = function(css){
		var div = $("."+css);
		if(div.length == 0){
			return 0;
		}

		var div_height = 0;

		for(var i = 0; i < div.length; i++){
			div_height += 40+$(div[i]).height();
		}
		return div_height
	}

	var PostContent = function(author, msg, time, id){
		author = author || "匿名(700)";
		time = time || "2013年12月02日00:25:03";
		time = time.substring(0, 19);

		if(!msg)
			return;
		var div_str = "<div id='post-"+id+"' class='post-body hide'>"+
							"<div class='post-author'>"+
								author+
							"</div>"+
							"<div class='box'>"+
								"<div class='post-message'>"+
									msg+
								"</div>"+
								"<div class='post-time'>"+
									time+
								"</div>"+
							"</div>"+
						"</div>";
			return div_str;
		}

	return this;
})();