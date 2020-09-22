$(document).ready(function(){

	cropS();
	calendar();
	datepicker();
	star();
	selectBox();
	progress();
	textcount();
	upload();
	top_btn();

});

$(window).scroll(function(){

	top_btn();

});


function cropS(){
	$(".cropImg").each(function () {
		cropH =  $(this).parent().height();
		imgLink = 'url(' + $(this).attr('src') + ')',
		cropBox = $('<div class="cropBox"></div>');

		$(this).parent().prepend(cropBox);

		cropBox.css({
		  'height'                : cropH,
		  'background-image'      : 'url(' + $(this).attr('src') + ')',
		  'background-size'       : 'cover',
		  'background-repeat'     : 'no-repeat',
		  'background-position'   : 'center center',
		  'filter'                : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  $(this).attr('src') + ",sizingMethod='scale')",
		  '-ms-filter'            : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +  $(this).attr('src') + "',sizingMethod='scale')",
		});


		$(this).remove();

	});

	$(window).resize(function(){
		$(".cropImg").each(function(){
			cropH =  $(this).parent().height();
			$(this).siblings(".cropBox").css({
			  'height'                : cropH,
			});
		});
	});
}


function calendar(){

	$('.calendar').fullCalendar({

		buttonText: {
			prev: '이전달', // <
			next: '다음달', // >
			today: '오늘',
			month: '월',
			week: '주',
			day: '일'
		},
		defaultView: 'month',
		header: {
			left: '',
			center: 'prev title next',
			right: ''
		},
		monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		eventLimit: true,
		events: [
			{
				title: '[원격] CNC밀링(머시닝센터) 조작',
				start: '2020-06-01',
				end: '2020-06-19',
				color: '#d04040'
			}, {
				title: '[집체] 리눅스 서버 구축(기본)',
				start: '2020-05-25',
				end: '2020-06-07',
				color: '#0d7fa0'
			}, {
				title: '[집체] 모듈2. HMI 시스템 응용 HMI프로그램 개발',
				start: '2020-06-05',
				end: '2020-07-05',
				color: '#3c5bb2'
			}, {
				title: '[집체] C언어 I_2',
				start: '2020-06-05',
				end: '2020-07-05',
				color: '#448405'
			}, {
				title: '[집체] 디자인 아이디어 발상의 기초',
				start: '2020-06-05',
				end: '2020-06-28',
				color: '#555555'
			},
		],
	});

};



var popupH, popupF;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|"; // PC 버전 구분
	if(m == "close"){
		$(n).hide();
		$("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				$("body").css("position","static");
				$(document).scrollTop(scrollH);
			}
		}
	}else{
		$(n).show(0,function(){
			popupW = $(n).find(".popup_BoxIn").width();
			popupH = $(n).find(".popup_BoxIn").outerHeight();
			winH = $(window).outerHeight();
			winW = $(window).outerWidth();
			$(n).find(".popupCBoxIn").wrapInner("<div class='popupCBoxInS'></div>");

			if(h == "auto"){
				popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;

				if(winH < popupH-100){
					$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
				}

				$(n).find(".popupCBoxInS").css({"max-height" : popH });
			}
			if(w < winW-100){
				$(n).find(".popup_Box").css({"width":w});
			}else{
				$(n).find(".popup_Box").css({"width":"95%"});
			}

			scrollH = $(document).scrollTop();

			$("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					$("body").css("position","fixed");
				}
			}
		});
	}

	$(window).resize(function(){
		popupW = $(n).find(".popup_BoxIn").width();
		popupH = $(n).find(".popup_BoxIn").outerHeight();
		winH = $(window).outerHeight();
		winW = $(window).outerWidth();

		if(h == "auto"){
			popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;

			if(winH < popupH-100){
				$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
			}

			$(n).find(".popupCBoxInS").css({"max-height" : popH });
		}
		if(w < winW-100){
			$(n).find(".popup_Box").css({"width":w});
		}else{
			$(n).find(".popup_Box").css({"width":"95%"});
		}
	});
}

function winPop(){
	popH = $(window).outerHeight() - parseInt($(".windowPopH").outerHeight()) - parseInt($(".windowPopBtn").outerHeight());
	$(".windowPopBox").css("height",popH-80 + "px");
	$(".windowPopBox").closest("html").css("overflow","hidden");
}


