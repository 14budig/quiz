
var counter = 0; 
var chosenAnswers = []; 
var quiz = $('#quiz'); //for simplicity
function createQuestionElement(index) {
    var qElement = $('<div>', {
        id: 'question'
    });
    var header = $('<h1>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
}

function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="choice" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
    }
    return radioList;
}

function choose() {
    chosenAnswers[counter] = +$('input[name="choice"]:checked').val();
}

function displayNext() {
    quiz.fadeOut(function() {
        $('#question').remove();

        if(counter < questions.length){
            var nextQuestion = createQuestionElement(counter);
            quiz.append(nextQuestion).fadeIn();
            $('#next').fadeIn();
            if (!(isNaN(chosenAnswers[counter]))) {
                $('input[value='+chosenAnswers[counter]+']').prop('checked', true);
            }

            if(counter === 1){
                $('#prev').fadeIn();
                $('#next').fadeIn();
            } else if(counter === 0){

                $('#prev').fadeOut();
                $('#next').fadeIn();
            }
        }else {
            var scoreElem = displayScore();
            quiz.append(scoreElem).fadeIn();
            $('#next').hide();
            $('#prev').hide();
            $('#start').fadeIn();
        }
    });
}

function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < chosenAnswers.length; i++) {
        if (chosenAnswers[i] === questions[i].correctAnswer) {
            numCorrect++;
        }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
        questions.length + ' right!!!');
    return score;
}

//cookie functions from w3schools.com
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    $(document).cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function checkCookie() {
    var username=getCookie("username");
    if (username!="") {
        alert("Welcome again " + username);
    }else{
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

var main = function(){
	checkCookie();
	displayNext();
	
	$('#next').on('click', function () {
		if(quiz.is(':animated')){
			return false;
		}
        choose();
		
        if (isNaN(chosenAnswers[counter])) {
            alert('Please make a selection!');
        } else {
            counter++;
            displayNext();
        }
    });
	
    $('#prev').on('click', function () {
		if(quiz.is(':animated')){
			return false;
		}
        choose();
        counter--;
        displayNext();
    });
	
	    $('#start').on('click', function () {
        counter = 0;
        chosenAnswers = [];
        displayNext();
        $('#start').hide();
    });
	
}


$(document).ready(main);