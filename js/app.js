/*
shopping list app
chris ward
7/27/14
*/

//think about making this a javascript function and calling it on click from html
/*$(document).ready(function() {*/
var color = 0;
function changeHeaderColor() {
	var colors = ["#FF4081", "#3F51B5", "#0288d1", "#607d8b" ,"#009688"];
	if (color === colors.length) {
		color = 0;
	}
	console.log(colors[color]);
	$('.list-header').css("background-color", colors[color])
	color++
};
/*});*/