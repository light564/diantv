require.config({
	baseUrl: '/static/webpage/js',
	paths: {
		'jquery': 'lib/jquery-1.7.1.min',
		'Config': 'script/Client/Config',
		'WindowSize': 'script/Client/WindowSize',
		'CheckContent': 'script/Client/CheckContent',
		'Blog': 'script/Client/Blog',
		'Event': 'script/Client/Event',
		'Notice': 'script/Client/Notice',
		'Publish': 'script/Client/Publish'
	}
});

requirejs.config({
	shim: {
		'Config':{
			exports: 'Config'
		},
		'WindowSize':{
			deps:['jquery'],
			exports: 'WindowSize'
		},
		'CheckContent':{
			deps:['jquery'],
			exports: 'CheckContent'
		},
		'Blog':{
			deps:['jquery'],
			exports: 'Blog'
		},
		'Event':{
			deps:['jquery'],
			exports: 'Event'
		},
		'Notice':{
			deps:['jquery'],
			exports: 'Notice'
		},
		'Publish':{
			deps:['jquery'],
			exports: 'Publish'
		}
	}
});

require(['jquery','Config','WindowSize','CheckContent','Blog','Event','Notice','Publish'],function($,Config,WindowSize,CheckContent,Blog,Event,Notice,Publish){
	$(document).ready(function(){
		WinWidth = $("body").css("width");
		WinWidth = parseFloat(WinWidth);
		$("body").removeClass("hide");
		if(!$.browser.webkit){
			$("body").empty();
			var alert_msg = "<div class='alert-msg'>"+
								"请使用<a href='http://www.google.com/intl/zh-CN/chrome/'>Chrome浏览器</a>访问此页面"+
							"</div>";
			$(alert_msg).appendTo("body");
			return;
		}	
				
		Notice.GetNotice();
		
		$(window).resize(function(){
			var temp = $("body").css("width");
			temp = parseFloat(temp);
			WinWidth = temp < 1180 ? 1180 : temp;
			WindowSize.EleResize();
		});

		WindowSize.EleResize();
		Blog.GetBlog();

		if(localStorage["UserName"]){
			$("#publish-author").val(localStorage["UserName"]);
		}

		$(document).click(function(event){
			var target = event.target;
			if(target.id == "publish-button" || $(target).parent().attr("id") == "publish-button"){
				var author = $("#publish-author").val();
				var msg = $("#publish-msg").val();
				if(CheckContent.CheckInput(author, msg) == 1){
					Publish.PublishMsg(author, msg);
				}
				return;
			}

			if(target.id == "goto-top" || $(target).parent().attr("id") == "goto-top"){
				$(document).scrollTop(0);
				return;
			}

			if(target.id != "publish-msg" && target.id != "publish-author"){
				$("#msg-range").fadeOut("2000");
				$("#author-range").fadeOut("2000");
				$("#publish").fadeOut("3000",function(){
					var temp = $("#show-input");
					temp.fadeIn("3000");
					temp.val(string1);
				});
			}
			//赞和踩
			if(target.nodeName == "IMG"){
				var src = $(target).attr("src");
				src = src.replace(/like1/,"like2");
				$(target).attr("src",src);
				return;
			}
		});

		$("#show-input").focus(function(){
			$("#show-input").fadeOut("3000",function(){
				$("#publish").fadeIn("10",function(){
					$("#publish-msg").focus();
				});

				var temp = $("#publish-msg");
				if(temp.val() == ""){
					temp.val(string2);
					temp.css("color","#d9d9d9");
				}

				var temp = $("#publish-author");
				if(temp.val() == ""){
					temp.val(string3);
					temp.css("color","#d9d9d9");
				}
			});
		});

		$("#publish-msg").focus(function(){
			var temp = $("#publish-msg");
			if(temp.val() == string2){
				temp.val("");
			}
			temp.css("color","#000");
			$("#msg-range").fadeIn("2000");
			$("#author-range").fadeOut("2000");
		});

		$("#publish-author").focus(function(){
			var temp = $("#publish-author");
			if(temp.val() == string3){
				temp.val("");
			}
			temp.css("color","#000");
			$("#author-range").fadeIn("2000");
			$("#msg-range").fadeOut("2000");
		});
	});
});