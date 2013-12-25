var Notice = (function(){
	var notice_show;
	var notice_right;
	/*Notice动画*/
	this.ShowNotice = function(){
		notice_show = $(".notice-show");
		notice_right = $(".notice-out-right");
		notice_show.removeClass("notice-show")
		notice_show.addClass("notice-out-left");
		notice_show.bind('webkitTransitionEnd',function(){
			notice_show.unbind('webkitTransitionEnd');
			notice_show.css("-webkit-transition-duration", "0s");
			notice_show.removeClass("notice-out-left");
			notice_show.addClass("notice-out-right");
			notice_show.css("left");//此处必须有  不知为何
			notice_show.css("-webkit-transition-duration", "8s");
			var noticeid = notice_show.attr("id");
			noticeid = parseInt(noticeid[noticeid.length-1]);
			GetNotice(noticeid);
		});

		notice_right.removeClass("notice-out-right")
		notice_right.addClass("notice-show");
		notice_right.bind('webkitTransitionEnd',function(notice){
													notice_right.unbind('webkitTransitionEnd');
													setTimeout(function(){
																	ShowNotice()
													}, 4000);
		});
	}
	/*从服务器获取公告   0为最近 依次类推*/
	this.GetNotice = function(id){
		var url = path+"notice/";
		var data = {
			"number" 	: 	id-1
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
				PostNotice(data["Content"],id);
			},
			error: function(){
				console.log("error");
				setTimeout(function(){
								GetNotice(id);
				}, 4000);
				return;
			}
		});
	}
	/*将获取到的公告粘贴到对应位置*/
	var PostNotice = function(msg, id){
		$("#notice-msg-"+id).text(msg);
	}

	return this;	
})();