/**
* author: Jun
* date: 2014/3/18
**/

(function(window, document) {

	function SimpleSlider(config) {
		this.id = config.id;
		this.arrow = config.arrow;
		this.dot = config.dot;
		this.folder = config.folder;
		this.images = config.images;
		this.speed = config.speed;
		this.width = config.width;
	}

	SimpleSlider.prototype = {
		constructor: SimpleSlider,
		init: function(){
			var li_node, temp_node;
			var self = this;
			var parent_node = document.getElementById(this.id);
			var container_node = document.createElement("div");
			container_node.setAttribute("class", "slider-container");
			var pic_list_node = document.createElement("ul");
			pic_list_node.setAttribute("class", "slider-list");

			for(var i = 0; i < this.images.length; i++) {
				li_node = document.createElement("li");
				li_node.setAttribute("class", "slider-item");
				temp_node = document.createElement("img");
				temp_node.setAttribute("src", this.folder + "/" + this.images[i]);
				li_node.appendChild(temp_node);
				pic_list_node.appendChild(li_node);

				if(i == 0) {
					if(this.arrow) {
						temp_node.onload = function() {
							self.setArrowPos();
						}
					}
				}
			}

			container_node.appendChild(pic_list_node);

			if(this.dot) {
				var dot_list_node = document.createElement("ul");
				dot_list_node.setAttribute("class", "slider-dot-list");

				for(var j = 0; j < this.images.length; j++){
					li_node = document.createElement("li");
					li_node.setAttribute("class", "slider-dot");
					dot_list_node.appendChild(li_node);
				}
				container_node.appendChild(dot_list_node);
			}

			if(this.arrow) {
				var arrow_list_node = document.createElement("div");
				var images_src = getScriptSrc();
				arrow_list_node.setAttribute("class", "slider-arrow");
				li_node = document.createElement("div");
				li_node.setAttribute("class", "slider-arrow-item slider-arrow-prev");
				temp_node = document.createElement("img");
				temp_node.setAttribute("src", images_src + "/images/arrow-prev.png");
				li_node.appendChild(temp_node);
				arrow_list_node.appendChild(li_node);

				li_node = document.createElement("div");
				li_node.setAttribute("class", "slider-arrow-item slider-arrow-next");
				temp_node = document.createElement("img");
				temp_node.setAttribute("src", images_src + "/images/arrow-next.png");
				li_node.appendChild(temp_node);
				arrow_list_node.appendChild(li_node);

				container_node.appendChild(arrow_list_node);
			}

			parent_node.appendChild(container_node);

			this.run();
		},

		run: function() {
			var last_index = 0;
			var cur_index = 0;
			var move_pixel = 0;
			var parent_id = "#" + this.id;
			var self = this;

			$(parent_id).find(".slider-container").css({"width": this.width + "px"});
			$(parent_id).find(".slider-list").css({"width": this.width * this.images.length + "px"});
			$(parent_id).find(".slider-item img").css({"width": this.width + "px"});
			var slider_list_width = $(".slider-list").width();

			var slider_interval = setInterval(sliderPic, this.speed);

			if(this.dot) {
				$(parent_id).find(".slider-dot-list .slider-dot").eq(0).addClass("slider-dot-current");
			}

			$(parent_id).find(".slider-arrow-prev").click(function() {
				if(!$(parent_id).find(".slider-list").is(":animated")) {
					window.clearInterval(slider_interval);
					move_pixel = parseInt($(parent_id).find(".slider-list").css("left").substr(0, $(parent_id).find(".slider-list").css("left").length - 2)) + self.width;
					if(move_pixel > 0) {
						$(parent_id).find(".slider-list").animate({left: (self.width - slider_list_width) + "px"});
						cur_index = $(parent_id).find(".slider-list li").length - 1;
					}
					else {
						$(parent_id).find(".slider-list").animate({left: move_pixel + "px"});
						cur_index--;
					}
					sliderDot();
					console.log(self.speed);
					slider_interval = setInterval(sliderPic, self.speed);
				}
			});

			$(parent_id).find(".slider-arrow-next").click(function() {
				if(!$(parent_id).find(".slider-list").is(":animated")) {
					window.clearInterval(slider_interval);
					sliderPic();
					slider_interval = setInterval(sliderPic, self.speed);
				}
			});

			$(parent_id).find(".slider-dot-list .slider-dot").click(function(){
				if(!$(".slider-list").is(":animated")) {
					window.clearInterval(slider_interval);
					if($(this).index() != cur_index) {
						cur_index = $(this).index();
						move_pixel = -(cur_index * self.width);

						$(parent_id).find(".slider-list").animate({left: move_pixel + "px"});
					}
					sliderDot();
					slider_interval = setInterval(sliderPic, self.speed);
				}
			});

			function sliderPic() {
				move_pixel = parseInt($(parent_id).find(".slider-list").css("left").substr(0, $(parent_id).find(".slider-list").css("left").length - 2)) - self.width;
				if(-move_pixel >= slider_list_width) {
					$(parent_id).find(".slider-list").animate({left: "0px"});
					cur_index = 0;
				}
				else {
					$(parent_id).find(".slider-list").animate({left: move_pixel + "px"});
					cur_index++;
				}
				sliderDot();
			}

			function sliderDot() {

				$(parent_id).find(".slider-dot-list .slider-dot").eq(last_index).removeClass("slider-dot-current");
				$(parent_id).find(".slider-dot-list .slider-dot").eq(cur_index).addClass("slider-dot-current");
				last_index = cur_index;
			}
		},

		setArrowPos: function() {
			var parent_id = "#" + this.id;
			$(parent_id).find(".slider-arrow-prev").css({"left": "10px", "top": -($(parent_id).find(".slider-container").height() / 2 - 50) + "px"});
			$(parent_id).find(".slider-arrow-next").css({"left": (this.width - 60) + "px", "top": -($(parent_id).find(".slider-container").height() / 2 + 50) + "px"});
		}
	}




	function getScriptSrc() {
		var scripts_node = document.scripts;

		for(var i = 0; i < scripts_node.length; i++) {
			if(scripts_node[i].src.indexOf("js/simpleslider") > -1) {
				return scripts_node[i].src.substr(0, scripts_node[i].src.lastIndexOf('/'));
			}
		}
		return "";
	}

	function createSlider(config) {
		if(config.arrow != true) {
			config.arrow == Boolean(config.arrow);
		}
		if(config.dot != true) {
			config.arrow == false;
		}
		if(!config.folder) {
			config.folder == "";
		}
		if((config.speed == undefined) || isNaN(config.speed)) {
			config.speed = 3000;
		}
		if((config.width == undefined) || isNaN(config.width)) {
			config.width = $("#" + config.id).width();
		}

		var slider_temp = new SimpleSlider(config);
		slider_temp.init();
	}


	$.slider = createSlider;

})(window, document);