/*! "iroha.fontSizeObserver.js" | Iroha - Necomesi JSLib : Observing Change of Fontsize | by Necomesi Ltd. */
/* -------------------------------------------------------------------------- */
/**
 *    @fileoverview
 *       Iroha - Necomesi JSLib : Observing Change of Fontsize
 *
 *    @version 3.01.20131016
 *    @requires jquery.js
 *    @requires iroha.js
 */
/* -------------------------------------------------------------------------- */
(function($, Iroha, window, document) {



/* -------------------- Static class : Iroha.FontSizeObserver -------------------- */
/**
 * @namespace font size observer.
 * @extends Iroha.Observable
 */
Iroha.FontSizeObserver = $.extend(new Iroha.Observable,
/** @lends Iroha.FontSizeObserver */
{
	/**
	 * observed node.
	 * @type jQuery
	 * @private
	 */
	$node : $(),

	/**
	 *current height of the observed node.
	 * @type Number
	 * @private
	 */
	currentSize : 0,

	/**
	 *interval timer to observe changing font size.
	 * @type Iroha.Interval
	 * @private
	 */
	timer : null,

	/**
	 * observe interval (ms)
	 * @type Number
	 * @private
	 * @constant
	 */
	interval : 500,

	/**
	 * 初期化
	 * @return このオブジェクト自身
	 * @type Iroha.FontSizeObserver
	 */
	init : function() {
		var id  = 'iroha-fontsize-observer-probe';
		var css = {
			  'position'       : 'absolute'
			, 'left'           : '-10000px'
			, 'top'            : '-10000px'
			, 'display'        : 'block'
			, 'visibility'     : 'hidden'
			, 'border'         : 'none'
			, 'margin'         : '0'
			, 'padding'        : '0'
			, 'font'           : 'normal normal normal 100%/1 inherit'
			, 'lineHeight'     : '1'
			, 'textDecoration' : 'none'
		};

		this.$node = $('#' + id);
		if (this.$node.length == 0) {
			this.$node = $(document.createElement('ins'))
							 .attr('id', id)
							 .css(css)
							 .text('M')
							 .appendTo(document.body);
		}

		this.startObserve();
		return this;
	},

	/**
	 * get observed node's height.
	 * @return observed node's height in px unit, it's nearly 'current font size'
	 * @type Number
	 */
	getSize : function() {
		return this.$node.height();
	},

	/**
	 * start observing.
	 * @return this object
	 * @type Iroha.FontSizeObserver
	 */
	startObserve : function() {
		if (!this.timer) {
			this.currentSize  = this.getSize();
			this.timer = new Iroha.Interval(this.observe, this.interval, this);
		}
		return this;
	},

	/**
	 * stop observing.
	 * @return this object
	 * @type Iroha.FontSizeObserver
	 */
	stopObserve : function() {
		if (this.timer) {
			this.timer.clear();
			this.timer = null;
		}
		return this;
	},

	/**
	 * observe font size changing.
	 * @private
	 */
	observe : function() {
		var size = this.getSize();
		var diff = size - this.currentSize;
		if (diff != 0) {
			this.doCallback('onChange', size, diff);
		}
		this.currentSize = size;
	}
});



/* -------------------- for JSDoc toolkit output -------------------- */
/**
 * callback functions for {@link Iroha.FontSizeObserver}
 * @name Iroha.FontSizeObserver.callback
 * @namespace callback functions for {@link Iroha.FontSizeObserver}
 */
/**
 * a callback for when the display font size is changed.
 * @name Iroha.FontSizeObserver.Callback.onChange
 * @function
 * @param {Number} size    current font size on the display (in px unit; nearly)
 * @param {Number} diff    difference from recent font size (in px unit)
 */



})(Iroha.$, Iroha, window, document);