var Blog = (function(){
	this.GetBlog = function(){
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
				// data = $.parseJSON(data);
				if(data["ErrorMessage"]){
					return;
				}
				ShowBlog(data);
			},
			error: function(){
				console.log("error");
				GetBlog();
				return;
			}
		});
	}

	this.DrawLine = function(){
		var height = $("#body").css("height");//window包含了滑动条长度

		height = parseFloat(height) > 0 ? parseFloat(height) : 0;

		$("#post-body-center").css("height", height-53+20);
	}

	var ShowBlog = function(data){
		var author = data["Author"];
		var msg = data["Content"];
		var time = data["PublishData"];

		author = CheckContent.RemoveNode(author);
		msg = CheckContent.RemoveNode(msg);

		if(msg.length == 0){
           	number++;
           	GetBlog();
           	return;
       	}

		var div_str;
		var point;

		var div_left_height = GetDivHeight("post-body-left");
		var div_right_height = GetDivHeight("post-body-right");

		if(div_left_height - div_right_height >= 90){
			div_str  = PostContent(author, msg, time, number, "left");
			point  = PostPoint(number);
			$(div_str).appendTo("#post-body-right");
			$(point).appendTo("#post-body-center");
			var top = parseFloat($("#post-"+number).position().top)+41+24;
			$("#point-"+number).css("top",top);
		}
		else{
			div_str  = PostContent(author, msg, time, number, "right");
			point  = PostPoint(number);
			$(div_str).appendTo("#post-body-left");
			$(point).appendTo("#post-body-center");
			var top = parseFloat($("#post-"+number).position().top)+18+24;
			$("#point-"+number).css("top",top);
		}
		number++;
		DrawLine()
		GetBlog();
	}

	var GetDivHeight = function(id){
		var div = $("#"+id+" .post-box");
		var div_height = 0;

		for(var i = 0; i < div.length; i++){
			div_height += 24+parseFloat($(div[i]).height());
		}
		return div_height
	}

	var PostContent = function(author, msg, time, id, triangle){
		// author = author || "匿名(700)";
		// time = time || "2013-12-02 00:25:03";
		var year = time.substring(0, 4);
		var month = time.substring(5, 7);
		var day = time.substring(8, 10);
		var like = 0;
		var dislike = 0;
		time = time.substring(11, 19);
		id = number;
		if(!msg)
			return;
		var div_str = "<div id='post-"+id+"' class='post-box'>"+
						"<div class='post-body'>"+
							"<div class='author'>"+
								author+":"+
							"</div>"+
							"<div class='post-msg'>"+
								msg+
							"</div>"+
							"<div class='msg-info'>"+
								"<div class='comment left'>"+
									"<div class='like left hide'>"+
										"<img src='/static/webpage/img/dianTV_client/like1.png'>"+
										"<div class='like-num left'>("+like+")</div>"+
									"</div>"+
									"<div class='dislike left hide'>"+
										"<img src='/static/webpage/img/dianTV_client/dislike1.png'>"+
										"<div class='dislike-num left'>("+dislike+")</div>"+
									"</div>"+
								"</div>"+
								"<div class='time left'>"+
									year+"年"+month+"月"+day+"日"+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div class='triangle'>"+
							"<img src='/static/webpage/img/dianTV_client/triangle_"+triangle+".png'>"+
						"</div>"+
					"</div>";
		return div_str;
	}

	var PostPoint = function(id){
		var point = "<div id='point-"+id+"' class='point'>"+
						"<img src='/static/webpage/img/dianTV_client/green_point.png'>"+
					"</div>";
		return point;
	}

	return this;
})();