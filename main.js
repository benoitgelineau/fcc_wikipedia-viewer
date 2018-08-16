function displayResults() {
  
  $.ajax(
      {
      type: 'GET',
      url: url + query,
      dataType: "jsonp",
      headers: { 'Api-User-Agent': 'WikipediaViewer/1.0' },

      success: function (data) {
        $(".result-container .article").remove();
        for (var i = 0; i < data[1].length; i++) {
          $(".result-container").append("<div class='article'><a href='" + data[3][i] + "' target='_blank'><h1>" + data[1][i] + "</h1><p>" + data[2][i] + "<p></a></div>");
        }
      }
    })
}

function searchToggle(obj, evt) {
  var container = $(obj).closest('.search-wrapper');

  if (!container.hasClass('active')) {
    container.addClass('active');
    // Focus after 1s
    window.setTimeout(function() {
      $(".search-input").focus();
    }, 500);
    
    evt.preventDefault();
  }
  else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
    window.setTimeout(function() {
      container.removeClass('active');
    }, 100);
    // center elements
    container.removeClass('top');
    $('#randomPage').removeClass('top');
    // clear input
    container.find('.search-input').val('');
    // clear and hide result container when we press close
    $('.result-container .article').remove();
  }
}

function submitSrc(obj, evt) {
  url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  query = $(obj).find('.search-input').val().trim();
  
  // Move elements at the top
  if (!$(".search-wrapper").hasClass('top')) {
    $(".search-wrapper").addClass('top');
    $('#randomPage').addClass('top');
  }

  displayResults();

  evt.preventDefault();
}
