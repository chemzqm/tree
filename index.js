var domify = require ('domify');
var events = require('events');
var classes = require('classes');
var movearound = require('movearound');
var Emitter = require('emitter');
var tmpl = require('./template');
var query = require('query');


/**
 * Init tree with parent node
 * @param {Node} parent
 * @api public
 */
function Tree(parent) {
  if (! this instanceof Tree) return new Tree(parent);
  this.el = parent;
  this.events = events(this.el, this);
  this.events.bind('click', 'onclick');
  var el = domify(tmpl);
  parent.appendChild(el);
  this.root = query('.tree', parent);
  this.leafNode = query('.tree-leaf', parent);
  this.branchNode = query('.tree-branch', parent);
  var list = query('.tree-list', this.root);
  clear(list);
}

Emitter(Tree.prototype);

/**
 * Add leaf with text and config
 * @param {String} text
 * @param {Object} config
 * @api public
 */
Tree.prototype.leaf = function(text, o) {
  o = o || {};
  var parent = o.parent || this.last || this.root;
  if (typeof parent === 'string') {
    parent = this.find(parent);
  }
  var node = this.leafNode.cloneNode(true);
  for (var i in o) {
    i === 'parent' || node.setAttribute('data-' + i, o[i]);
  }
  node.innerHTML = text;
  var ul = query('.tree-list', parent);
  ul.appendChild(node);
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
  var parent = o.parent || this.last || this.root;
  if (typeof parent === 'string') {
    parent = this.find(parent);
  }
  var node = this.branchNode.cloneNode(true);
  for (var i in o) {
    i === 'parent' || node.setAttribute('data-' + i, o[i]);
  }
  query('.tree-text', node).innerHTML = text;
  var ul = query('.tree-list', parent);
  ul.appendChild(node);
  this.last = node;
  return this;
}


Tree.prototype.parents = function (el) {
  if (typeof el === 'string') {
    el = this.find(el);
  }
  var res = [];
  while (el !== this.root) {
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
  var node = within(el, 'tree-leaf', this.el);
  if (node) {
    //active leaf
    var active = query('.active', this.el);
    if (active) {
      classes(active).remove('active');
    }
    var id = node.getAttribute('data-id');
    classes(node).add('active');
    this.emit('active', node);
  } else {
    node = within(el, 'tree-text', this.el);
    if (node) {
      classes(node.parentNode).toggle('tree-collapse');
    }
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
 * Get the node by identifier
 * @param {String} id
 * @api public
 */
Tree.prototype.find = function(id) {
  return query('[data-id="' + id + '"]', this.el);
}

/**
 * Expend the element branch recursive
 * @param {String} el
 * @api public
 */
Tree.prototype.show = function(el) {
  if (typeof el === 'string') el = this.find(el);
  var parent = el.parentNode;
  if (parent !== this.root) {
    classes(parent).remove('tree-collapse');
    this.show(parent);
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
    clear(this.el);
    this.movearound && this.movearound.remove();
    return;
  }
  if (typeof el === 'string') el = this.find(el);
  el.parentNode.removeChild(el);
  var id = el.getAttribute('data-id');
  this.emit('remove', el);
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

/**
 * build the tree with obj, optional configured with `text` and `children` attribute.
 *
 * @param {String} obj data source
 * @param {String} config [optional] config object
 * @api public
 */
Tree.prototype.data = function(obj, config) {
  config = config || {};
  var textAttr = config.text || 'text';
  var childrenAttr = config.children || 'children';
  obj.forEach(function (o) {
    o = clone(o);
    o.parent = o.parent || this.root;
    var text = o[textAttr];
    var children = o[childrenAttr];
    delete o[textAttr];
    delete o[childrenAttr];
    if (children) {
      this.branch(text, o);
      children.forEach(function (child) {
        child.parent = this.last;
      }.bind(this))
      this.data(children, config);
    } else {
      this.leaf(text, o);
    }
  }.bind(this))
}

/**
 * return the json string format of the tree
 * @api public
 */
Tree.prototype.toJSON = function() {
  var res = [];
  var list = query('.tree-list', this.root).childNodes;
  if (list) {
    for (var i = 0; i < list.length; i++) {
      var node = list[i];
      node.nodeType === 1 && res.push(toObject(node));
    }
  }
  return JSON.stringify(res);
}

module.exports = Tree;

function toObject(node) {
  var res = {}, i;
  var attrs = node.attributes;
  for ( i = 0; i < attrs.length; i++) {
    var name = attrs[i].nodeName;
    if (/^data-/.test(name)) {
      res[name.replace(/^data-/, '')] = node.getAttribute(name);
    }
  }
  if (classes(node).has('tree-leaf')) {
    res.text = node.innerHTML;
  }
  else if (classes(node).has('tree-branch')){
    res.text = query('.tree-text', node).innerHTML;
    res.children = [];
    var list = query('.tree-list', node).childNodes;
    for ( i = 0; i < list.length; i++) {
      node = list[i];
      node.nodeType === 1 && res.children.push(toObject(node));
    }
  }
  return res;
}

function clone(o) {
  var res = {};
  for (var i in o) {
    res[i] = o[i];
  }
  return res;
}

function clear(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}
function within(el, className, root) {
  while(el && el !== root) {
    if (classes(el).has(className)) return el;
    el = el.parentNode;
  }
  return null;
}

