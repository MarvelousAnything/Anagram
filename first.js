// This our first JavaScript program

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
    });
var execSync = require('child_process').execSync;
const fs = require('fs');

function load_all_words() {
    var contents = fs.readFileSync('words.txt').toString();

		var words2 = contents.replace(/\r|\r/g, "")
		var words = words2.split("\n")
    return words;
}

function when_answer(answer) {
		console.log("Hello, "+answer+".\n");
    say_stuff("Hello, "+answer+".\n");
    rl.close();
}

function say_stuff(stuff) {
    execSync('/usr/bin/say ' + stuff.toString() + '', function(error, stdout, stderr) {});
}

function say_answer(answer) {
    say_stuff('Hello ' + answer);
    find_anagrams(answer);
    rl.close();
}


rl.question("Hello! What is your name? ", (answer) => {
  find_anagrams(answer)

  rl.close();
});

function find_anagrams(Word) {
		var word = Word.toUpperCase()
    var word_frequency = letter_frequency(word.toUpperCase());
    var english_words = load_all_words();
    var anagrams_found = 0;
    for (var index = 0; index < english_words.length; index++) {
	  	var english_word = english_words[index].toUpperCase();
	  	var english_frequency = letter_frequency(english_word);
	  	if (english_word === word) {
	      	continue;
      	}
			//console.log(frequency_are_same(word_frequency, english_frequency))
	   	if (frequency_are_same(word_frequency, english_frequency)) {
	       	console.log("Your name has an awesome anagram: " + english_word);
	       	anagrams_found ++;
	   	}
    }
    if (anagrams_found == 0) {
	   say_stuff("Sorry, Your word does not have any anagrams");
		 rl.close()
    }
		rl.close()

}

function frequency_are_same(chart1, chart2) {
    if (Object.keys(chart1).length != Object.keys(chart2).length) {
	   return false;
    }
    for (var key in chart1) {
	   if (!(key in chart2)) {
	       return false;
	   }
	   if (chart1[key] != chart2[key]) {
	       return false;
	   }
    }
    return true;
}

function letter_frequency(word) {
    var result = {};
    for (var index = 0; index < word.length; index++) {
	   var letter = word.charAt(index).toUpperCase();
	   if (letter in result) {
	       result[letter]++;
	   } else {
	       result[letter] = 1;
	   }
    }

    for (letter in result) {
	   var times = result[letter];
    }

    return result;
}

function sort_letters(word) {
    var letters = [];
    for (var index = 0; index < word.length; index++) {
	   var letter = word.charAt(index).toUpperCase();
	   letters.push(letter);
    }
    letters.sort();
    return letters.join("");
}

function most_anagrams() {
    var english_words = load_all_words();
    var table = {};
    for (var index = 0; index < english_words.length; index++) {
	   var english_word = english_words[index];
	   var sorted_english_word = sort_letters(english_word);
	   if (sorted_english_word in table) {
	       table[sorted_english_word]++;
	   } else {
	       table[sorted_english_word] = 1;
	   }
    }
    var best_frequency = 0;
    var best_key = null;
    for (var key in table) {
	   var frequency = table[key];
	   if (frequency > best_frequency) {
	       best_frequency = frequency;
	       best_key = key;
	   }
    }
    //console.log(best_key);
}

most_anagrams();