/* textcount */
function textcount(){

	$('.textareaBox.count').keyup(function (e){

		var content = $(this).find("textarea").val();
		var count = $(this).find(".textCount");

		count.find(".num").text(content.length);

		if (content.length > 80){

			alert("최대 80자까지 입력 가능합니다.");
			$(this).val(content.substring(0, 80));
			count.html("<span class='num'>80</span> / <small>80</small>");
		}

	});

};
/* EOD : textcount */

/* file upload */
function upload(){

	var fileTarget = $('.filebox .upload-hidden');

	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}

		$(this).siblings('.upload-name').val(filename);
	});

}
/* EOD : file upload */


/* selectBox  */
function selectBox(){

	$(".selectBox").each(function () {
		var basicTxt = $(this).find("option:first").text();

		$(this).find("label").find("span").text(basicTxt);

		if ($(this).hasClass("disabled")) {

			$(this).find("select").attr('disabled', 'true');

		}
	});

	$(".selectBox select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
	});

};
/* EOD : selectBox  */

/* 아코디언 스크립트 */

$(document).on('click',".accordion .aco_hd > a",function(){
	if($(this).closest("li").hasClass("active")){

		$(this).closest("li").removeClass("active");
		$(this).parent(".aco_hd").siblings(".aco_con").slideUp(450);

	}else{

		$(this).find(".accordion li").removeClass("active");
		$(this).find(".acoBox .aco_con").slideUp(450);
		$(this).closest("li").addClass("active");
		$(this).parent(".aco_hd").siblings(".aco_con").slideDown(450);
	}
});

/* EOD : 아코디언 스크립트 */



/* 탭 스크립트 */

function tab(targetClass, targetId, obj){

	$(obj).closest("li").siblings("li").removeClass("active");
	$(obj).closest("li").addClass("active");
	$("." + targetClass).removeClass("active");
	$(targetId).addClass("active");

}

/* EOD : 아코디언 스크립트 */


/* table tree open & hide 스크립트 */

$(document).on('click',".table_tree .btn_tree",function(){


	classN = $(this).closest("tr").attr("class");
	classStr = classN.replace(/[1-9]/g,"");
	classNum = parseInt(classN.replace(/[a-z]/gi,""));
	classNext = classStr + (classNum+1);
	classPrev = classStr + (classNum-1);

	indexN = $(this).closest("tr").index();

	$(this).closest("table").find("td").css("background","transparent");

	if($(this).closest(".depBox").hasClass("on")){
		listN = $(this).closest("table").find("tbody tr").length-1;
		i=0;
		while(i<listN){
			i++;
			taN = $(this).closest("table").find("tbody tr").eq(indexN+i).attr("class");
			nextN = $(this).closest("table").find("tbody tr").eq(indexN+i).attr("class");

			if(typeof taN != "undefined"){
				if(parseInt(taN.replace(/[a-z]/gi,"")) > classNum){

					$(this).closest("table").find("tbody tr").eq(indexN+i).hide();
					$(this).closest("table").find("tbody tr").eq(indexN+i).find(".depBox").removeClass("on");

				}else{
					break;
				}

			}else{
				break;
			}
		}
		$(this).closest("tr").find(".depBox").removeClass("on");
	}else{
		$(this).closest("tr").nextUntil("."+classN, "."+classNext).show().find("td").css("background","#f3f5f7");
		$(this).closest("tr").find("td").css("background","#ffe9f1").find(".depBox").addClass("on");
	}
});
/* EOD : table tree open & hide 스크립트 */



/* progress 스크립트 */

function progress(){

	$(".progressWrap").each(function(index){

		percent = $(this).find(".progressPer .num").text(); // 퍼센트 데이터
		speedTurm = 1.5 + (1 * index); // progress 속도 및 간격
		txtTurm = speedTurm * 1000; // 퍼센트 데이터 속도


		$(this).find(".progressBar .bar").css({
			"width" : percent + "%",
			"transition" : "width " + speedTurm +"s ease"

		});

		$(this).find(".num").prop('Counter',0).animate({
			Counter: $(this).find(".progressPer .num").text()
		}, {
			duration: txtTurm,
			easing: 'swing',
			step: function (now) {
				$(this).text(now.toFixed(0)); // 소수점 자리 조절
			}
		});
	});

}

/* EOD : progress 스크립트 */



/* 별점 스크립트 */

function star(){

	$(".starScore").each(function(){

		var score = Math.round($(this).find(".num").text()) * 20 + "%";

		$(this).find(".point").css("width",score);

	});
}

/* EOD : 별점 스크립트 */

/* datepicker 스크립트 */

