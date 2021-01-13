var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}



function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
  
  //Filtering RGB color string just to a numbers and excluding to each color
	rgbfilter = pickedColor.replace(/[^\d,]/g, '').split(',');
	var rgbcR = parseInt(rgbfilter[0], 10);
	var rgbcG = parseInt(rgbfilter[1], 10);
	var rgbcB = parseInt(rgbfilter[2], 10);
  
  //Converting RGB colors to Hex for color names in ntc.js code
	function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	  }
	  
	  function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	  }
	
	var Mycolor = (rgbToHex(rgbcR, rgbcG, rgbcB));
	
	var n_match  = ntc.name(Mycolor);
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match



	var Colorname = n_match[1]; //

	//change colorDisplay to match picked Color
	colorDisplay.textContent = Colorname;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}








//OLD CODE
// //alert("it just works lul")
// // var colors = [
// //     getColorString(getRandomColor()),
// //     getColorString(getRandomColor()),
// //     getColorString(getRandomColor()),
// //     getColorString(getRandomColor()),
// //     getColorString(getRandomColor()),
// //     getColorString(getRandomColor()),

// // ];
// var numSquares = 6;
// var colors = generateRandomColors(6);
// var h1 = document.querySelector("h1");
// var squares = document.querySelectorAll(".square");
// var pickedColor = pickColor();
// var colorDisplay = document.querySelector("#colorDisplay");
// var messageDisplay = document.querySelector("#messageDisplay");
// var resetButton = document.querySelector("#resetButton");
// var easyButton = document.querySelector("#easyButton");
// var hardButton = document.querySelector("#hardButton");
// var modeButtons = document.querySelectorAll(".mode");



// for (var i = 0; i < modeButtons.length; i++) {
//   modeButtons[i].addEventListener("click", function () {
//     modeButtons[0].classList.remove("selected");
//     modeButtons[1].classList.remove("selected");
//     this.classList.add("selected");
//     this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
//     reset();
//   });
// }

// function reset() {
//   colors = generateRandomColors(numSquares);
//   //pick a new random color from array
//   pickedColor = pickColor();
//   //change colorDisplay to match picked Color
//   colorDisplay.textContent = pickedColor;
//   resetButton.textContent = "New Colors";
//   messageDisplay.textContent = "";
//   //change colors of squares
//   for (var i = 0; i < squares.length; i++) {
//     if (colors[i]) {
//       squares[i].style.display = "block";
//       squares[i].style.background = colors[i];
//     } else {
//       squares[i].style.display = "none";
//     }
//   }
//   h1.style.background = "steelblue";
// }

// //Difficulty button
// // easyButton.addEventListener("click", function() {
// //   easyButton.classList.add("selected");
// //   hardButton.classList.remove("selected");
// //   colors = generateRandomColors(3);
// //   pickedColor = pickColor();
// //   colorDisplay.textContent = pickedColor;
// //   resetButton.textContent = "New Colors";
// //   h1.style.backgroundColor = "steelblue";
// //   messageDisplay.textContent = "";
// //   for (var i = 0; i < squares.length; i++) {
// //     if (colors[i]) {
// //       squares[i].style.backgroundColor = colors[i];
// //     } else {
// //       squares[i].style.display = "none";
// //     }
// //   }
// // });
// // hardButton.addEventListener("click", function() {
// //   hardButton.classList.add("selected");
// //   easyButton.classList.remove("selected");
// //   colors = generateRandomColors(6);
// //   pickedColor = pickColor();
// //   colorDisplay.textContent = pickedColor;
// //   resetButton.textContent = "New Colors";
// //   h1.style.backgroundColor = "steelblue";
// //   messageDisplay.textContent = "";
// //   for (var i = 0; i < squares.length; i++) {
// //       squares[i].style.backgroundColor = colors[i];
// //       squares[i].style.display = "block";
// //     }

// // });

// //reset Button
// resetButton.addEventListener("click", function () {
//   reset();
// });
// // resetButton.addEventListener("click", function() {
// //   //generate random colors
// //  colors = generateRandomColors(numSquares);

// //   //pick a new random color from array
// //   pickedColor = pickColor();
// //   //change colorDisplay to mnatch picked Color
// //   colorDisplay.textContent = pickedColor;
// //   resetButton.textContent = "New Colors";
// //   messageDisplay.textContent = "";
// //   h1.style.backgroundColor = "steelblue";
// //   for (var i = 0; i < squares.length; i++) {
// //     //add initial color squares
// //     squares[i].style.backgroundColor = colors[i];
// //   }
// // });

// colorDisplay.textContent = pickedColor;

// for (var i = 0; i < squares.length; i++) {
//   //add initial color squares
//   squares[i].style.backgroundColor = colors[i];
//   //add click listeners to squares
//   squares[i].addEventListener("click", function () {
//     //grab color of clicked square
//     var clickedColor = this.style.backgroundColor;
//     //compare color to pickedColor
//     if (clickedColor === pickedColor) {
//       messageDisplay.textContent = "Correct!";
//       resetButton.textContent = "Play again?";
//       h1.style.backgroundColor = pickedColor;
//       changeColors(clickedColor);
//     } else {
//       this.style.backgroundColor = "#232323";
//       messageDisplay.textContent = "Try again";
//     }
//   });
// }

// function changeColors(color) {
//   //loop through all sqsuares
//   for (var i = 0; i < squares.length; i++) {
//     //change each collor to match given color
//     squares[i].style.backgroundColor = color;
//   }
// }

// function pickColor() {
//   //picking color randomly from array
//   var random = Math.floor(Math.random() * colors.length);
//   return colors[random];
// }

// // function getRandomRGB() {
// //     return Math.floor(Math.random() * 255);
// // }

// // function getRandomColor() {
// //     return [getRandomRGB(), getRandomRGB(), getRandomRGB()];
// // }

// // function getColorString(color) {
// //     return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
// // }

// function generateRandomColors(num) {
//   //make an array
//   var arr = [];
//   //add num random colors to arr
//   for (var i = 0; i < num; i++) {
//     //get random color and push into arr
//     arr.push(randomColor());
//   }
//   //return that array
//   return arr;
// }

// function randomColor() {
//   //pick a "red" from 0 - 255
//   var r = Math.floor(Math.random() * 256);
//   //pick a "green" from 0 - 255
//   var g = Math.floor(Math.random() * 256);
//   //pick a "blue" from 0 - 255
//   var b = Math.floor(Math.random() * 256);
//   return "rgb(" + r + ", " + g + ", " + b + ")";
// }

