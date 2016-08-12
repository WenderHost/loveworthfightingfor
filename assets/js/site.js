/**
 * startsWith polyfill for IE compatiblity
 * see: [Code not running in IE 11, works fine in Chrome](http://stackoverflow.com/questions/30867172/code-not-running-in-ie-11-works-fine-in-chrome)
 */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
 };
var date = new Date();
var today = date.yyyymmdd();

var EventSheet = 'https://docs.google.com/spreadsheets/d/19lC67SDAvkcMeJTn6fvMRR0MzxhTTmOz-WEQu4jwBA0/edit#gid=0';
var EventRowTemplate = Handlebars.compile( $('#event-row-template').html() );
var EventItemTemplate = Handlebars.compile( $('#event-item-template').html() );
var EventQuery = "SELECT B,C,D,E,F,G,H,I WHERE J='publish' AND K >= '" + today + "' ORDER BY A ASC";

Handlebars.registerHelper('ticketlink', function(object){
	if( object.startsWith('http') ){
		return new Handlebars.SafeString(
			object
		);
	} else {
		return 'https://www.itickets.com/register/new/' + object;
	}
});

Handlebars.registerHelper('maplink', function(object){
	if( object.Venue_Address.startsWith( 'http' ) ){
		return new Handlebars.SafeString(object.Venue_Address);
	} else {
		return object.Map_Link;
	}
});

// Desktop View
$('#events-table').sheetrock({
	url: EventSheet,
	query: EventQuery,
	rowTemplate: EventRowTemplate,
	labels: ['Date','Start_Time','End_Time','City','Host','Map_Link','Tickets'],
	headersOff: true
});

// Mobile View
$('#events-list').sheetrock({
	url: EventSheet,
	query: EventQuery,
	rowTemplate: EventItemTemplate,
	labels: ['Date','Start_Time','End_Time','City','Host','Map_Link','Tickets'],
	headersOff: true
});

// Smooth scrolling for main menu and buttons
$('.navigation-item a').smoothScroll({
	offset: -80
});
$('a.button').smoothScroll({
	offset: -80
});

// Setup popover menu
;(function() {

	'use strict';

	var i,
		$popoverLinks 	= document.querySelectorAll('[data-popover]'),
		$popovers			= document.querySelectorAll('.popover'),
		request 			= new XMLHttpRequest(),
		entityMapObject 	= { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': '&quot;', "'": '&#39;', "/": '&#x2F;' };

	function init() {
		for (i = 0; i < $popoverLinks.length; i++) $popoverLinks[i].addEventListener('click', openPopover);
		document.addEventListener('click', closePopover);
		googleAnalytics();
	}

	function closePopover(e) {
		for (i = 0; i < $popovers.length; i++) $popovers[i].classList.remove('popover-open');
	}

	function openPopover(e) {
		e.preventDefault();
		if (document.querySelector(this.getAttribute('href')).classList.contains('popover-open')) {
			document.querySelector(this.getAttribute('href')).classList.remove('popover-open');
		}
		else {
			closePopover();
			document.querySelector(this.getAttribute('href')).classList.add('popover-open');
		}
		e.stopImmediatePropagation();
	}

	function googleAnalytics() {
		if ( window.location.hostname !== 'loveworthfightingfor.dev' ) {
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-44982675-1', 'auto');
			ga('send', 'pageview');
		}
	}

	init();

}());