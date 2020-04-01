/**
 * @author mrdoob / http://mrdoob.com/
 */

Viewport.RightMenu = function ( editor ) {


	/*************************/
	/***添加tooltip的函数封装***/
	/************************/
	function tooltip_anim(id, text, direction, animateType, color) {
		var tooltip = new HTML5TooltipUIComponent;
		var target = document.getElementById(id);

		//预设没有传参的数据
		animateType = animateType === undefined ? "scalein" : animateType;
		color = color === undefined ? 'bamboo' : color;
		direction = direction === undefined ? 'left' : direction;
		tooltip.set({
			animateFunction: animateType,
			color: color,
			contentText: text,
			stickTo: direction,
			target: target
		});

		target.addEventListener('mouseenter', function () {
			tooltip.show();//鼠标在上面时显示tooltip
		});

		target.addEventListener('mouseleave', function () {
			tooltip.hide();//鼠标离开时取消显示
		});

		tooltip.mount();

		return tooltip;
	}

	/*旋转停止按钮*/
	var rotate_check = true;
	function rotate_stop() {
		if (rotate_check) {
			rotate_check = false; $("#stop_btn").attr("src", "https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_startalltask.ico");  //修改图标
			tooltip_stop.set({ contentText: "开始旋转" });//修改tooltip提示
			html5tooltips.refresh();
		} else {
			rotate_check = true; $("#stop_btn").attr("src", "https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_pausealltask.ico");//修改图标
			// tooltip_stop.set({contentText:'暂停旋转'});//修改tooltip提示
			html5tooltips.refresh();
		}
	}

	//使用JQuery实现按钮添加
	var tooltip_stop, tooltip_background;
	var main_toggle = true;

	//添加按钮的CSS样式
	var main_css = $("<style></style>").text("#container{position:absolute;width:100%;height:5%;margin-top:40% ;right:25%;}#logo{position:absolute;width:40%;left:40%;top:30%;} #main{position: fixed;bottom: 20px;right: 20px;padding: 1px 15px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;transition: transform 0.2s linear;}  #main:hover {cursor: pointer;opacity: 1;transform: rotate(180deg);}#help_btn {position: fixed;bottom: 100px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#full_btn {position: fixed;bottom: 150px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#share_btn {position: fixed;bottom: 200px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#stop_btn {position: fixed;bottom: 250px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}#origin_btn {position: fixed;bottom: 300px;right: 30px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}     #color_dark_btn {position: fixed;bottom: 200px;right: 80px;padding: 5px 5px;color: #fff;background-color: #89a;opacity: 0.7;border-radius: 50%;font-size: 50px;cursor:pointer;}    #blocker {position: absolute; top:0px;width: 100%;height: 100%;background-color: rgba(0,0,0,0.5);}    #instructions {width: 100%;height: 100%;display: -webkit-box;display: -moz-box;display: box;-webkit-box-orient: horizontal;-moz-box-orient: horizontal;box-orient: horizontal;-webkit-box-pack: center;-moz-box-pack: center;box-pack: center;-webkit-box-align: center;-moz-box-align: center;box-align: center;color: #ffffff;text-align: center;cursor: pointer;}");

	$("body").append(main_css);

	//添加按钮
	$("body").after("<button id='main'>+</button>");
	$("#main").css("opacity","0");
	$("#main").click(()=>{
		/*主菜单 显示按钮功能*/
		$("#help_btn").fadeToggle(100);
		$("#full_btn").fadeToggle(200);
		$("#share_btn").fadeToggle(300);
		$("#stop_btn").fadeToggle(400);
		$("#origin_btn").fadeToggle(500);
		main_toggle = !main_toggle
	});
	$("#main").hover(function(){
		$("#main").animate({"opacity":"1"});
	},function(){
		if (main_toggle)
		$("#main").animate({"opacity":"0"});
	});

	tooltip_anim("main", "主菜单");
	
	$("body").after("<img id='help_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/information.ico' width='32px' height='32px' onclick='help_display()'>")

	tooltip_anim("help_btn", "帮助");//添加按钮tooltip

	$("#help_btn").hide();//隐藏按钮

	$("body").after("<img id='full_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/statusNotDone.ico' width='32px' height='32px' onclick='full_screen_fun()'>")

	tooltip_anim("full_btn", "全屏");//添加按钮tooltip

	$("#full_btn").hide();//隐藏按钮

	$("body").after("<img id='share_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/flag.ico' width='32px' height='32px' onclick='share_display()'>")

	tooltip_background = tooltip_anim("share_btn", "背景颜色");//这里用这个无法删除改变按钮

	$("#share_btn").hide();//隐藏按钮

	$("body").after("<img id='stop_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/jumplist_pausealltask.ico' width='32px' height='32px' onclick='rotate_stop()'>")

	tooltip_stop = tooltip_anim("stop_btn", "暂停旋转");//添加按钮tooltip

	$("#stop_btn").hide();//隐藏按钮

	$("body").after("<img id='origin_btn' src='https://blog-1257068932.cos.ap-guangzhou.myqcloud.com/OPENGL_homework/ico/sync.ico' width='32px' height='32px'onclick='origin_position()'>")

	tooltip_anim("origin_btn", "初始位置");//添加按钮tooltip

	$("#origin_btn").hide();//隐藏按钮

	html5tooltips.refresh();//通过这个刷新tooltip 方可正常显示

	
	/*******************************************************/
	/*******************************************************/
	/*******************************************************/
	// signals.objectAdded.add( update );
	// signals.objectRemoved.add( update );
	// signals.geometryChanged.add( update );

	// function update() {

	// }

	// return container;

};