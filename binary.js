function toBinary(number){
	let binList = [128,64,32,16,8,4,2,1];
	return binList.map(e => {
		if (number >= e) {
			number = number - e;
			return 1;
		} else {
			return 0
		}
	});
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function a(){
	rl.question("input number to turn to binary : ", function (n) {
		console.log(toBinary(n).join(""));
		a();
	})
}

a();
