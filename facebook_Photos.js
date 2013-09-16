// アルバムのURL
var url = "http://graph.facebook.com/286174058086845/albums/";

var Album_url = Album_url;
var Photo_html = new Array();

//アルバムのid格納
var FB_Json_id = new Array();
var FB_Json_id_Num = Number(0);

//写真全部並べた時の横幅
var Photo_ul_width = Number(0);

//写真全部並べた時の横幅配列
var Photo_width = new Array();
var Photo_height = new Array();
var Photo_link = new Array();
var Photo_title = new Array();
var Photo_src = new Array();
var Photo_Num = new Array();

//すべての写真の枚数
var P_num = Number(0);

//カウンター
var count = Number(0);

function facebookJsonreader(){
	$.getJSON(url,function(json){
		$.each(json.data,function(i,FB_Json){
				FB_Json_id[FB_Json_id_Num] = FB_Json.id;

				//アルバムの数
				FB_Json_id_Num++;
			});
				//アルバムの数だけ読み込み
			for(var i = 0 ; i < FB_Json_id_Num ; i++){
				Album_url = "http://graph.facebook.com/" + FB_Json_id[i]  + "/photos";

				$.getJSON(Album_url,function(json){
					$.each(json.data,function(i,FB_Photo_Json){
							Photo_link[P_num] = FB_Photo_Json.link;
							Photo_title[P_num] = FB_Photo_Json.name;
							Photo_width[P_num] = FB_Photo_Json.images[0].width;
							Photo_height[P_num] = FB_Photo_Json.images[0].height;
							Photo_src[P_num] = FB_Photo_Json.images[0].source;
							Photo_Num = P_num;

							var value = Photo_title[P_num];  
							var percent = 1; 
							if(Photo_height[P_num] > Photo_width[P_num]){
								percent = 140/Photo_height[P_num]; 
							}else{
								percent = 140/Photo_width[P_num]; 
							}

							var heightPosition = Photo_height[P_num]*percent; 
							var widthPosition = Photo_width[P_num]*percent; 

							var topPosition = (140 - heightPosition)/2; 
							var leftPosition = (160 - widthPosition)/2; 

							value.replace(/\r\n/g, ""); 

							Photo_html.push('<li class="'+'photo photo_num'+ Photo_Num +'" style="left:'+ Number(Photo_ul_width) +'px;top:' + topPosition + 'px" ><a href="' + Photo_link[P_num] + '" target="_parent"><img src="' + Photo_src[P_num] + '" title="' + Photo_title[P_num] + '" height="'+ heightPosition +'" width="'+ widthPosition +'" style="margin-right:0px;" /></a></li>');
							Photo_ul_width = Photo_ul_width + Photo_width[P_num] + 10;

							P_num++;
						});
					//配列生成後、最後にapp
					$('#photos').html(Photo_html.join(''));
					//CSS形成へ
				});
			}
	});

	Photo_ul_CSS(Photo_ul_width);
};



function Photo_ul_CSS(Photo_ul_width){
	$("ul#photos").css("width",""+Photo_ul_width+"px");
	$("ul#photos").css("opacity","0");

		//alert($("ul#photos li").length);
}

//複数onload実行
function addEvent(elm,listener,fn){
	try{
		elm.addEventListener(listener,fn,false);
	}catch(e){
		elm.attachEvent("on"+listener,fn);
	}
}

facebookJsonreader();
addEvent(window,"load",function(){gotoMove(P_num)});
