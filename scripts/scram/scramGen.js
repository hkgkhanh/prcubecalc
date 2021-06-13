var lastScramble = "";
var curScramble = "";

function generateScramble(value) {
	lastScramble = curScramble;
	switch (value) {
		case "333":
			curScramble = scramble_333.getRandomScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "222":
			curScramble = scramble_222.getRandomScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "444":
			curScramble = scramble_444.getRandomScramble();
			document.getElementById("scramContainer").style.fontSize = "1.5rem";
			break;

		case "555":
			curScramble = megaScrambler.get555WCAScramble(60);
			document.getElementById("scramContainer").style.fontSize = "1rem";
			break;

		case "666":
			curScramble = megaScrambler.get666WCAScramble(70);
			document.getElementById("scramContainer").style.fontSize = "1rem";
			break;

		case "777":
			curScramble = megaScrambler.get777WCAScramble(90);
			document.getElementById("scramContainer").style.fontSize = "1rem";
			break;

		case "mega":
			curScramble = util_scramble.getMegaminxWCAScramble(70);
			document.getElementById("scramContainer").style.fontSize = "1rem";
			break;

		case "pyra":
			curScramble = pyra_scrambler.getPyraWCAScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "sq1":
			curScramble = sql_scrambler.getRandomScramble();
			document.getElementById("scramContainer").style.fontSize = "1.5rem";
			break;

		case "skb":
			curScramble = skewb_scrambler.getSkewbWCAScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "clk":
			curScramble = util_scramble.getClockWCAScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "333oh":
			curScramble = scramble_333.getRandomScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;

		case "333bld":
			curScramble = scramble_333.get3BLDScramble();
			document.getElementById("scramContainer").style.fontSize = "2rem";
			break;
	}

	document.getElementById("scramContainer").innerHTML = curScramble;
}

function getLastScramble() {
	curScramble = lastScramble;
	document.getElementById("scramContainer").innerHTML = curScramble;
}
