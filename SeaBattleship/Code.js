

var navios = 
[ 
 ["images/navio2/ship1.jpg","images/navio2/ship2.jpg"],
 ["images/navio3/ship1.jpg","images/navio3/ship2.jpg","images/navio3/ship3.jpg"], 
 ["images/navio4/ship1.jpg","images/navio4/ship2.jpg","images/navio4/ship3.jpg","images/navio4/ship4.jpg"], 
 ["images/navio5/ship1.jpg","images/navio5/ship2.jpg","images/navio5/ship3.jpg","images/navio5/ship4.jpg","images/navio5/ship5.jpg"]
]

var alfa = ["A","B","C","D","E","F","G","H","I","J"]
var mapa = new Map();
var bombs = new Map();
var life = 3;
var ammo = 10;
var shipsDestroyed = 0;
var ships = new Set([1,2,3,4])
var intervalo;

function start(){
	spawnShips();
	spawnBombs();
	document.onkeypress = enter;
	intervalo = setInterval(verificaMapa, 500);
}

function verificaMapa() {
	var shipLength = 0;
	
	if(ammo == 0 && shipsDestroyed > 0){
		clearInterval(intervalo)
		alert("You Win!")
		window.location.reload()
	}
	else if(ammo == 0){
		clearInterval(intervalo)
		alert("You Lose!")
		window.location.reload()
	}
	else if(shipsDestroyed == 4){
		clearInterval(intervalo)
		alert("You Win!")
		window.location.reload()
	}
	else {
		for(let i = 0; i < navios.length; i++){
			var navio = navios[i];
			verificaChaves(navio);
		}
		
		for(let i = 0; i < navios.length; i++){
			var cont = 0;
			var navio = navios[i]
			if(navio == null){
				continue;
			}
			else{
				for(let j = 0; j < navio.length; j++){
					if(navio[j] == null){
						cont++;
					}
				}
				if(navio.length == cont){
					shipLength = navio.length;
					navios[i] = null;
					shipsDestroyed++;
				}
			}
		}
		if(shipLength > 0){
			ammo += shipLength-1;
		}
		
		attLife();
		attAmmo();
	}
}

function verificaChaves(arr){
	
	if(arr == null){
		return;
	}
	
	var cont = 0;
	for(let i = 0; i < arr.length; i++){
		for(let j = 0; j < alfa.length; j++){
			for(let k = 1; k <= 10; k++){
				var val = document.getElementById(alfa[j] + k).getAttribute("src");
				if(val == arr[i]){
					arr[i] = null
					cont++;
				}
			}
		}
	}
	return cont;
}

function spawnBombs(){
	var indexNum = Math.floor(Math.random() * 10) + 1;
	var indexLetter = Math.floor(Math.random() * alfa.length);
	
	var cont = 0;
	while(cont != 10){
		if(mapa.has(alfa[indexLetter] + indexNum) || bombs.has(alfa[indexLetter] + indexNum)){
			indexNum = Math.floor(Math.random() * 10) + 1;
			indexLetter = Math.floor(Math.random() * alfa.length);
		}
		else {
			bombs.set(alfa[indexLetter] + indexNum, "images/elements/Bomb.png")
			cont++;
		}
	}
}

function spawnShips() {	
	for(let i = 0; i < navios.length; i++){
		var sentido = Math.floor(Math.random() * 2); // 0 = horizontal e 1 = vertical
		spawn(sentido, navios[i]);
	}
	
	if(mapa.size !== 14){
		window.location.reload()
	}
}

