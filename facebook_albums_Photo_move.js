var P_num;
var Now_P_num = Number(1);
var Now_P_num_X = Number(0);
var Now_P_num_Y = Number(0);

var photo_Height = Number(120);
var photo_Width = Number(140);


function gotoMove(P_num){

	Now_P_num++;

	$("ul#photos").animate({"opacity": "1"}, 3000);
	if(Now_P_num > P_num){
		Now_P_num = 0;
		}

	facebook_albums_Photo_move(P_num);
}

function facebook_albums_Photo_move(P_num){
			//前後の数値
			var Pre_P_num = Now_P_num - 1;
				if(Pre_P_num < 0){
					Pre_P_num = P_num-1;
				}

			var Pre_P_num_X = Number(0);
			var Pre_P_num_Y = Number(0);

			var Pre2_P_num = Now_P_num - 2;
				if(Pre2_P_num < 0){
					Pre2_P_num = P_num-1;
				}
			var Pre2_P_num_X = Number(0);
			var Pre2_P_num_Y = Number(0);

			var Next_P_num = Now_P_num + 1;
				if(Next_P_num >= P_num){
					Next_P_num = 0;
				}

			var Next_P_num_X = Number(0);
			var Next_P_num_Y = Number(0);

			var Next2_P_num = Number(0);
			var Next2_P_num_X = Number(0);
			var Next2_P_num_Y = Number(0);

			//今の中心
				var Now_P_num_thisClass = "photo_num" + Now_P_num ;
					Now_P_num_X = $("ul#photos").find("li." + Now_P_num_thisClass).find("img").attr("width");
					Now_P_num_X = parseInt(Now_P_num_X);
					Now_P_num_Y = $("ul#photos").find("li." + Now_P_num_thisClass).find("img").attr("height");
					Now_P_num_Y = parseInt(Now_P_num_Y);
					Now_P_num_Y = (photo_Height-Now_P_num_Y)/2;

			//次の中心
				var Next_P_num_thisClass = "photo_num" + Next_P_num;
					Next_P_num_X = ((photo_Width - Now_P_num_X )/2) + Now_P_num_X + 10;
					Next_P_num_Y = $("ul#photos").find("li." + Next_P_num_thisClass).find("img").attr("height");
					Next_P_num_Y = parseInt(Next_P_num_Y);
					Next_P_num_Y = (photo_Height-Next_P_num_Y)/2;

			//前の中心
				var Pre_P_num_thisClass = "photo_num" + Pre_P_num;
					Pre_P_num_X = $("ul#photos").find("li." + Pre_P_num_thisClass).find("img").attr("width");
					Pre_P_num_X = parseInt(Pre_P_num_X);
					Pre_P_num_X = ((photo_Width - Now_P_num_X )/2) - Pre_P_num_X - 10;
					Pre_P_num_Y = $("ul#photos").find("li." + Pre_P_num_thisClass).find("img").attr("height");
					Pre_P_num_Y = parseInt(Pre_P_num_Y);
					Pre_P_num_Y = (photo_Height-Pre_P_num_Y)/2;

			//前々の中心
				var Pre2_P_num_thisClass = "photo_num" + Pre2_P_num;
					Pre2_P_num_X = $("ul#photos").find("li." + Pre2_P_num_thisClass).find("img").attr("width");
					Pre2_P_num_X = parseInt(Pre2_P_num_X);
					Pre2_P_num_X = Pre_P_num_X - Pre2_P_num_X - 10;
					Pre2_P_num_Y = $("ul#photos").find("li." + Pre2_P_num_thisClass).find("img").attr("height");
					Pre2_P_num_Y = parseInt(Pre2_P_num_Y);
					Pre2_P_num_Y = (photo_Height-Pre2_P_num_Y)/2;

	for(var j = 0 ; j < P_num ; j++){
		switch(j){
			//今の中心
			case Now_P_num :
					Now_P_num_X = photo_Width - Now_P_num_X;
					Now_P_num_X = Now_P_num_X/2 + 10;
					$("ul#photos").find("li." + Now_P_num_thisClass).stop();
					$("ul#photos").find("li." + Now_P_num_thisClass).animate({
						opacity: "1.0",
						left: "" + Now_P_num_X + "px",
						top: "" + Now_P_num_Y + "px"},"slow");
				break;
			//次の中心
			case Next_P_num : 
					$("ul#photos").find("li." + Next_P_num_thisClass).stop();
					$("ul#photos").find("li." + Next_P_num_thisClass).animate({
						opacity: "0.3",
						left: "" + Next_P_num_X  + 5 + "px",
						top: "" + Next_P_num_Y + "px"}, "slow");
				break;
			//前の中心
			case Pre_P_num : 
					$("ul#photos").find("li." + Pre_P_num_thisClass).stop();
					$("ul#photos").find("li." + Pre_P_num_thisClass).animate({
						opacity: "0.3",
						left: "" + Pre_P_num_X  + 5 + "px",
						top: "" + Pre_P_num_Y + "px"}, "slow");
				break;
			//前々の中心
			case (Pre2_P_num) : 
					$("ul#photos").find("li." + Pre2_P_num_thisClass).stop();
					$("ul#photos").find("li." + Pre2_P_num_thisClass).animate({
						opacity: "0.3",
						left: "" + Pre2_P_num_X + 5 + "px",
						top: "" + Pre2_P_num_Y + "px"}, "slow");
				break;
			//その他すべての中心
			//次々の中心
			default : 
					var thisClass = "photo_num" + j;

					Next2_P_num_Y = $("ul#photos").find("li." + thisClass).find("img").attr("height");
					Next2_P_num_Y = parseInt(Next2_P_num_Y);
					Next2_P_num_Y = (photo_Height-Next2_P_num_Y)/2;

					$("ul#photos").find("li." + thisClass).find("a").css({"text-decoration": "none"});
					$("ul#photos").find("li." + thisClass).css({"left": "400px"});
					$("ul#photos").find("li." + thisClass).css({"opacity": "0.3"});
					$("ul#photos").find("li." + thisClass).css({"top": "" + Next2_P_num_Y + "px"});
				break;
		}
	}
}

//タイマーセット
setInterval("gotoMove(P_num)",3000);

