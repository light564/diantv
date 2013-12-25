var WindowSize = (function(){
	this.CheckWindow = function(){
		if(window.innerHeight < 763 || window.innerHeight > 773 || window.innerWidth < 1019 || window.innerWidth > 1024){
			$("body").empty();
			var alert_msg = "<div class='alert-msg'>"+
								"请使用1024*768窗口大小<a href=''>访问</a>此页面<br>"+
								"当前窗口大小为: "+
									"<div id='win-width'>width: "+window.innerWidth+"</div>"+
									"<div id='win-height'>height: "+window.innerHeight+"</div>"+
							"</div>";
			$(alert_msg).appendTo("body");
			$(window).unbind("resize");
			$(window).resize(function(){
				$("#win-width").text("width: "+window.innerWidth);
				$("#win-height").text("height: "+window.innerHeight);
			});
			return;
		}
	}
	return this;
})();