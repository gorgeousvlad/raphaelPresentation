var paper = Raphael("paper","100%",700);

// //создаем объекты
var ellipse = paper.ellipse(300,200,150,100).attr({"fill":"orange","stroke-width": 0,"opacity":1,"stroke-dasharray":"-"});
var circle = paper.circle(100,300,50).attr({"fill":"gold","stroke-width": 0,"opacity":1,"stroke-dasharray":"."});
var rect = paper.rect(500,100,100,100).attr({"fill":"white","stroke-width": 0,"opacity":1,"stroke-dasharray":"."});
var path = paper.path("m10,350 l30,40 l150,80z").attr({fill: "red", "stroke-width": 0,"stroke-width": 0,"stroke-dasharray":"."});
var arc2 = paper.path("M 60,70 L   60,20   A 50,50 0 0,1 68.7,20.8 Z").attr({"fill":"midnightblue","stroke-width": 0});
var arc3 = paper.path("M 60,70 L 68.7,20.8 A 50,50 0 0,1 77.1,23.0 Z").attr({"fill":"red","stroke-width": 0});;
var arc4 = paper.path("M 68,65 L 85.1,18.0 A 50,50 0 0,1  118,65   Z").attr({"fill":"DeepPink ","stroke-width": 0});;
var arc5 = paper.path("M 60,70 L  110,70   A 50,50 0 1,1   60,20   Z").attr({"fill":"white","stroke-width": 0});;
var objs = []
objs.push(ellipse,circle,rect,path,arc2,arc3,arc4,arc5);

path__ = paper.path("M400, 300 L 400,350 450 350 500 350 500 400").attr({"fill":"purple","stroke-width": 0,"stroke-dasharray":"."})
objs.push(path__)

//функции обработчики

moveFnc = function(dx, dy) {
          lx = dx + this.initX;
          ly = dy + this.initY;
          this.transform('t' + lx + ',' + ly);
      };
startFnc = function() {this.toFront();},
endFnc = function() {
		  this.initX = lx;
		  this.initY = ly;
		  
 };
 clickFunc = function(env){

		if (!(this.data("origStyle"))){
			this.data("origStyle",this.attr())
			console.log(this.data("origStyle"))
			this.animate({fill:"black", "stroke-width": 10, "stroke":"blue"}, 1000, "bounce");
		}
		else{
			this.animate({
				"fill":this.data("origStyle").fill,
				"stroke-width":this.data("origStyle")["stroke-width"],
				"stroke":this.data("origStyle").stroke,
			},
			1000,"bounce");
			this.data("origStyle","");
		}		
	};

mouseoverFunc = function(env){
	this.attr({"opacity":0.5,"cursor":"hand"});
	};
mouseoutFunc = function(env){
	this.attr({"opacity":1,"cursor":"default"});
	};


var buttons = []
var actions = ["Drag","Click","Reset"];
for (var i =0; i < actions.length; i++){

	(function(i){
			var action = actions[i];
			//создаем кнопку
			paper.setStart();
			paper.rect(50 + i * 100,500,80,30).attr({"fill":"orange"});
			paper.text(90 + i * 100,515,action).attr({"font-size":"18px","fill":"purple"});
			var st = paper.setFinish();
			st[1].node.setAttribute("class","no-select")

			buttons.push(st);

			st.click(function(env){

					//снимаем с остальных кнопок подсветку
					buttons.forEach(function (button) {button[0].attr({"fill":"orange"})});
					st.my_clicked = true;
					st[0].attr("fill","Yellow");

				
				switch (action) {

					case "Drag":{

						for (var j =0; j <objs.length; j++){
						(function(j){
							var cur = objs[j]

							//убираем обработчик клика
							cur.unclick(clickFunc);
							
							cur.mouseover(mouseoverFunc);
							cur.mouseout(mouseoutFunc);
							if (!cur.initX){cur.initX = 0;}
							if (!cur.initX){cur.initY = 0;}
							cur.dragHandler = cur.drag(moveFnc, startFnc, endFnc);
							})(j);
						};
					break;
					}


					case "Click":{

						
						for (var j =0; j <objs.length; j++){
						(function(j){
							var cur = objs[j]

							//убираем обработчик драга
							cur.undrag();

							//cur.data("transformSave",cur.transform())

							cur.mouseover(mouseoverFunc);
							cur.mouseout(mouseoutFunc);
							cur.click(clickFunc)
							cur.clickHandler = true
							})(j);
						};
						break;
					}


					case "Reset":{

						for (var j =0; j <objs.length; j++){
						(function(j){
							var cur = objs[j]

							//убираем обработчик драга
							cur.undrag();
							cur.unclick(clickFunc);
							
							cur.attr(cur.data("origStyle"));
							cur.attr({"opacity":1})
							cur.data("origStyle","");

							cur.data("transformSave","")
							cur.initX = 0;
							cur.initY = 0;
							cur.transform('t' + 0 + ',' + 0);


							buttons.forEach(function(button){button.my_clicked = false});
							st[0].attr({"fill":"orange"});

							
							})(j);
						};
						break;
					}
//switch end
				}
			//}

			});
	
			st.mouseover(mouseoverFunc);
			st.mouseout(mouseoutFunc);
			
	})(i);
};

