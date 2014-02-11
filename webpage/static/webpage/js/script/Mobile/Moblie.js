$(document).ready(function(){
	var string1 = "说点好玩的吧～";
	var string2 = "匿名";
	var number = 0;

	$("#publish-msg").focus(function(){
		var temp = $("#publish-msg");
		if(temp.val() == string1){
			temp.val("");
		}
		temp.css("color","#000");
		temp.blur(function(){
			var temp = $("#publish-msg");
			if(temp.val() == ""){
				temp.val(string1);
			}
			temp.css("color","#d9d9d9");
		});
	});

	$("#publish-author").focus(function(){
		var temp = $("#publish-author");
		if(temp.val() == string2){
			temp.val("");
		}
		temp.css("color","#000");
		temp.blur(function(){
			var temp = $("#publish-author");
			if(temp.val() == ""){
				temp.val(string2);
			}
			temp.css("color","#d9d9d9");
		});
	});

	if(localStorage["UserName"]){
		$("#publish-author").val(localStorage["UserName"]);
		string2 = localStorage["UserName"];
	}

	$("#submit").bind("touchstart",function(){
		var author = $("#publish-author").val();
		var msg = $("#publish-msg").val();
		if(CheckInput(author, msg) == 1){
			PublishMsg(author, msg);
		}
	});

	GetBlog();

	function PublishMsg(author, msg){
		var url = path+"publish/";
		localStorage["UserName"] = author;
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

	function GetBlog(){
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

	function ShowBlog(data){
		var author = data["Author"];
		var msg = data["Content"];
		var time = data["PublishData"];

		author = RemoveNode(author);
		msg = RemoveNode(msg);

       	if(number >= 10){
       		return;
       	}
       	number++;
       	var div_str = PostContent(author, msg, time, number);
       	$(div_str).appendTo("#post-body");
       	GetBlog();
	}


	function CheckInput(author, msg){
		if(author.length > 15){
			alert("作者不要超过15个字")
			return 0;
		}
		if(msg.length > 140){
			alert("正文不要超过140个字")
			return 0;
		}
		return 1;
	}

	function RemoveNode(str){
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

	function PostContent(author, msg, time, id){
		var year = time.substring(0, 4);
		var month = time.substring(5, 7);
		var day = time.substring(8, 10);
		time = time.substring(11, 19);
		id = number;
		if(!msg)
			return;
		var div_str = "<div id='post-"+id+"' class='post-box'>"+
							"<div class='author'>"+
								author+" :"+
							"</div>"+
							"<div class='post-msg'>"+
								msg+
							"</div>"+
							"<div class='time'>"+
								year+"年"+month+"月"+day+"日"+
							"</div>"+
					"</div>";
		return div_str;
	}
});
