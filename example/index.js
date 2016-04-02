require('../tree.css')
function $(id) {
  return document.getElementById(id);
}
var Tree = require('..');
var parent = document.getElementById('tree');
var tree = new Tree(parent);
tree.data([{
    text: 'o'
  }, {
    text: 'first title',
    id: 'first',
    children:[
      {text: '2'},
      {text: '3'},
      {
        text: 'other title',
        id: 'other',
        children: [
          {text: '4'},
          {text: '5'},
          {
            text: 'sub title',
            id: 'sub',
            children: [
              {text: '6'},
              {text: '7', id: 7},
              {text: '8'}
            ]
          }
        ]
      }
    ]
  }, {
    text: 'end'
  }])
tree.on('active', function(node) {
  console.log(node);
})
tree.on('update', function(){
  console.log('update');
})
tree.draggable();
tree.collapse('first');
tree.collapse('sub');
$('show').addEventListener('click', function() {
  tree.show('7');
});
$('remove').addEventListener('click', function(){
  tree.remove('other');
})
$('parents').addEventListener('click', function(){
  var nodes = tree.parents('7');
  var ids = [].slice.call(nodes).map(function(n){
    return this.getAttribute('data-id');
  });
  console.log(ids);
})
$('destroy').addEventListener('click', function(){
  tree.remove();
})
$('json').addEventListener('click', function(){
  var str = tree.toJSON();
  console.log(str);
})
