/*
;===========================================================================================================================================
; Title:  main.js
; Author: Faye Van Roekel, Brittany Dockter, Ernie Phillips
; Date:   15 Aug 2019
; Description: basic Javascript file for maintaining application's questions, multiple choice, correct answers, user's answers, ranking and 
; scoring
;===========================================================================================================================================
*/

/// <reference path="knockout-3.5.0.js" />

//Create object of Pagination javascript class for later reference of traversing through radio forms
var Pagination = Pagination || {};

//call pagination handler
$(function () {
  Pagination.paginationHandler();
  Pagination.customPagination();
});

//set score variable
var score;

//set questions
var questions = {
  Question1: {
    multipleChoice: {
      question: "This is question 1",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "a"
  },
  Question2: {
    multipleChoice: {
      question: "This is question 2",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "a"
  },
  Question3: {
    multipleChoice: {
      question: "This is question 3",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "c"
  },
  Question4: {
    multipleChoice: {
      question: "This is question 4",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "b"
  },
  Question5: {
    multipleChoice: {
      question: "This is question 5",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "a"
  },
  Question6: {
    multipleChoice: {
      question: "This is question 6",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "d"
  },
  Question7: {
    multipleChoice: {
      question: "This is question 7",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "a"
  },
  Question8: {
    multipleChoice: {
      question: "This is question 8",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    }
      ,
    userAnswer: ko.observable(""),
    correctAnswer: "b"
  },
  Question9: {
    multipleChoice: {
      question: "This is question 9",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "a"
  },
  Question10: {
    multipleChoice: {
      question: "This is question 10",
      a: "multiple choice 1",
      b: "multiple choice 2",
      c: "multiple choice 3",
      d: "multiple choice 4"
    },
    userAnswer: ko.observable(""),
    correctAnswer: "c"
  }
};
ko.cleanNode(document.getElementById('QandA'));
ko.applyBindings(questions, document.getElementById('QandA'));

$(function () {
  $("#btnSubmit").click(function () {
    var allAnswered = true; //set bool
    var unansweredQuestions = "";
    var counter = 1;
    Object.keys(questions).forEach(function (questionKey) { //check all answered before allowing submission
      if (questions[questionKey].userAnswer._latestValue === "") {
        allAnswered = false;
        unansweredQuestions += "<br />Question " + counter + ", ";
      }
      counter++;
    });

    //if all answered
    if (allAnswered) {
      $("#error").text("");
      $("#cardResults").css('visibility', 'visible');
      var results = (function () {
        var qaya = [], yourRank = "", yourScore = "";
        score = 0;

        Object.keys(questions).forEach(function (questionKey) {
          if (questions[questionKey].correctAnswer === questions[questionKey].userAnswer._latestValue) {
            score++;
          }
        });

        //output questions, user's answer, and correct answer
        Object.keys(questions).forEach(function (questionKey) {
          qaya.push({
            question: "Question: " + questions[questionKey].multipleChoice.question,
            correctAnswer: "Correct Answer: " + questions[questionKey].correctAnswer,
            yourAnswer: "Your Answer: " + questions[questionKey].userAnswer._latestValue
          });
        });


        //rank the score and output
        yourRank = "Your rank: " + rank();
        yourScore = "Your Score: " + (((score) / 10) * 100) + "%";

        return {
          getQaya: qaya,
          getRank: yourRank,
          getScore: yourScore
        }
      })();
      var viewModelResults = {
        qaya: results.getQaya,
        rank: results.getRank,
        score: results.getScore
      }

      ko.cleanNode(document.getElementById('results'));
      ko.applyBindings(viewModelResults, document.getElementById('results'))
      $("#btnSubmit").attr("disabled", true);
      $(".pagination").remove();
      $('#aBack').remove();
      $('#aNext').remove();
      $("#btnSubmit").remove();
      $("#btnRetake").css('visibility', 'visible');
    }
    else {
      unansweredQuestions = unansweredQuestions.replace(/,\s*$/, "");// trim comma and white space
      $("#error").html("Please answer the following questions before submitting: " + unansweredQuestions);
    }
  });
  $("#btnRetake").click(function () {
    location.reload();
  });
});


var rank = function () {
  switch (true) {
    case (score >= 9):
      return "Expert: 8-10 correct answers";
    case (score >= 7):
      return "Novice: 6-8 correct answers";
    case (score < 7):
      return "Beginner: Less than 6 correct answers";
    default:
      userRanking = "An error occured, please contact admin";
  }
}