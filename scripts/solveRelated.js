var session = [];
var bestSingleIndex = 0;
var bestAo5Index = 0;

var mnt = 0;
var sec = 0;

function contain(str, char) {
	var have = false;

	for (let i = 0; i < str.length; i++) {
		if (str[i] == char) {
			have = true;
			break;
		}
	}
	return have;
}

function getTimeInput() {
	var enterVal = document.getElementById("input").value;

	if (enterVal != "") {
		var enterTimeVal = parseFloat(enterVal);

		if (!contain(enterVal, ":") && !contain(enterVal, ".")) {

			if (enterVal.length <= 4) {
				sec = Math.round(((enterTimeVal / 100) % 60) * 100) / 100;
				mnt = 0;

			} else {
				var secVal = parseFloat(enterVal.substr(-4));
				sec = Math.round(((secVal / 100) % 60) * 100) / 100;

				var mntVal = parseInt(enterVal.substr(0, enterVal.length - 4));
				mnt = Math.floor(secVal / 6000) + mntVal;
			}

		} else if (contain(enterVal, ":")) {

			var twoDotIndex = enterVal.indexOf(":");
			var dotIndex = enterVal.indexOf(".");

			var secVal = parseFloat(enterVal.substr(twoDotIndex + 1));
			sec = Math.round((secVal % 60) * 100) / 100;

			var mntVal = parseInt(enterVal.substr(0, twoDotIndex));
			mnt = mntVal + Math.floor(secVal / 60);

		} else if (!contain(enterVal, ":") && contain(enterVal, ".")) {

			sec = Math.round((enterTimeVal % 60) * 100) / 100;
			mnt = Math.floor(enterTimeVal / 60);
		}

		addSolve();
		document.getElementById("input").value = "";
		generateScramble(document.getElementById('scramSelect').value);
	}
}

function addSolve() {
	var solve = {
		string: "",
		time: 0,
		tOk: 0,
		tPlus2: 2,
		pen: "",
		scramble: ""
	}

	solve.tOk = sec + mnt * 60;
	var roundTOk = parseFloat(solve.tOk); solve.tOk = Math.round(roundTOk * 100)/100;

	solve.tPlus2 = sec + mnt * 60 + 2;
	var roundTPlus2 = parseFloat(solve.tPlus2); solve.tPlus2 = Math.round(roundTPlus2 * 100)/100;

	if (mnt == 0){
		solve.string = sec.toFixed(2);

	} else if (mnt != 0 && sec < 10){
		solve.string = mnt + ":" + "0" + sec.toFixed(2);

	} else if (mnt != 0 && sec >= 10){
		solve.string = mnt + ":" + sec.toFixed(2);
	}

	solve.time = solve.tOk;
	solve.pen = "ok";
	solve.scramble = curScramble;

	session.push(solve);
	calc();
	timeContain();
}

function timeContain() {
	if (session.length > 0) {
		var text = "Generated by MO10AO5 Cube CALC <br><br>";

		text += "Session mean: " + sessionMean.string + "<br>";

		if (ao5s.length >= avgCount) {

			text += "MO" + avgCount + "AO5: " + mo10Ao5.string + "<br><br>";
		} else {
			text += "MO" + avgCount + "AO5: DNF <br><br>";
		}

		text += "Best single: " + session[bestSingleIndex].string + "<br>";

		if (session.length >= 5) {
			text += "Best ao5: " + ao5s[bestAo5Index].string + "<br>";
		}

		text += "<br>Time list: <br><br>";

		for (let i = 0; i < session.length; i++) {

			let s = i % 5 + 1;
			let a = Math.floor(i / 5) + 1;

			text += a + "-" + s + ") " + session[i].string + " &emsp; " + session[i].scramble + "<br>";

			if (i % 5 === 4) {
				text += " &emsp; &emsp; => " + ao5s[a - 1].string + " avg of 5 <br><br>";
			}
		}

		document.getElementById("timesList").innerHTML = text;
		selectText(document.getElementById("timesList"));

	} else {
		document.getElementById("timesList").innerHTML = "You haven't done any solve."
	}
}





function setOK() {
	if (session.length > 0) {
		var curIndex = session.length - 1;

		session[curIndex].pen = "ok";
		session[curIndex].time = session[curIndex].tOk;

		var solveMin = Math.floor(session[curIndex].time / 60);
		var solveSec = Math.floor((session[curIndex].time % 60) * 100) / 100;

		if (solveMin === 0) {
			session[curIndex].string = solveSec.toFixed(2);

		} else if (solveMin !== 0 && solveSec < 10) {
			session[curIndex].string = solveMin + ":" + "0" + solveSec.toFixed(2);

		} else if (solveMin !== 0 && solveSec >= 10) {
			session[curIndex].string = solveMin + ":" + solveSec.toFixed(2);
		}

		calc();
		timeContain();
	}
}

function setP2() {
	if (session.length > 0) {
		var curIndex = session.length - 1;
		
		session[curIndex].pen = "+2";
		session[curIndex].time = session[curIndex].tPlus2;

		var solveMin = Math.floor(session[curIndex].time / 60);
		var solveSec = Math.floor((session[curIndex].time % 60) * 100) / 100;

		if (solveMin === 0) {
			session[curIndex].string = solveSec.toFixed(2) + "+";

		} else if (solveMin !== 0 && solveSec < 10) {
			session[curIndex].string = solveMin + ":" + "0" + solveSec.toFixed(2) + "+";

		} else if (solveMin !== 0 && solveSec >= 10) {
			session[curIndex].string = solveMin + ":" + solveSec.toFixed(2) + "+";
		}

		calc();
		timeContain();
	}
}

function setDNF() {
	if (session.length > 0) {
		var curIndex = session.length - 1;
		
		session[curIndex].pen = "dnf";
		session[curIndex].time = Math.pow(2, 53) - 1;

		var solveMin = Math.floor(session[curIndex].tOk / 60);
		var solveSec = Math.floor((session[curIndex].tOk % 60) * 100) / 100;

		if (solveMin === 0) {
			session[curIndex].string = "DNF(" + solveSec.toFixed(2) + ")";

		} else if (solveMin !== 0 && solveSec < 10) {
			session[curIndex].string = "DNF(" + solveMin + ":" + "0" + solveSec.toFixed(2) + ")";

		} else if (solveMin !== 0 && solveSec >= 10) {
			session[curIndex].string = "DNF(" + solveMin + ":" + solveSec.toFixed(2) + ")";
		}

		calc();
		timeContain();
	}
}

function delSolve() {
	if (session.length > 0 && confirm("Delete last solve?")) {
		var curIndex = session.length - 1;

		session.splice(curIndex, 1);
		
		calc();
		timeContain();
	}
}
