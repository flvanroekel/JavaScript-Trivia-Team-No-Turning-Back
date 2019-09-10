/*
;===========================================================================================================================================
; Title:  main.js
; Author: Faye Van Roekel, Brittany Dockter, Ernie Phillips
; Date:   16 Aug 2019
; Description: js class to handle dom traversal of form radio buttons
;===========================================================================================================================================
*/

var Pagination = Pagination || {};

Pagination.paginationHandler = function () {
  // store pagination container so we only select it once
  var $paginationContainer = $(".pagination-container"),
      $pagination = $paginationContainer.find('ul.pagination');
  $("ul.pagination li:nth-child(2)").addClass("active"); //imediately set the active pagination number
  // click event
  $pagination.find("li a").on('click.pageChange', function (e) {
    e.preventDefault();
    // get parent li's data-page attribute and current page
    var parentLiPage = $(this).parent('li').data("page"),
    currentPage = parseInt($(".pagination-container div[data-page]:visible").data('page')),
    numPages = $paginationContainer.find("div[data-page]").length;
    var $validateRadioSelected = $('input:radio[name="Question' + currentPage + '"]:checked').length > 0;
    if ($validateRadioSelected || currentPage === 11) {
      $("#error").text("");
      // make sure they aren't clicking the current page
      if (parseInt(parentLiPage) !== parseInt(currentPage)) {
        // hide the current page
        $paginationContainer.find("div[data-page]:visible").hide();
        if (parentLiPage === '+') {
          // next page
          $paginationContainer.find("div[data-page=" + (currentPage + 1 > numPages ? numPages : currentPage + 1) + "]").show();
          $("ul.pagination li:nth-child(" + (currentPage + 1) + ")").removeClass("active"); 
          $("ul.pagination li:nth-child(" + (currentPage + 2) + ")").addClass("active"); 
        } else if (parentLiPage === '-') {
          // previous page
          $paginationContainer.find("div[data-page=" + (currentPage - 1 < 1 ? 1 : currentPage - 1) + "]").show();
          $("ul.pagination li:nth-child(" + (currentPage + 1) + ")").removeClass("active"); 
          $("ul.pagination li:nth-child(" + (currentPage) + ")").addClass("active"); 
        } else {
          // specific page
          $paginationContainer.find("div[data-page=" + parseInt(parentLiPage) + "]").show();
          $("ul.pagination li:nth-child(" + (currentPage + 1) + ")").removeClass("active"); //imediately set the active pagination number
          $("ul.pagination li:nth-child(" + (parentLiPage + 1) + ")").addClass("active"); //imediately set the active pagination number
        }
      }
    }
    else {
      $("#error").text("Option selection required before proceeding.");
    }
  });
};



Pagination.customPagination = function () {
  // store pagination container so we only select it once
  var //$topPaginationContainer = $("#customPagination"),
      $paginationContainer = $(".pagination-container"),
      //find top and bottom anchor tags
      $backPagination = $paginationContainer.find('#aBack'),
      $nextPagination = $paginationContainer.find('#aNext');

  // click event for top and bottom anchor tags
  $backPagination.click(function (e) {
    e.preventDefault();
    var currentPage = parseInt($(".pagination-container div[data-page]:visible").data('page')), //get current visible page
        numPages = $paginationContainer.find("div[data-page]").length; //get number of all pages
    var $validateRadioSelected = $('input:radio[name="Question' + currentPage + '"]:checked').length > 0;
    if ($validateRadioSelected || currentPage === 11) {
      $("#error").text("");
      $paginationContainer.find("div[data-page]:visible").hide(); //hide current
      $paginationContainer.find("div[data-page=" + (currentPage - 1 < 1 ? 1 : currentPage - 1) + "]").show(); //show previous page
      $("ul.pagination li:nth-child(" + (currentPage + 1) + ")").removeClass("active");
      $("ul.pagination li:nth-child(" + (currentPage) + ")").addClass("active");
    }
    else {
      $("#error").text("Option selection required before proceeding.");
    }
  });
  $nextPagination.click(function (e) {
    e.preventDefault();
    var currentPage = parseInt($(".pagination-container div[data-page]:visible").data('page')), //get current visible page
        numPages = $paginationContainer.find("div[data-page]").length; //get number of all pages
    var $validateRadioSelected = $('input:radio[name="Question' + currentPage + '"]:checked').length > 0;
    if ($validateRadioSelected || currentPage === 11) {
      $("#error").text("");
      $paginationContainer.find("div[data-page]:visible").hide(); //hide current
      $paginationContainer.find("div[data-page=" + (currentPage + 1 > numPages ? numPages : currentPage + 1) + "]").show(); //show next page
      $("ul.pagination li:nth-child(" + (currentPage + 1) + ")").removeClass("active");
      $("ul.pagination li:nth-child(" + (currentPage + 2) + ")").addClass("active");
    }
    else {
      $("#error").text("Option selection required before proceeding.");
    }
  })
}