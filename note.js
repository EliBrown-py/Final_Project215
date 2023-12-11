function createNote() {
    let noteNumber = parseInt($("#noteNumber").val());
    let noteContent = $("#id_noteform").val();
    let para = $(`<p class="note">${noteContent}</p>`);
  
    // Specify the position to add the note
    let position = parseInt($("#position").val());
  
    let noteMatched = $("#flyer p");
    let lastPara = noteMatched.eq(position - 1);
  
    if (noteMatched.length == 0 || position > noteMatched.length) {
      para.appendTo($("#flyer"));
    } else {
      lastPara.before(para);
    }
  }
  
  $(document).ready(function () {
    $("#addNoteButton").on("click", createNote);
  });

  function removeNote() {
    let noteNumber = parseInt($("#noteNumber").val());
    let selectedNote = $(`#flyer p:eq(${noteNumber - 1})`);

    selectedNote.fadeOut(3000, function () {
        $(this).remove();
    });
    
}
//Delete all notes 
const getRidOfAll = () => {
    // Clear out all child elements from the specified container
    
    $("#flyer").empty();
  };
//Mark a note as important 
function markAsImportant() {
    let noteNumber = parseInt($("#noteNumber").val());
    $(`#flyer p:eq(${noteNumber - 1})`).toggleClass("importantCustomerNote");
}

// DETACH
let detachNote;
const temporarilyRemove = () => {
  //Find the paragraph to be removed
  let paraNum = $("#noteNumber").val();
  paraNum = parseInt(paraNum) - 1;
  let para = $("#flyer p:eq(" + paraNum + ")");
  detachNote = para.detach();
};

// APPEND
const restorePara = () => {
  $("#flyer").append(detachNote);
};


