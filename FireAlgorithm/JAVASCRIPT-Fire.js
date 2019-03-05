
const firePixelArray = []
const fireWidth = 40
const fireHeight = 40
let debug
let firePower
let stade
var sentido = 0
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start(stadeFire, debugStade, powerFire){
	firePower = powerFire
	debug = debugStade
	stade = stadeFire
	
	createFireStructure()
	createFireSource()
	renderFire()
	
	setInterval(calculateFirePropagation, 40)	
}

function createFireStructure(){
	const numberOfPixels = fireWidth * fireHeight
	
	for(let i = 0; i < numberOfPixels; i++){
		firePixelArray[i] = 0
	}
}

function calculateFirePropagation(){
	for(let column = 0; column < fireWidth; column++){
		for(let row = 0; row < fireHeight; row++){
			const pixelIndex = column + (fireWidth * row)
			updateFireIntensityPerPixel(pixelIndex)
		}
	}	
	renderFire();
}

function updateFireIntensityPerPixel(currentPixel) {
	const belowPixelIndex = currentPixel + fireWidth;
	
	if(belowPixelIndex >= fireWidth * fireHeight){
		return;
	}
	
	const decay = Math.floor(Math.random() * firePower);
	const belowPixelIntensity = firePixelArray[belowPixelIndex]
	const newFireIntensity = belowPixelIntensity - decay >= 0 ? belowPixelIntensity - decay : 0;
	
	firePixelArray[currentPixel - decay] = newFireIntensity;
}

function renderFire(){
	let html = "<table cellpadding=0 cellspacing=0>";
	
	
	for(let row = 0; row < fireHeight; row++){
		html += "<tr>";
		for(let column = 0; column < fireWidth; column++){
			const pixelIndex = column + (fireWidth * row)
			const fireIntensity = firePixelArray[pixelIndex]
			const color = fireColorsPalette[fireIntensity]
			const colorString = (color.r) +","+ (color.g) +","+ (color.b)
			
			if(debug === true){
				html += "<td>";
				html += '<div class="pixelIndex" >' + pixelIndex + '</div>';
				html += '<span style=" color:rgb('+ colorString +')">' + fireIntensity + '</span>'
				html += "</td>"
			}else{
				
				html += '<td style="background-color: rgb(' + colorString + ')">'
				html += '</td>'
			}	
		}
		html += "</tr>";
	}
	html += "</table>";
	
	document.querySelector("#fire").innerHTML = html;
}

function createFireSource(){
	for(let column = 0; column <= fireWidth; column++){
		const overFlowPixelIndex = fireWidth * fireHeight
		const pixelIndex = (overFlowPixelIndex - fireWidth) + column;
		
		firePixelArray[pixelIndex] = stade;
	}
}

function DebugOnOff(){
	var button = document.getElementById("Debug");
	button.addEventListener("click", myDebug);
	
	function myDebug(){
		if(debug === true){
			start(36, false, 3)
		}else if(debug === false){
			start(36, true, 3)
		}
	}
}

function StadeOnOff(){
	var button = document.getElementById("Stade");
	button.addEventListener("click", myStade);
	
	function myStade(){
		if(stade === 36){
			start(0, false, 3)
		}
		else if(stade === 0){
			start(36, false, 3)
		}
	}
}

function morePower(){
	var button = document.getElementById("morePower");
	button.addEventListener("click", myPower);
	
	function myPower(){
		start(36, false, ++firePower);
	}
}

function lessPower(){
	var button = document.getElementById("lessPower");
	button.addEventListener("click", myPower);
	
	function myPower(){
		start(36, false, --firePower);
	}
}

window.onload = function actions(){
	DebugOnOff();
	morePower();
	lessPower();
	StadeOnOff();
}

start(36, false, 3);
