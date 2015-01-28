    $( document ).ready(function() {
      
      $('#search_button').on('click', function(){
            $('#output').html(''); //clear previous
            $.getJSON( "https://www.googleapis.com/books/v1/volumes?q=" + $("#search_box").val(), //api access
            function(data) {
              var items = {};
              $.each(data['items'], function(val){
                if (data['items'][val]['volumeInfo'].hasOwnProperty('imageLinks')){ //check that imageLinks exist
                  if (data['items'][val]['volumeInfo']['imageLinks'].hasOwnProperty('thumbnail')){ //check that thumnail is reachable
                    items[data['items'][val]['volumeInfo']['previewLink']] = 
                          data['items'][val]['volumeInfo']['imageLinks']['thumbnail'];
                  }
                }
              });
              
              $.each(items, function(key, val){
                  $('#output').append(formatOutput(key, val));
              });
          });
      });
      
      function formatOutput(key, val){
          return "<a href='" + key + "'target='_blank'><img src='" + val + "' alt='img'/></a>"; 
      }
    });