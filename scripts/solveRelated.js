var session = [];

var mnt = 0;
var sec = 0;

var stopNotf;

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
	displayTimes();
	timeContain("session");
	saveSettings();
}

function timeContain(param) {
	document.getElementById("timesList").innerHTML = "";

	if (session.length > 0) {
		var text = "";

		if (param === "session") {
			text += timeContainSession();

		} else if (param === "bSingle") {
			text += timeContainSingle(bestSingleIndex);

		} else if (param === "cSingle") {
			text += timeContainSingle(session.length - 1);

		} else if (param === "bMo3") {
			text += timeContainMo3(bestMo3Index);

		} else if (param === "cMo3") {
			text += timeContainMo3(mo3s.length - 1);

		} else if (param === "bAo5") {
			text += timeContainAoX(5, 1, ao5s, bestAo5Index);

		} else if (param === "cAo5") {
			text += timeContainAoX(5, 1, ao5s, ao5s.length - 1);

		} else if (param === "bAo12") {
			text += timeContainAoX(12, 1, ao12s, bestAo12Index);

		} else if (param === "cAo12") {
			text += timeContainAoX(12, 1, ao12s, ao12s.length - 1);

		} else if (param === "bAo25") {
			text += timeContainAoX(25, 2, ao25s, bestAo25Index);

		} else if (param === "cAo25") {
			text += timeContainAoX(25, 2, ao25s, ao25s.length - 1);

		} else if (param === "bAo50") {
			text += timeContainAoX(50, 3, ao50s, bestAo50Index);

		} else if (param === "cAo50") {
			text += timeContainAoX(50, 3, ao50s, ao50s.length - 1);

		} else if (param === "bAo100") {
			text += timeContainAoX(100, 5, ao100s, bestAo100Index);

		} else if (param === "cAo100") {
			text += timeContainAoX(100, 5, ao100s, ao100s.length - 1);

		} else if (param === "bAo200") {
			text += timeContainAoX(200, 10, ao200s, bestAo200Index);

		} else if (param === "cAo200") {
			text += timeContainAoX(200, 10, ao200s, ao200s.length - 1);

		} else if (param === "bMo10Ao5") {
			text += timeContainMo10Ao5(avgCount, bestMo10Ao5Index);

		} else if (param === "cMo10Ao5") {
			text += timeContainMo10Ao5(avgCount, mo10ao5s.length - 1);

		} else if (param === "bNrAo5") {
			text += timeContainAoX(5, 1, ao5s, bestNrAo5Index * 5);
		}

		document.getElementById("timesList").innerHTML = text;
		document.getElementById("timesList").scrollTo(0, 0);
		selectText(document.getElementById("timesList"));
	}
}

function timeContainRandomSingle(index) {
	document.getElementById("timesList").innerHTML = "";

	if (session.length > 0) {
		var text = "";

		text += timeContainSingle(index);

		document.getElementById("timesList").innerHTML = text;
		selectText(document.getElementById("timesList"));
	}
}

function timeContainRandomAo5(index) {
	document.getElementById("timesList").innerHTML = "";

	if (session.length > 0) {
		var text = "";

		text += timeContainAoX(5, 1, ao5s, index);

		document.getElementById("timesList").innerHTML = text;
		selectText(document.getElementById("timesList"));
	}
}

function timeContainRandomAo12(index) {
	document.getElementById("timesList").innerHTML = "";

	if (session.length > 0) {
		var text = "";

		text += timeContainAoX(12, 1, ao12s, index);

		document.getElementById("timesList").innerHTML = text;
		selectText(document.getElementById("timesList"));
	}
}





function setOK(i) {
	if (session.length > 0) {
		var curIndex = i;

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
		displayTimes();
		//timeContain("session");
		document.getElementById("timesList").innerHTML = "";
		saveSettings();
		notification("No penalty applied");

		document.getElementById("input").focus();
	}
}

function setP2(i) {
	if (session.length > 0) {
		var curIndex = i;
		
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
		displayTimes();
		//timeContain("session");
		document.getElementById("timesList").innerHTML = "";
		saveSettings();
		notification("+2 penalty applied");

		document.getElementById("input").focus();
	}
}

function setDNF(i) {
	if (session.length > 0) {
		var curIndex = i;
		
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
		displayTimes();
		//timeContain("session");
		document.getElementById("timesList").innerHTML = "";
		saveSettings();
		notification("DNF penalty applied");

		document.getElementById("input").focus();
	}
}

function delSolve(i) {
	if (session.length > 0) { // do NOT write as (session.length > 0 && confirm(...)), must split into 2 if lines, dont know why

		if (confirm("Delete solve " + (i + 1) + ") " + session[i].string + "?")) {
			var curIndex = i;

			session.splice(curIndex, 1);
		
			calc();
			displayTimes();	
			//timeContain("session");
			document.getElementById("timesList").innerHTML = "";
			saveSettings();
			notification("Solve deleted");

			document.getElementById("input").focus();
		}
	}
}

function resetSession() {
	if (session.length > 0) {

		if (confirm("Reset session?")) {

			session = [];
		
			calc();
			displayTimes();
			//timeContain("session");
			document.getElementById("timesList").innerHTML = "";
			saveSettings();
			notification("Session reset");

			document.getElementById("input").focus();
		}
	}
}

function notification(str) {
	document.getElementById("notificationDiv").style.display = "flex";
	document.getElementById("notification").innerHTML = str;

	stopNotf = setTimeout(closeNotf, 3000);
}

function closeNotf() {
	document.getElementById("notificationDiv").style.display = "none";
	clearTimeout(stopNotf);

	document.getElementById("input").focus();
}
