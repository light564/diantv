var Animation = (function(){
	this.BlogAnimation = function(){
		var delay = 0;
		var frmae = $(".frame1");
		for(var i = 0; i < frmae.length; i++){
			$(frmae[i]).addClass("animation");
			$(frmae[i]).css("-webkit-transition-delay", delay+"s");
			delay += 0.2;
			$(frmae[i]).addClass("frame0");
			$(frmae[i]).removeClass("frame1");
		}

		frmae = $(".frame2");
		for(var i = 0; i < frmae.length; i++){
			$(frmae[i]).addClass("animation");
			$(frmae[i]).css("-webkit-transition-delay", delay+"s");
			delay += 0.2;
			$(frmae[i]).addClass("frame1");
			$(frmae[i]).removeClass("frame2");
		}

		frmae = $(".frame3");
		for(var i = 0; i < frmae.length; i++){
			$(frmae[i]).addClass("animation");
			$(frmae[i]).css("-webkit-transition-delay", delay+"s");
			delay += 0.2;
			$(frmae[i]).addClass("frame2");
			$(frmae[i]).removeClass("frame3");
		}
	}
	return this;
})();