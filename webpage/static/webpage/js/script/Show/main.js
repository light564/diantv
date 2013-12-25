require.config({
	baseUrl: '/static/webpage/js',
	paths: {
		'jquery': 'lib/jquery-1.7.1.min',
		'Config': 'script/Show/Config',
		'WindowSize': 'script/Show/WindowSize',
		'CheckContent': 'script/Show/CheckContent',
		'Animation': 'script/Show/Animation',
		'Blog': 'script/Show/Blog',
		'Event': 'script/Show/Event',
		'Notice': 'script/Show/Notice'
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
		'Animation':{
			deps:['jquery'],
			exports: 'Animation'
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
		}
	}
});

require(['jquery','Config','WindowSize','CheckContent','Animation','Blog','Event','Notice'],function($,Config,WindowSize,CheckContent,Animation,Blog,Event,Notice){
	$(document).ready(function(){
		WindowSize.CheckWindow();
		Notice.GetNotice(1);
		Notice.GetNotice(2);

		$(window).resize(function(){
					WindowSize.CheckWindow()
		});

		Blog.GetBlog("Init");

		setTimeout(function(){
						Notice.ShowNotice()
		}, 4000);
	});
});