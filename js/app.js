/*
to do list app
chris ward
7/27/14
*/

//think about making this a javascript function and calling it on click from html
//$(document).ready(function() {
var color = 0;
function changeColor() {
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
	$('.btn-remove').css("color", colors[color]);
	color++;
};

function buttonDownColor() {
	//$('.btn-add').css("color", "#9e9e9e");
	$(event.target).css("color", "#9e9e9e");
};

function buttonUpColor() {
	//$('.btn-add').css("color", $('.list-header').css("background-color"));
	$(event.target).css("color", $('.list-header').css("background-color"));
};

function addListItem() {
	var inputValue = $('.input-field').val();
	if (inputValue == null || inputValue == '') {
		return
	} else {
		var listItem = $('<div class="list-item"></div>');
		$('.list-container:last-child').append(listItem);
		listItem.text(inputValue);
		$('.input-field').val('');
		var remove_btn = $('<input class="btn-remove" type="submit" name="btn-remove" value="&minus;" onmousedown="buttonDownColor(); removeListItem()" onmouseup="buttonUpColor()">');
		var chk_btn = $('<input class="btn-check" type="checkbox" name="btn-check" onclick="crossOutItem()">');
		listItem.prepend(chk_btn);
		listItem.append(remove_btn);
		var currentColor = $('.input-field').css("color");
		listItem.css("color", currentColor)
				.css("border-color", currentColor);
		remove_btn.css("color", currentColor);
	}
};

$(this).keyup(function(event) {
	var inputValue = $('.input-field').val();
	var listItem = $('<div class="list-item"></div>');
    if ( event.which == 13 ) {
    	if (inputValue == null || inputValue == '') {
			return
		} else {
			$('.list-container:last-child').append(listItem);
			listItem.text(inputValue);
			$('.input-field').val('');
			var remove_btn = $('<input class="btn-remove" type="submit" name="btn-remove" value="&minus;" onmousedown="buttonDownColor(); removeListItem()" onmouseup="buttonUpColor()">');
			var chk_btn = $('<input class="btn-check" type="checkbox" name="btn-check" onclick="crossOutItem()">');
			listItem.prepend(chk_btn);
			listItem.append(remove_btn);
			var currentColor = $('.input-field').css("color");
			listItem.css("color", currentColor)
					.css("border-color", currentColor);
			remove_btn.css("color", currentColor);
		}
    }
 });

function crossOutItem() {
	$(event.target).closest('.list-item').toggleClass('line-through');
	//style checkbox
}

function removeListItem() {
	$(event.target).closest('.list-item').remove();
	//show - button on hover
	//animate removal
}