function datepicker(){

	var datepicker_year = new Date();

	/* datepicker 한국어 세팅 */
	$.datepicker.setDefaults({
		dateFormat: "yy-mm-dd",
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '',
		changeMonth: true,
		changeYear: true,
		buttonImageOnly : false,
		yearRange: (datepicker_year.getFullYear()-90) + ':' + (datepicker_year.getFullYear())
	});

	$(".datepicker").datepicker();
}

/* EOD : datepicker 스크립트 */


/* top_btn */
function top_btn(){

	var windowS = $(window).scrollTop();


    if(windowS >= $(".headerLayout").innerHeight()){

		$(".top_btn").find("a").addClass("on");

	}else{

		$(".top_btn").find("a").removeClass("on");

	}

	$('.top_btn a').click(function() {
		$("html, body").stop().animate({scrollTop:0}, 500);
	})

}
/* EOD : top_btn */


$.fn.chart = function(opts){

	var defaults = {
		type : 'vertical', // horizontal, vertical
		speed :    3000, // bar animation speed
		speedTurm : 500, // bar animation turm speed
		height :    200, // chart height
		barHeight : 20,  // bar height, 짝수만
		barColor: ["#d04040","#0d7fa0","#448405","#3c5bb2","#555555"], // bar color

		// 기준점
		markStart : 10, // 기준점 시작
		markEnd : 100, // 기준점 마지막
		markInterval : 5, // 기준점 간격

		// 데이터 & 기준점 //  show & hide
		dataView : true, // true , false
		markView : true // ture, false
	}

	var opts = jQuery.extend(defaults, opts); // option
	var tN = $(this); // chart

	var markS = opts.markEnd - opts.markStart; // 시작점 구하기
	var lineN = markS/opts.markInterval; // 기준점 개수 파악
	var lineH = 100 / lineN; // 기준점의 높이 파악
	var markN = lineN + 1; // 범례 개수
	var dataL = opts.data.length; // 데이터 개수 파악

	tN.css('height',opts.height + 'px'); // 차트 높이 부여


	/* 세로형 차트 */
	if(opts.type == "vertical"){

		tN.addClass("veti");

		chartWrap = "";
		chartWrap += "<div class='chartWrap'>";
		chartWrap +=   "<div class='chartArea'>";
		chartWrap +=     "<div class='chartBox'>";

		tN.append(chartWrap);

		/* 범례 그리기 */

		if(opts.markView == true){

			tN.find(".chartWrap").prepend("<ul class='markArea'>");

			for(var i = 0; i < markN; i++) {

				var numTxt = opts.markStart + (opts.markInterval * i);

				tN.find(".markArea").prepend("<li><span class='num'>" + numTxt + "</span></li>");

			}

			tN.find(".markArea").find("li").css('height', lineH + '%');

		}

		/* EOD : 범례 그리기 */

		/* 바 & 라벨 그리기 */

		for(var i = 0; i < dataL; i++) {

		  var dataTxt = opts.data[i].value; // 데이터값 가져오기
			var dataT = opts.data[i].title; // 타이틀값 가져오기

			veti_pro = "";
			veti_pro += "<div class='progressBox'>";
		  veti_pro    += "<div class='bar'>";

			if(opts.dataView == true){ // 데이터 표기


        veti_pro   += "<div class='data'>" + dataTxt + "</div>";

			}

		  veti_pro     += "</div>";
		  veti_pro     += "<div class='labelBox'>";
			veti_pro       += "<span class='label'>" + dataT + "</span>";
			veti_pro     += "</div>";
      veti_pro   += "</div>";
			veti_pro += "</div>";

			tN.find(".chartBox").append(veti_pro);
			tN.css('padding-top',20 + "px");

    };

			for(var i = 0; i < dataL; i++) {

	      var speedTurm = (opts.speed + (opts.speedTurm * i)) / 1000; // 바 애니메이션 속도 차이

				tN.find(".progressBox").eq(i).find(".bar").css({

					"width" : opts.barHeight + "px",
					"margin" : "0 0 0 -" + opts.barHeight/2 + "px",
					"background-color" : opts.barColor[i],
		      "transition" : "height " + speedTurm +"s ease",
					"max-height" : opts.height + 'px'

				});

			};

			setTimeout(function () {

				var barRate = opts.height / markS; // 바 비율 계산

				for(var i = 0; i < dataL; i++) {

					var dataV = opts.data[i].value; // 데이터값 가져오기
					var barH = (dataV - opts.markStart) * barRate; // 바 높이 계산

			  	tN.find(".progressBox").eq(i).find(".bar").css("height",barH + "px");

				}

			}, 0);

	  /* EOD : 바 & 라벨 그리기 */


		/* 구분선 그리기 */

		tN.find(".chartArea").append("<ul class='lineBox'></ul>");


		for(var i = 0; i < lineN; i++) {

			tN.find(".lineBox").append("<li></li>");

		}

		tN.find(".lineBox").find("li").css('height',lineH + '%');


		/* EOD : 구분선 그리기 */

		tN.append("</div></div>");


	/* 가로형 차트 */
	}else if(opts.type == "horizontal"){

	  tN.addClass("hori");

		/* 바 & 라벨 그리기 */

		tN.append("<div class='processWrap'>");

		for(var i = 0; i < dataL; i++) {

			var dataT = opts.data[i].title; // 타이틀값 가져오기
			var speedTurm = (opts.speed + (opts.speedTurm * i)) / 1000; // 바 애니메이션 속도 차이

			hori_pro = "";
			hori_pro += "<div class='processArea'>";
      hori_pro    += "<div class='labelBox'>" + dataT + "</div>";
			hori_pro    += "<div class='progressBox'>";
			hori_pro        += "<div class='barArea'>";
	   	hori_pro          += "<span class='bar'></span>";

			if(opts.dataView == true){ // 데이터 표기

				 var dataTxt = opts.data[i].value; // 데이터값 가져오기
			 	 hori_pro       += "<span class='data'>" + dataTxt + "</span>";

			}

   	  hori_pro      += "</div>";
			hori_pro    += "</div>";
			hori_pro += "</div>";

		  tN.find(".processWrap").append(hori_pro);
			tN.find(".processArea").eq(i).find(".bar").css({

				"height" : opts.barHeight + "px",
				"background-color" : opts.barColor[i],
				"transition" : "width " + speedTurm +"s ease",

			});
		};

    setTimeout(function () {
			for(var i = 0; i < dataL; i++){

				var dataV = opts.data[i].value; // 데이터값 가져오기
				var barW = (dataV / markS) * 100; // 바 길이 계산

	   		tN.find(".processArea").eq(i).find(".bar").css("width", barW + "%");

			};
		},0);


		if(opts.dataView == true){ // 데이터 표기

				  var dataArr = [];

					for(var i = 0; i < dataL; i++){

 						 var dataW = tN.find(".progressBox").eq(i).find(".data").width();

					   dataArr.push(dataW);

 						 var fontH = (opts.barHeight - tN.find(".progressBox .data").height()) / 2;

						 tN.find(".progressBox").eq(i).find(".data").css("top",fontH + "px");

					}

					var maxData = Math.max.apply(null, dataArr) + 5; // 최대값 뽑아내기

				  tN.css("margin-right",maxData + "px");

			}

		/* EOD : 바 & 라벨 그리기 */

		/* 구분선 그리기 */


		tN.append("<div class='lineArea'><ul class='lineBox'></ul></div>");

		for(var i = 0; i < lineN; i++) {

			tN.find(".lineBox").append("<li><div class='line'></div></li>");

		}

		/* EOD : 구분선 그리기 */

		/* 범례 그리기 */

		if(opts.markView == true){ // 기준점 표기 판별

			tN.append("<div class='markWrap'><ul class='markArea'>");

			var markN = lineN + 1;

			for(var i = 0; i < markN; i++) {

				var numTxt = opts.markStart + (opts.markInterval * i);

				tN.find(".markArea").append("<li><span class='num'>" + numTxt + "</span></li>");

			}

			tN.find(".markArea li").each(function(){

				var fontM = $(this).find(".num").width() / 2;
				$(this).find(".num").css("margin","0 0 0 -" + fontM + "px");

			});

			tN.find(".markArea").find("li").css('width', lineH + '%');

			tN.append("</ul></div>");
			tN.addClass("mark");

			if(opts.dataView == false){ // 기준점 표기 판별

					var markArr = [];

					for(var i = 0; i < markN; i++){

					   var markW = tN.find(".markArea li").eq(i).find(".num").width() / 2;

						 markArr.push(markW);

					}

					var maxData = Math.max.apply(null, markArr); // 최대값 뽑아내기

					tN.css("margin-right",maxData + "px");
			}

		}

		/* EOD : 범례 그리기 */

		tN.append("</div>");

	}
	/* EOD : 가로형 차트 */


};
