// FUNCTIONS

// When character is selected proceed to input words
var characterSelection = function(face) {
  if (face === 'ross'){
    $('#storyphotos-ul').hide()
  }else if (face === 'pratt'){
    return false;
  }else if (face === 'phil'){
    return false;
  }else if (face === 'nathan'){
    return false;
  }
}


// USER INTERACTIONS

// Ross image select
$("#ross_face").live('click', function() {
  characterSelection('ross');
});
