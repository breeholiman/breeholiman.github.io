
var $friends = $("#friends");
var $name = $("#name");
var $age = $("#age");
var $longevity = $("#longevity");
var $quality = $("#quality");

var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<p><strong>Friendship Longevity:</strong> {{longevity}}</p>" +
	"<p><strong>Friendship Quality:</strong> {{quality}}</p>" +
	"<button id='{{id}}' class='remove'>X</button>" +
	"</li>";

function addFriend(friend){
	$friends.append(Mustache.render(friendTemplate, friend));
};

$(document).ready(function(){
	
	$.ajax({
		type: "GET",
		url: "http://rest.learncode.academy/api/learncode/friends",
		success: function(friends) {
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},
		error: function(){
			alert("error loading friends");
		}
	});

	$("#add-friend").on("click", function(){

		var friend = {
			name: $name.val(),
			age: $age.val(),
			longevity: $longevity.val(),
			quality: $quality.val(),
		};
		$.ajax({
			type: "POST",
			url: "http://rest.learncode.academy/api/learncode/friends",
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert("error saving order")
			}
		});
	});
	$friends.delegate(".remove", "click", function(){

		var $li = $(this).closest("li");
		//AJAX DELETE function - click the .remove class button and id identifies what to delete
		$.ajax({
			type: "DELETE",
			url: "http://rest.learncode.academy/api/learncode/friends/" + $(this).attr("id"),
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			}
		});
	});
});

