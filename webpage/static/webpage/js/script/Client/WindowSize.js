var WindowSize = (function(){
	this.EleResize = function(){
		var width = $("#main").css("margin-left");
		width = parseFloat(width) > 0 ? parseFloat(width) : 0;
		$("#bg-left").css("width", width);

		width = $("#main").css("margin-right");
		width = parseFloat(width) > 0 ? parseFloat(width) : 0;
		$("#bg-right").css("width", width);

		var height = $(document).innerHeight();//window包含了滑动条长度  

		$("#body").css("min-height", height-90-144-parseFloat($("#body").css("margin-bottom")));//高度的循环增加是因为document.innerHeight包含了margin
		Blog.DrawLine();
	}
	return this;
})();