function spawn(sentido, navio) {
	var indexNum = Math.floor(Math.random() * 10) + 1;
	var indexLetter = Math.floor(Math.random() * alfa.length);
	
	if(sentido == 0){
		if(verificaHorizontal(indexLetter, indexNum, navio.length)){
			var cont = 0;
			for(let j = indexLetter; j < alfa.length; j++){ 
				if(cont == navio.length){
					break;
				}
				
				mapa.set((alfa[j] + indexNum), navio[cont]);
				cont++;
			}
			return;
		}
		else{
			spawn(sentido, navio);
		}
	}
	if(sentido == 1){
		if(verificaVertical(indexLetter, indexNum, navio.length)){
			var cont = 0;
			for(let i = indexNum; i <= 10; i++){
				if(cont == navio.length){
					break;
				}
				
				mapa.set(alfa[indexLetter] + i, navio[cont] + " -");	
				cont++;
			}
			return;
		}
		else {
			spawn(sentido, navio);
		}
	}
}

function verificaHorizontal(indexLetter, indexNum, tamNavio){
	var freeSpace = true;
	for(let i = indexLetter; i < alfa.length - (tamNavio-1); i++){
		if(mapa.has(alfa[i] + indexNum )){
			freeSpace = false;
		}
	}
	return freeSpace;
}

function verificaVertical(indexLetter, indexNum, tamNavio){
	var freeSpace = true;
	if(indexNum + (tamNavio-1) > 10){
		return false;
	}
	else {
		for(let i = indexNum; i <= 10 ; i++ ){
			if(mapa.has(alfa[indexNum] + i)){
				freeSpace = false;
			}
		}
	}
	return freeSpace;
	
}

function play() {
	var n = document.getElementById("numero").value
	var l = document.getElementById("letra").value
	
	document.getElementById("numero").value = ""
	document.getElementById("letra").value = ""
	
	if(entradaValida(l, n)){
		return;
	}
	
	var coord = l.toUpperCase() + n;
	var elem = document.getElementById(coord);
	
	if(mapa.has(coord)){
		var ship = mapa.get(coord).split(" ")
		if(ship.length > 1){
			elem.setAttribute("src", ship[0])
			elem.setAttribute("style", "transform: rotate(90deg)")
			fireSound()
		}
		else {
			ship = mapa.get(coord).split(" ")
			elem.setAttribute("src", ship[0])
			fireSound()
		}
		ammo--;
	}
	else if(bombs.has(coord)){
		var bomb =  bombs.get(coord)
		elem.setAttribute("src", bomb)
		shipSound()
		
		ammo--;
		life--;
	}
	else {
		elem.setAttribute("src", "images/elements/water.png")
		waterSound();
		ammo--;
	}
}

function attAmmo(){
	var amm = document.getElementById("ammunition");
	amm.setAttribute("value", ammo)
}

function attLife(){
	if(life == 3){
		return;
	}
	else if(life == 2){
		var elem = document.getElementById("life3")
		elem.setAttribute("src", "images/elements/transparente.png")
	}
	else if(life == 1){
		var elem = document.getElementById("life2")
		elem.setAttribute("src", "images/elements/transparente.png")
	}
	else {
		clearInterval(intervalo)
		var elem = document.getElementById("life1")
		elem.setAttribute("src", "images/elements/transparente.png")
		alert("You Lose!")
		window.location.reload();
	}
}

function entradaValida(letra, numero) {
	var patt1 = /[A-J]/g;
	letra = letra.toUpperCase();
	var resul1 = letra.match(patt1);
	
	if(letra.length > 1 || resul1 == null){
		alert("Enter only one letter [A-J]!")
	}
	if(numero <= 0 || numero > 10){
		alert("Enter only one number [1-10]!")
	}
}

function fireSound(){
	var sound = new Audio("sounds/fire.mp3");
	sound.play();
	sound.currentTime = 0;
}

function waterSound(){
	var sound = new Audio("sounds/ExplosionWater.mp3");
	sound.play();
	sound.currentTime = 0;
}

function shipSound(){
	var sound = new Audio("sounds/ExplosionShip.mp3")
	sound.play();
	sound.currentTime = 0;
}

function addInArray(arr, elem){
	arr[arr.length] = elem;
}

function enter(){
	if(event.keyCode == 13){
		play();
	}
}

start()

