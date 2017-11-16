//setting up questions

var question1 = {
  text: 'This Cy Young Award winner was the first Indians pitcher since 1949 to lead MLB in ERA (2.25)',
  answers: ['Trevor Bauer', 'Corey Kluber', 'Carlos Carrasco', 'Mike Clevinger'],
  correctAnswer: 1,
  gif: '<img class="img-thumbnail" src="assets/images/kluber.gif" alt="kluber">'
};

var question2 = {
  text: 'The Tribe set an American League record for longest winning streak this year, how many games in a row did they win?',
  answers: ['20', '21', '22', '23'],
  correctAnswer: 2,
  gif: '<img class="img-thumbnail" src="assets/images/22.gif" alt="22">'
};

var question3 = {
  text: 'This player set a single-season franchise record for home runs by a shortstop (33)',
  answers: ['Francisco Lindor', 'Josè Ramírez', 'Jason Kipnis', 'Yandy Díaz'],
  correctAnswer: 0,
  gif: '<img class="img-thumbnail" src="assets/images/lindor.gif" alt="lindor">'
};

var question4 = {
  text: 'This first baseman was a Wilson Defensive Player of the Year winner. He led AL first basemen in Defensive Runs Saved, double plays started and assists, among other categories.',
  answers: ['Giovanny Urshela', 'Lonnie Chisenhall', 'Edwin Encarnacion', 'Carlos Santana'],
  correctAnswer: 3,
  gif: '<img class="img-thumbnail" src="assets/images/santana.gif" alt="santana">'
};

var question5 = {
  text: 'An MVP finalist, this player enjoyed one of the finest offensive seasons in Indians history, becoming only the second Indians batter with at least 100 runs scored, 50 doubles, 25 home runs and 15 stolen bases.',
  answers: ['Francisco Lindor', 'Josè Ramírez', 'Jason Kipnis', 'Yandy Díaz'],
  correctAnswer: 1,
  gif: '<img class="img-thumbnail" src="assets/images/jose.gif" alt="jose">'
};

var question6 = {
  text: 'He\'s the only player in the big league to hit 30 or more homers for the last six seasons.',
  answers: ['Jay Bruce', 'Josè Ramírez', 'Edwin Encarnacion', 'Michael Brantley'],
  correctAnswer: 2,
  gif: '<img class="img-thumbnail" src="assets/images/encarnacion.gif" alt="encarnacion">'
};

var question7 = {
  text: 'Michael Brantley\'s nickname is Dr. Smooth.',
  answers: ['True', 'False'],
  correctAnswer: 0,
  gif: '<img class="img-thumbnail" src="assets/images/brantley.gif" alt="brantley">'
};

var question8 = {
  text: 'Our closer, he gave up runs in only 16 of his 69 appearances.',
  answers: ['Andrew Miller', 'Cody Allen', 'Dan Otero', 'Bryan Shaw'],
  correctAnswer: 1,
  gif: '<img class="img-thumbnail" src="assets/images/allen.gif" alt="allen">'
};

var questions = [question1, question2, question3, question4, question5, question6, question7, question8];

//setting up global variables

var count = 0;
var question;
var timerIntervalId;
var correct = 0;
var wrong = 0;
var unanswered = 0;

//time delays

var answerDelay = 15;
var newQuestionDelay = 3250;

window.onload = function() {
	$("#start").click(startQuiz);
}

$(document).on('click','.answer', function() {
	timer.stop();
    nextQuestion($(this).attr("data-answervalue"));
});

$(document).on('click','#play-again', function() {
  count = 0;
  correct = 0;
  wrong = 0;
  unanswered = 0;
	startQuiz();
});

var timer = {

  //timer object to keep track of time, giving the player 15 seconds to submit an answer

  time: 0,

  reset: function(t) {
    timer.time = t;
    $('#timer').html('<p>Time Remaining: ' + t + '</p>');
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
    $('#timer').html('<p>Time Remaining: ' + timer.time + '</p>');
  	if (timer.time === 0){
  		timer.stop();
  		nextQuestion(-1);
  	}
  }
};

function displayQuestion() {
  
  // displays question and answers in their respective divs

  question = questions[count];
	$('#question').html('<p class="lead">' + question.text + '</p>');

	$('#answers').empty();

	for (var j = 0; j < question.answers.length; j++){
		var answer = $('<button>');
		answer.addClass('list-group-item answer');
		answer.text(question.answers[j]);
		answer.attr("data-answervalue", j);
		$('#answers').append(answer);
	}

	timer.reset(answerDelay);
}

function nextQuestion(a) {

  //displays gif for right or wrong answer, increases global count variable for next question

  $('#question').empty();
	$('#answers').empty();
  $('#timer').empty();

	if (a === -1) {
		unanswered++;
		$('#question').html('<p class="lead">Time\'s up, the correct answer is: ' + question.answers[question.correctAnswer] + '</p>');
    $('#question').append('<img class="img-thumbnail" src="assets/images/kipnis.gif" alt="nope">');
	}
	else if (a == question.correctAnswer) {
		correct++;
		$('#question').html('<p class="lead">Correct!</p>');
    $("#question").append(question.gif);
	}
	else {
		wrong++;
		$('#question').html('<p class="lead">Nope, the correct answer is: ' + question.answers[question.correctAnswer] + '</p>');
    $('#question').append('<img class="img-thumbnail" src="assets/images/bruce.gif" alt="nope">');
	}
	
  count++;

  //if we're on the last question, display total score. otherwise, move on to the next questions

  if (count === questions.length) {
   	setTimeout(totalScore, newQuestionDelay);
  }
  else {
  	setTimeout(displayQuestion, newQuestionDelay);
  }
}

function totalScore() {

  //displaying score totals and button to restart game

	$('#question').empty();
  $('#answers').empty();
  $('#timer').empty();
	var div = $('<div>');
	div.html('<p class="lead">Your score...</p><p>Correct Answers: ' + correct + '<br />Incorrect Answers: ' + wrong + '<br />Unanswered: ' + unanswered + '</p>');
  div.append('<button id="play-again" class="btn btn-lg btn-default">Play Again?</button>')
	$('#answers').append(div);
}

function startQuiz() {
	displayQuestion();
}