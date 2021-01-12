$(function(){
  $("#malfunctions").on("change", setBadgeForMultiselect);
});

// вывод значков для неисправностей (пока что без возможности их удалить)
// TODO: добавить возможность удалить значки
function setBadgeForMultiselect(){
  let array = $('#malfunctions').val();
  clearBadgeArea();
  array.forEach(e => appendToTheBadgeArea(e));
}

// вывод значков
function appendToTheBadgeArea(value){
  $('#badge-area').append(`<h5><span class='badge badge-primary p-2 mt-1 mr-1'>${value}</span></h5>`);
}

// очистка зоны для вывода значков
function clearBadgeArea(){
  $('#badge-area').html("");
}
