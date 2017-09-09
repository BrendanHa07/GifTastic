var foods = ["Pizza", "Hot Dogs", "Noodles", "Tacos", "Ice Cream", "Beer", "Bacon", "Fried Chicken", "Korean BBQ", "Dim Sum"];

function renderButtons() {
	$("#buttons-view").empty();

	for(var i=0; i<foods.length; i++) {

		var foodButtons = $("<buttons>");

		foodButtons.addClass("food btn btn-default");
		foodButtons.attr("data-name", foods[i]);
		foodButtons.text(foods[i]);
		$("#buttons-view").append(foodButtons);
	}
}
renderButtons();


$("#add-food").on("click", function() {
	event.preventDefault();
	var food = $("#food-input").val().trim();
	foods.push(food);
	$("#food-input").val(" ");
 	renderButtons();
})

function getGifs() {
	var foodName = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodName + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		var results = response.data;

		$("#gif-display").empty();

		for( var i=0; i<results.length; i++) {
			var foodDiv = $("<div>");

			foodDiv.addClass("foodGif");
			var newRating = $("<h2>").html("Rating: " + results[i].rating);
			foodDiv.append(newRating);
			console.log(newRating);

			var foodImage = $("<img>");
			foodImage.attr("src", results[i].images.fixed_height.url);
			foodImage.attr("data-still", results[i].images.fixed_height_still.url);
			foodImage.attr("data-animate", results[i].images.fixed_height.url);
			foodImage.attr("data-state", "still");
			foodDiv.append(foodImage);

			$("#gif-display").append(foodDiv);
		}
	})

}

function animateGifs() {
	var state = $(this).find("img").attr("data-state");
	console.log(this);

	if(state === "still") {
		$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
		$(this).find("img").attr("data-state", "animate");
	} else {
		$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
		$(this).find("img").attr("data-state", "still");
		console.log(this);
	}

}

$(document).ready(function() {
	renderButtons();
})

$(document).on("click", ".food", getGifs);
$(document).on("click", ".foodGif", animateGifs);













