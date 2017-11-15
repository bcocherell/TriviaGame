var question1 = {
  text: 'test question 1',
  answers: ['test answer 1', 'test answer 2', 'test answer 3', 'test answer 4'],
  correctAnswer: 3,
  answerText: 'Yadda yadda yadda',
  gif: '<iframe src="https://giphy.com/embed/10TNfoEHN1c3zG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mlb-corey-claps-kluber-10TNfoEHN1c3zG">via GIPHY</a></p>'
};

var question2 = {
  text: 'test question 2',
  answers: ['test answer 1', 'test answer 2', 'test answer 3'],
  correctAnswer: 2,
  answerText: 'Yadda yadda yadda',
  gif: '<iframe src="https://giphy.com/embed/yeinSvLW99tOE" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mlb-points-teammates-chisenhall-yeinSvLW99tOE">via GIPHY</a></p>'
};

var question3 = {
  text: 'test question 3',
  answers: ['true', 'false'],
  correctAnswer: 1,
  answerText: 'Yadda yadda yadda',
  gif: '<iframe src="https://giphy.com/embed/roYhkwx4lDhEQ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/mlb-edwin-edwing-roYhkwx4lDhEQ">via GIPHY</a></p>'
};

var questions = [question1, question2, question3];

var count = 0;
var question;
var timerIntervalId;
var correct = 0;
var wrong = 0;
var unanswered = 0;

window.onload = function() {
	$("#start").click(startQuiz);
}

$(document).on('click','.answer', function() {
	timer.stop();
    nextQuestion($(this).attr("data-answervalue"));
});

$(document).on('click','#play-again', function() {
	startQuiz();
});

var timer = {
  time: 30,

  reset: function(t) {
    timer.time = t;
    $('#timer').text(t);
    timer.start();
  },

  start: function() {
    timerIntervalId = setInterval(timer.count, 1000);
    clockRunning = true;
  },

  stop: function() {
    clearInterval(timerIntervalId);
  },

  count: function() {
  	timer.time--;
  	$('#timer').text(timer.time);	
  	if (timer.time === 0){
  		timer.stop();
  		nextQuestion(-1);
  	}
  }
};

function displayQuestion() {

  question = questions[count];
	$('#question').text(question.text);

	$('#answers').empty();

	for (var j = 0; j < question.answers.length; j++){
		var answer = $('<div>');
		answer.addClass('answer');
		answer.text(question.answers[j]);
		answer.attr("data-answervalue", j);
		$('#answers').append(answer);
	}

	timer.reset(5);
}

function nextQuestion(a) {

	$('#answers').empty();

	var div = $('<div>');

	if (a === -1) {
		unanswered++;
		div.text("Time's up: " + question.answerText);
	}
	else if (a == question.correctAnswer) {
		correct++;
		div.text('Correct: ' + question.answerText);
	}
	else {
		wrong++;
		div.text('Incorrect: ' + question.answerText);
	}
	
	$('#answers').append(div);
	$("#answers").append(question.gif);

    count++;

  	if (count === questions.length) {
    	setTimeout(totalScore, 2000);
  	}
  	else {
  		setTimeout(displayQuestion, 2000);
  	}
}

function totalScore() {

	$('#answers').empty();
	var div = $('<div>');
	div.text('You scored: ' + correct + '/' + questions.length);
	$('#answers').append(div);
}

function startQuiz() {
	displayQuestion();
}