(function(){
	var caption = document.querySelector('#caption-container');
	var lastText = '';
	var speaking = false;

	function getText() {
		return caption.innerText;
	}

	function sayIt(text) {
		// console.log("Speak: " + text);

		var a = new SpeechSynthesisUtterance(text);
		a.addEventListener('end', function() {
			speaking = false;
		});

		speaking = true;

		window.speechSynthesis.speak(a);
	}

	function checkIfChanged() {
		var text = getText().replace('|', '');

		if(lastText === text) return;

		// console.log("========");
		// console.log(lastText);
		// console.log(text);
		var newText = text.replace(lastText, '');
		// console.log(newText);
		lastText = text;
		// console.log(lastText);

		requestIdleCallback(function() {
			if(!window.speechSynthesis.speaking) {
				sayIt(newText);
			}
		});
	}

	setInterval(checkIfChanged, 1000);
})();