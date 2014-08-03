/*
shopping list app
chris ward
7/27/14
*/

//think about making this a javascript function and calling it on click from html
/*$(document).ready(function() {*/
var color = 0;
function changeHeaderColor() {
	var colors = ["#FF4081", "#3F51B5", "#0288d1", "#607d8b" , "#f36c60", "#ba68c8", "#009688"];
	if (color === colors.length) {
		color = 0;
	}
	$('.list-header').css("background-color", colors[color]);
	$('.list-item').css("border-color", colors[color]);
	$('.input-field').css("border-color", colors[color]);
	$('.input-field').css("color", colors[color]);
	$('.btn-add').css("color", colors[color]);
	$('.list-item').css("color", colors[color]);
	color++;
};
/*});*/