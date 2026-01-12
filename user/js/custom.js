/*
Copyright (c) 2017
------------------------------------------------------------------
[Master Javascript]

-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var Realestate = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {
			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			this.menu_toggle_and_dropdown();
			this.owl_sliders();
			// this.Chart();			
// 			this.Slider1();			
// 			this.Slider2();			
		},
    // Menu show Hide	
    menu_toggle_and_dropdown: function () {
		var counter = 0;
		var rle_menu_btn = $('.rle_menu_btn');
		rle_menu_btn.on('click', function(){
			if( counter == '0') {
				$('.rle_main_menu_wrapper').addClass('rle_main_menu_hide');
				$(this).children().removeAttr('class');
				$(this).children().attr('class','fa fa-close');
				counter++;
			}
			else {
				$('.rle_main_menu_wrapper').removeClass('rle_main_menu_hide');
				$(this).children().removeAttr('class');
				$(this).children().attr('class','fa fa-bars');
				counter--;
			}	
        });		
	},
	

	// Latest News Slider
	owl_sliders: function () {
		var rle_news_slider = $('.rle_news_slider .owl-carousel');
		if(rle_news_slider.length){	
		rle_news_slider.owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:3
				}
			}
		});
		}
		
			// Latest News Slider 2
			var rle_news_slider2 = $('.rle_news_slider2 .owl-carousel');
			if(rle_news_slider2.length){
			rle_news_slider2.owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:3
				}
			}
		});
		}
		
			// Latest News Slider 3	
		var rle_news_slider3 = $('.rle_news_slider3 .owl-carousel');
		if(rle_news_slider3.length){
		rle_news_slider3.owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:2
				}
			}
		});
		}

		// Agent Slider
		var rle_agent_slider = $('.rle_agent_slider .owl-carousel');
		if(rle_agent_slider.length){
		rle_agent_slider.owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			 autoplay:true,
    autoplayTimeout:1600,
			responsive:{
				0:{
					items:1,
                    stagePadding: 80
				},
				600:{
					items:3
				},
				1000:{
					items:4
				}
			}
		});
		}
				// Client Say Slider
		var rle_client_say_slider = $('.rle_client_say_slider .owl-carousel');		
		if(rle_client_say_slider.length) {
		rle_client_say_slider.owlCarousel({
			loop:true,
			margin:30,
			nav:false,
			autoplay:true,
    autoplayTimeout:1600,
    dots:true,
			navText: [
			"<i class='fa fa-long-arrow-up' aria-hidden='true'></i>",
			"<i class='fa fa-long-arrow-down' aria-hidden='true'></i>"],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		}
		
			// property slider
		var rle_property_slider = $('.rle_property_slider .owl-carousel');
		if(rle_property_slider.length){
		rle_property_slider.owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1000:{
					items:3
				}
			}
		});
		}
			
		// people saying
		var rle_people_saying_slider = $('.rle_people_saying_slider .owl-carousel');
		if(rle_people_saying_slider.length){
		rle_people_saying_slider.owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items:2
				}
			}
		});
		}
    },
	
	/**
	
	Slider1: function(){
		var galleryTop = new Swiper('.gallery-top', {
			spaceBetween: 10,
			initialSlide: '1',
		});
		var galleryThumbs = new Swiper('.gallery-thumbs', {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			spaceBetween: 10,
			centeredSlides: true,
			slidesPerView: '3',
			initialSlide: '1',
			touchRatio: 0.2,
			slideToClickedSlide: true
		});
		galleryTop.params.control = galleryThumbs;
		galleryThumbs.params.control = galleryTop;
	},
	Slider2: function(){
		var mySwiper = new Swiper('.slider_v2', {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			speed: 400,
			spaceBetween: 0,
			centeredSlides: true,
			slidesPerView: 'auto',
			loop: true
		});   
	},
	
	**/
		// Chart js
	Chart: function () {
		var lineChartData = {
			labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
			datasets: [{
				fillColor: "rgba(255, 255, 255, 0)",
				strokeColor: "rgba(0, 174, 239, 0.98)",
				pointColor: "rgba(0, 174, 239, 0.98)",
				data: [10, 30, 20, 60, 40, 80, 60, 100, 80, 130, 100, 150]
			}]

		}
		Chart.defaults.global.animationSteps = 50;
		Chart.defaults.global.tooltipYPadding = 16;
		Chart.defaults.global.tooltipCornerRadius = 3;
		Chart.defaults.global.tooltipTitleFontStyle = "normal";
		Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,0.8)";
		Chart.defaults.global.animationEasing = "easeOutBounce";
		Chart.defaults.global.responsive = true;
		Chart.defaults.global.scaleLineColor = "black";
		Chart.defaults.global.scaleFontSize = 12;

		var ctx = document.getElementById("canvas").getContext("2d");
		var LineChartDemo = new Chart(ctx).Line(lineChartData, {
			pointDotRadius: 10,
			bezierCurve: false,
			scaleShowVerticalLines: false,
			scaleGridLineColor: "black"
		});	
	}
		
};
	//show hide login form js
		$('#login_button').on("click", function(e) {
			$('#login_one').slideToggle(1000);
			e.stopPropagation(); 
		});
	
	$(document).click(function(e){
		if(!(e.target.closest('#login_one'))){	
			$("#login_one").slideUp("slow");   		
		}
   });
   
   
   //Rang Slider
	$( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	  
	$( "#slider-area" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-area" ).slider( "values", 0 ) +
      " - $" + $( "#slider-area" ).slider( "values", 1 ) );
	
	// ready function
	$(document).ready(function() {
		Realestate.init();
	});
	
	$('#location-slider-commercial').owlCarousel({
  loop: true,
  margin: 20,
  nav: false,

    autoplay:true,
    autoplayTimeout:5000,
   
  navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  
  responsive: {
    0: {
      items: 1,
    stagePadding: 30
    },
    600: {
      items: 3
    },
    1000: {
      items: 3
    }

  }
})

$('#awards-slider').owlCarousel({
  loop: true,
  margin: 20,
  nav: false,

    autoplay:true,
    autoplayTimeout:5000,
   
  navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  
  responsive: {
    0: {
      items: 1,
    stagePadding: 30
    },
    600: {
      items: 4
    },
    1000: {
      items: 4
    }

  }
})
	

})(jQuery);