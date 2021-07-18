$(document).ready(function () {
	var images = [
		[
			"CSS/Images/Bg/breakfast/chocolate_covered_waffles.jpeg",
			"CSS/Images/Bg/breakfast/fried_eggs_toast.jpeg",
			"CSS/Images/Bg/breakfast/fruits_nuts_granola.jpg",
			"CSS/Images/Bg/breakfast/fruits_pancakes.jpg",
			"CSS/Images/Bg/breakfast/waffle_sunday.jpeg"
		],
		[
			"CSS/Images/Bg/lunch/food-plate-rucola-salad.jpg",
			"CSS/Images/Bg/lunch/food-plate-wood-restaurant.jpg",
			"CSS/Images/Bg/lunch/fried_fish_chilli_pepper_mint.jpg",
			"CSS/Images/Bg/lunch/hamburger.jpeg",
			"CSS/Images/Bg/lunch/sandwich.jpg"
		],
		[
			"CSS/Images/Bg/dinner/main_course/spaghetti.jpg",
			"CSS/Images/Bg/dinner/main_course/grilled_salmon.jpg",
			"CSS/Images/Bg/dinner/main_course/grilled_salmon.jpg",
			"CSS/Images/Bg/dinner/main_course/steak.jpg"
		],
		[
			"CSS/Images/Bg/beverages/cocktail.jpg",
			"CSS/Images/Bg/beverages/red_wine.jpeg",
			"CSS/Images/Bg/beverages/wallpaper.jpg",
			"CSS/Images/Bg/beverages/turkish_tea.jpeg",
			"CSS/Images/Bg/beverages/cappuccino.jpeg"
		],
		[
			"CSS/Images/Bg/salads/chicken_spinach_pomergranate.jpg",
			"CSS/Images/Bg/salads/fruit_salad.jpg",
			"CSS/Images/Bg/salads/mozzarella_cherry_tomatoe.jpg",
			"CSS/Images/Bg/salads/spinach_beetroot.jpg",
			"CSS/Images/Bg/salads/vegetable_salad.jpg"
		]
	];
	function menu_slider() {
		var index = parseInt(Math.floor((Math.random() * images.length) + 0));
		var indexed = parseInt(Math.floor((Math.random() * images[index].length) + 0));
		$('.menu_slider').css({"background-image":"url(" + images[index][indexed] + ")"});
	}
	menu_slider();
	$('.proceed').removeClass('proceed_inactive');
	$('.proceed').addClass('proceed_active');
	$(window).load( function () {
		var slider_timer = setInterval(function (){
			menu_slider();
		},20000);
		$('.proceed').click( function (){
			$('.proceed').removeClass('proceed_active');
			$('.proceed').addClass('proceed_inactive');
			$('.menu').removeClass('menu_inactive')
					  .addClass('menu_active');
		});
		$('.menu_items').mouseenter( function (){
			var item = $(this);
			var random;
			if(item.hasClass('breakfast_menu')){
				random = parseInt(Math.floor((Math.random() * images[0].length) + 0));
				$('.menu_slider').css({"background-image":"url("+ images[0][random] +")"});
			}
			else if(item.hasClass('lunch_menu')){
				random = parseInt(Math.floor((Math.random() * images[1].length) + 0));
				$('.menu_slider').css({"background-image":"url("+ images[1][random] +")"});
			}
			else if(item.hasClass('dinner_menu')){
				random = parseInt(Math.floor((Math.random() * images[2].length) + 0));
				$('.menu_slider').css({"background-image":"url("+ images[2][random] +")"});
			}
			else if(item.hasClass('beverages_menu')){
				random = parseInt(Math.floor((Math.random() * images[3].length) + 0));
				$('.menu_slider').css({"background-image":"url("+ images[3][random] +")"});
			}
			else if(item.hasClass('salads_menu')){
				random = parseInt(Math.floor((Math.random() * images[4].length) + 0));
				$('.menu_slider').css({"background-image":"url("+ images[4][random] +")"});
			}
		});
		$('.back_btn').click(function () {
			$('.menu_content_area_slider').css({
				"transform" : "translateX(0%)"
			});
			$('.menu_items').each(function () {
				var item = $(this);
				var item_arrow = $("<span class='menu_item_arrow'></span>");
				item.append(item_arrow);
				item.children('.menu_item_indicator').remove();
			});
			$('.back_btn').removeClass('back_btn_active');
			$('.sub_menu_main_window').children().empty();
			// menu_slider();
		});
		$.ajax({
			url : 'DATA/menu.json',
			datatype : 'json',
			cache: false,
			success : function (data){
				console.log(data);
				$('.menu_items').click(function () {
					$('.back_btn').addClass('back_btn_active');
					var item = $(this);
					var indicator = $("<span class='menu_item_indicator'></span>");
					item.append(indicator);
					item.siblings('.menu_items').children('.menu_item_indicator').remove();
					$('.menu_content_area_slider').css({
						"transform" : "translateX(-50%)"
					});
					$('.menu_items').each(function () {
						var item = $(this);
						item.children('.menu_item_arrow').remove();
					});
					$('.sub_menu_main_window').children('.sub_menu_main').empty();
					var menu_category = item.attr("data-menu-category");
					for(var i =0; i < eval("data." + menu_category + ".length");i++){
						var sub_items = $("<button class='sub_menu_items'></button>");
						var sub_items_img = $("<span class='sub_menu_items_img'></span>");
						sub_items_img.css({"background-image":"url(" + eval("data." + menu_category + "[" + i + "]" +".image") + ")"});
						sub_items.html(eval("data." + menu_category + "[" + i + "]" +".name"));
						sub_items.append(sub_items_img);
						sub_items.attr("data-index",i);
						sub_items.attr("data-menu",menu_category);
						$('.sub_menu_main').append(sub_items);
					} 
					$('.sub_menu_main_window').children('.sub_menu_main_content').empty();
					$('.sub_menu_items').click(function () {
						var item = $(this);
						item.addClass('sub_menu_items_active');
						item.siblings().removeClass('sub_menu_items_active');
						var object = item.attr("data-menu");
						var index= item.attr("data-index");
						var something = "data." + object + "[" + index + "]";
						$('.sub_menu_main_content').children('.item_info_wrapper').addClass('item_info_wrapper_slideOut');
						setTimeout(function (){
							$('.sub_menu_main_content').empty();
						},200);
						var item_info_wrapper = $('<span class="item_info_wrapper item_info_wrapper_inactive"></span>');
						var item_info_wrapper_header = $('<span class="item_info_wrapper_header"></span>');
						item_info_wrapper_header.html(object);
						item_info_wrapper.append(item_info_wrapper_header);
						var item_info_image_name_wrapper = $('<span class="item_info_image_name_wrapper">');
						var selected_item_image = $('<span class="selected_item_image"></span>');
						selected_item_image.css({"background-image":"url(" + eval(something + ".image") + ")"});
						var selected_item_name = $('<span class="selected_item_name"></span>');
						selected_item_name.html(eval(something + ".name"));
						var selected_item_price = $('<span class="selected_item_price"></span>');
						selected_item_price.html("$" + eval(something + ".price") + ".00");
						var selected_item_rating = $('<span class="selected_item_rating"></span>');
						for(var i =0;i < 5; i++){
							var star = $('<span class="star"></span>');
							selected_item_rating.append(star);
						}
						var purchase_button = $('<button class="purchase"></button>');
						var selected_item_desc = $('<span class="selected_item_desc"></span>');
						selected_item_desc.html(eval(something + ".desc"));
						item_info_image_name_wrapper.append(selected_item_image)
													.append(selected_item_name)
													.append(selected_item_price)
													.append(selected_item_rating)
													.append(purchase_button)
													.append(selected_item_desc);
						item_info_wrapper.append(item_info_image_name_wrapper);
						setTimeout(function () {
							item_info_wrapper.appendTo('.sub_menu_main_content');
						},300);
						setTimeout(function () {
							$('.item_info_wrapper').removeClass('item_info_wrapper_inactive');
						},350);
					});
				});
		}
	});
	});
});