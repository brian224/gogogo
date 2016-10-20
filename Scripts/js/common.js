(function (window, document, jQuery, undefined) {
	'use strict';

	var common = new page();

	function page() {
		this._menu      = '.jq-menu';
		this._share     = '.jq-share';
		this._slideDown = '.jq-slide-down';
		this._ani       = '.jq-weight-ani';
		this._weighing  = '.jq-weight';
		this._slideshow = '.jq-m-slideshow';
		this._speed     = 400;
	}

	// 點擊目標區域以外的地方可關閉目標區域
	page.prototype.offClick = function() {
		projects.$d.off('click').on('click' , function(e){
			e.stopPropagation();

			if (!$(e.target).is('.m-nav-menu, .m-nav-menu *, ' + common._menu + ', ' + common._menu + ' *')) {
				$(common._menu).removeClass('is-hover');
			}
		});
	}

	projects.$w.load(function(){
		projects.FBInit();
		common.offClick();

		if ($('.l-content').hasClass('index')) {
			$('.dog-list').preload(function(){
				$('.l-loading').addClass('is-hide').on('webkitTransitionEnd oTransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$(this).remove();
				});
			});
		}

		$(common._menu).on('click', function(){
			$(this).toggleClass('is-hover');
		});

		$(common._share).on('click', function(){
			projects.FBShare();
		});

		$(common._slideDown).on('click', function(){
			projects.$hb.animate({
				'scrollTop': $(this).parent('.section-cut').next().offset().top
			}, common._speed);
		});

		$(common._ani + ' .svg-icon').each(function(){
			$(this).on('webkitAnimationEnd oAnimationend oAnimationEnd msAnimationEnd animationend', function(){
				var $this = $(this);

				$(common._weighing).text(parseInt($(common._weighing).text(), 10) + $this.data('weight'));
			});
		});

		$(common._slideshow).on('click', function(){
			if (projects.device() !== 'PC') {
				$(this).toggleClass('is-hover');
			}
		});

		projects.owlEvents('changed.owl.carousel' , function(){
			$(common._slideshow).removeClass('is-hover');
		});
	});

	projects.$d.ready(function(){
		if (projects.device() === 'Mobile') {
			projects.owlCarousel('.jQ-owl-xs');
		}
	});

	projects.$w.on('scroll' , function(){
		if ($('.l-content').hasClass('index')) {
			var _scrollTop;

			if (projects._browsers.msie === true) {
				_scrollTop = projects.$hb.scrollTop();
			} else {
				_scrollTop = projects.$b.scrollTop();
			}

			if (_scrollTop + projects.$w.height() >= $('.after-cut').offset().top) {
				$('.bar-graph').addClass('graph-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.situation-list .list').eq(1).offset().top) {
				$('.situation-list .list').eq(0).find('.animation-wrap').addClass('go-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.situation-list .list').eq(2).offset().top) {
				$('.situation-list .list').eq(1).find('.animation-wrap').addClass('go-ani');
			}
			if (_scrollTop + projects.$w.height() >= $('.donate-cut').offset().top) {
				$(common._ani).addClass('weighing-ani');
			}
		}
	});

	projects.$w.resize(function(){
		if (projects.$w.width() <= 740){
			projects.owlCarousel('.jQ-owl-xs');
		}
	});

	if ( ! window.common ) {
		window.common = common;
	}
}(window, document, $));