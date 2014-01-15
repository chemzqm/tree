var domify = require ('domify');
var events = require('events');
var classes = require('classes');
var movearound = require('movearound');
var Emitter = require('emitter');
var minstache = require ('minstache');
var tmpl = require('./template');

/**
 * Init tree with parent node
 * @param {Node} parent
 * @api public
 */
function Tree(parent) {
  if (! this instanceof Tree) return new Tree(parent);
  this.el = parent;
  this.events = events(this.el, this);
  this.events.bind('click .tree-branch', 'onclick');
  this.compile = minstache.compile(tmpl);
}

Emitter(Tree.prototype);

function within(el, className, root) {
  while(el && el !== root) {
    if (classes(el).has(className)) return el;
    el = el.parentNode;
  }
  return null;
}

Tree.prototype.parents = function (el) {
  if (typeof el === 'string') {
    el = this.find(el);
  }
  var res = [];
  while (el !== this.el) {
    el = el.parentNode;
    if (classes(el).has('tree-branch')) res.unshift(el);
  }
  return res;
}
/**
 * 
 * @param {Event} e
 * @api private
 */
Tree.prototype.onclick = function(e) {
  var el = e.target;
  //leaf click
  var node = within(el, 'tree-leaf', this.el);
  if (node) {
    var active = this.el.querySelector('.tree-leaf.active');
    if (active) {
      classes(active).remove('active');
    }
    var id = node.getAttribute('data-id');
    classes(node).add('active');
    this.emit('active', node, id);
    return;
  }
  node = within(el, 'tree-branch', this.el);
  //node click
  if (node) {
    classes(node).toggle('tree-collapse');
  }
}

Tree.prototype.collapse = function(el) {
  if( typeof el === 'string' ) {
    el = this.find(el);
  }
  classes(el).add('tree-collapse');
  return this;
}
/**
 * Add branch with text and config
 * @param {String} text
 * @param {Object} config
 * @api public
 */
Tree.prototype.branch = function(text, o) {
  o = o || {};
  var parent = o.parent || this.last;
  var html = this.compile({
    text: text,
    id: o.id || ''
  })
  var node = domify(html);
  var ul = parent.querySelector('.tree-list');
  if (!ul || ul.parentNode !== parent) {
    parent.appendChild(node);
  } else {
    var li = document.createElement('li');
    ul.appendChild(li);
    li.appendChild(node);
  }
  this.last = node;
  return this;
}

/**
 * Add leaf with text and config
 * @param {String} text
 * @param {Object} config
 * @api public
 */
Tree.prototype.leaf = function(text, o) {
  o = o || {};
  var parent = o.parent || this.last;
  var html = '<li class="tree-leaf" data-id="' + (o.id||'') + '">' + text + '</li>';
  var node = domify(html);
  parent.querySelector('ul').appendChild(node);
  return this;
}

/**
 * Get the node by identifier
 * @param {String} id
 * @api public
 */
Tree.prototype.find = function(id) {
  return this.el.querySelector('[data-id="' + id + '"]');
}

/**
 * Expend the element branch expand recursivly
 * @param {String} el
 * @api public
 */
Tree.prototype.show = function(el) {
  if (typeof el === 'string') el = this.find(el);
  el = el.parentNode;
  var node = within(el, 'tree-branch', this.el);
  if (node) {
    classes(node).remove('tree-collapse');
    this.show(node);
  }
  return this;
}

/**
 * Remove element by reference/id or remove all the nodes.
 * @param {String} el
 * @api public
 */
Tree.prototype.remove = function(el) {
  if (arguments.length === 0) {
    this.events.unbind();
    this.el.innerHTML = '';
    if (this.movearound) this.movearound.remove();
    return;
  }
  if (typeof el === 'string') el = this.find(el);
  el.parentNode.removeChild(el);
  var id = el.getAttribute('data-id');
  this.emit('remove', el, id);
  return this;
}

/**
 * Make leaves draggable
 * @api public
 */
Tree.prototype.draggable = function() {
  this.movearound = movearound(this.el, 'tree-list');
  this.movearound.bind();
  this.movearound.on('update', function() {
    this.emit('update');
  }.bind(this));
  return this;
}

module.exports = Tree;
