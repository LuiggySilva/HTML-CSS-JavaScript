var X = "X";
var O = "O";
var actual = X;
var table = new Array(9);
var verificandoVencedor = null;
var win = 0;
var draw = 0;
var loss = 0;

function button(x){
	if(document.getElementById("button" + x).value === X || document.getElementById("button" + x).value === O){
		return;
	}
	else if(document.getElementById("button" + x).value === " "){
		document.getElementById("button" + x).value = X;
		this.table[parseInt(x)-1] = X;
		this.actual = O;
		
		console.log(table)
		var cpuPlay = CPU();
		console.log(cpuPlay)
		if(cpuPlay < 9){
			document.getElementById("button" + (cpuPlay+1)).value = O;
			this.table[cpuPlay] = O;
			this.actual = X;
		}
		verificandoVencedor = setInterval(ganhou, 500)	
	}
}

function clear() {
	for(let i = 0; i < 9; i++) {
		table[i] = null;
	}
	for(let i = 1; i < 10; i++) {
		document.getElementById("button" + i).value = " ";
	}
}

function ganhou() {
	var ganhou = verifica('X');
	if(ganhou == 'X'){
		window.clearTimeout(verificandoVencedor)
		clear()
		win++;
		document.getElementById("win").value = win;
	}
	ganhou = verifica('O')
	if(ganhou == 'O'){
		window.clearTimeout(verificandoVencedor)
		clear()
		loss++;
		document.getElementById("loss").value = loss;
	}
	else {
		var complete = true;
		for(let i = 0; i < 9; i++){
			if(table[i] == null){
				complete = false;
				break;
			}
		}
		if(complete){
			window.clearTimeout(verificandoVencedor)
			clear()
			draw++;
			document.getElementById("draw").value = draw
		}
	}
}

function verifica(player) {
	if(table[0] == player && table[1] == player && table[2] == player){
		return player
	}
	else if(table[3] == player && table[4] == player && table[5] == player){
		return player
	}
	else if(table[6] == player && table[7] == player && table[8] == player){
		return player
	}
	else if(table[0] == player && table[3] == player && table[6] == player){
		return player
	}
	else if(table[1] == player && table[4] == player && table[7] == player){
		return player
	}
	else if(table[2] == player && table[5] == player && table[8] == player){
		return player
	}
	else if(table[0] == player && table[4] == player && table[8] == player){
		return player
	}
	else if(table[2] == player && table[4] == player && table[6] == player){
		return player
	}
}

function CPU(){
	if(LadoALado( "O" ) >= 0) {
		return LadoALado( "O" );
	}
	else if(ComEspaco( "O" ) >= 0) {
		return ComEspaco( "O" );
	}
	else if(LadoALado( "X" ) >= 0) {
		return LadoALado( "X" );
	}
	else if(ComEspaco( "X" ) >= 0) {
		return ComEspaco( "X" );
	}
	else {
		return LinhaVazia();
	}
}

function LadoALado(player) {
	if(table[0] == player && table[1] == player && table[2] == null){
		return 2;
	}
	else if(table[3] == player && table[4] == player && table[5] == null){
		return 5;
	}
	else if(table[6] == player && table[7] == player && table[8] == null){
		return 8;
	}
	else if(table[1] == player && table[2] == player && table[0] == null){
		return 0;
	}
	else if(table[4] == player && table[5] == player && table[3] == null){
		return 3;
	}
	else if(table[7] == player && table[8] == player && table[6] == null){
		return 6;
	}
	else if(table[0] == player && table[3] == player && table[6] == null){
		return 6;
	}
	else if(table[1] == player && table[4] == player && table[7] == null){
		return 7;
	}
	else if(table[2] == player && table[5] == player && table[8] == null){
		return 8;
	}
	else if(table[6] == player && table[3] == player && table[0] == null){
		return 0;
	}
	else if(table[7] == player && table[4] == player && table[1] == null){
		return 1;
	}
	else if(table[8] == player && table[5] == player && table[2] == null){
		return 2;
	}
	else if(table[0] == player && table[4] == player && table[8] == null){
		return 8;
	}
	else if(table[2] == player && table[4] == player && table[6] == null){
		return 6;
	}
	else if(table[6] == player && table[4] == player && table[2] == null){
		return 2;
	}
	else if(table[8] == player && table[4] == player && table[0] == null){
		return 0;
	}
	else {
		return -1;
	}
}

function ComEspaco(player) {
	
	if(table[0] == player && table[6] == player && table[3] == null){
		return 3;
	}
	else if(table[1] == player && table[7] == player && table[4] == null){
		return 4;
	}
	else if(table[2] == player && table[8] == player && table[5] == null){
		return 5;
	}
	else if(table[0] == player && table[2] == player && table[1] == null){
		return 1;
	}
	else if(table[3] == player && table[5] == player && table[4] == null){
		return 4;
	}
	else if(table[6] == player && table[8] == player && table[7] == null){
		return 7;
	}
	else if(table[0] == player && table[8] == player && table[4] == null){
		return 4;
	}
	else if(table[2] == player && table[6] == player && table[4] == null){
		return 4;
	}
	else {
		return -1;
	}
}

function LinhaVazia() {
	var vazio = new Array()
	
	for(let i = 0; i < 9; i++){
		if(table[i] == null){
			vazio[i] = i;
		}
	}
	
	return vazio[Math.floor(Math.random() * vazio.length)];
}