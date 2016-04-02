/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	function $(id) {
	  return document.getElementById(id);
	}
	var Tree = __webpack_require__(5);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./tree.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./tree.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".tree-text,\n.tree-leaf {\n  padding-left: 20px;\n  cursor: pointer;\n}\n.tree-branch {\n  position: relative;\n  margin-left: 20px;\n}\n.tree-text::before{\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  font-size: 1em;\n  content: '\\25BE';\n}\nul.tree-list {\n  margin: 0px;\n  padding: 0px;\n  line-height: 1.5;\n  font-size: 18px;\n  /*useful for draggable*/\n  min-height: 5px;\n}\n.tree-list > li {\n  list-style: none;\n}\n.tree-collapse > ul {\n  display: none;\n}\n.tree-collapse .tree-text::before {\n  content: '\\25B8';\n}\n.tree-branch {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var domify = __webpack_require__ (6);
	var events = __webpack_require__(7);
	var classes = __webpack_require__(14);
	var movearound = __webpack_require__(16);
	var Emitter = __webpack_require__(17);
	var tmpl = __webpack_require__(18);
	var query = __webpack_require__(12);


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
	    res.text = node.textContent;
	  }
	  else if (classes(node).has('tree-branch')){
	    res.text = query('.tree-text', node).textContent;
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



/***/ },
/* 6 */
/***/ function(module, exports) {

	
	/**
	 * Expose `parse`.
	 */

	module.exports = parse;

	/**
	 * Tests for browser support.
	 */

	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}

	/**
	 * Wrap map from jquery.
	 */

	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};

	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];

	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */

	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');

	  // default to the global `document` object
	  if (!doc) doc = document;

	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);

	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

	  var tag = m[1];

	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }

	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;

	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }

	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }

	  return fragment;
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	try {
	  var events = __webpack_require__(8);
	} catch(err) {
	  var events = __webpack_require__(8);
	}

	try {
	  var delegate = __webpack_require__(9);
	} catch(err) {
	  var delegate = __webpack_require__(9);
	}

	/**
	 * Expose `Events`.
	 */

	module.exports = Events;

	/**
	 * Initialize an `Events` with the given
	 * `el` object which events will be bound to,
	 * and the `obj` which will receive method calls.
	 *
	 * @param {Object} el
	 * @param {Object} obj
	 * @api public
	 */

	function Events(el, obj) {
	  if (!(this instanceof Events)) return new Events(el, obj);
	  if (!el) throw new Error('element required');
	  if (!obj) throw new Error('object required');
	  this.el = el;
	  this.obj = obj;
	  this._events = {};
	}

	/**
	 * Subscription helper.
	 */

	Events.prototype.sub = function(event, method, cb){
	  this._events[event] = this._events[event] || {};
	  this._events[event][method] = cb;
	};

	/**
	 * Bind to `event` with optional `method` name.
	 * When `method` is undefined it becomes `event`
	 * with the "on" prefix.
	 *
	 * Examples:
	 *
	 *  Direct event handling:
	 *
	 *    events.bind('click') // implies "onclick"
	 *    events.bind('click', 'remove')
	 *    events.bind('click', 'sort', 'asc')
	 *
	 *  Delegated event handling:
	 *
	 *    events.bind('click li > a')
	 *    events.bind('click li > a', 'remove')
	 *    events.bind('click a.sort-ascending', 'sort', 'asc')
	 *    events.bind('click a.sort-descending', 'sort', 'desc')
	 *
	 * @param {String} event
	 * @param {String|function} [method]
	 * @return {Function} callback
	 * @api public
	 */

	Events.prototype.bind = function(event, method){
	  var e = parse(event);
	  var el = this.el;
	  var obj = this.obj;
	  var name = e.name;
	  var method = method || 'on' + name;
	  var args = [].slice.call(arguments, 2);

	  // callback
	  function cb(){
	    var a = [].slice.call(arguments).concat(args);
	    obj[method].apply(obj, a);
	  }

	  // bind
	  if (e.selector) {
	    cb = delegate.bind(el, e.selector, name, cb);
	  } else {
	    events.bind(el, name, cb);
	  }

	  // subscription for unbinding
	  this.sub(name, method, cb);

	  return cb;
	};

	/**
	 * Unbind a single binding, all bindings for `event`,
	 * or all bindings within the manager.
	 *
	 * Examples:
	 *
	 *  Unbind direct handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * Unbind delegate handlers:
	 *
	 *     events.unbind('click', 'remove')
	 *     events.unbind('click')
	 *     events.unbind()
	 *
	 * @param {String|Function} [event]
	 * @param {String|Function} [method]
	 * @api public
	 */

	Events.prototype.unbind = function(event, method){
	  if (0 == arguments.length) return this.unbindAll();
	  if (1 == arguments.length) return this.unbindAllOf(event);

	  // no bindings for this event
	  var bindings = this._events[event];
	  if (!bindings) return;

	  // no bindings for this method
	  var cb = bindings[method];
	  if (!cb) return;

	  events.unbind(this.el, event, cb);
	};

	/**
	 * Unbind all events.
	 *
	 * @api private
	 */

	Events.prototype.unbindAll = function(){
	  for (var event in this._events) {
	    this.unbindAllOf(event);
	  }
	};

	/**
	 * Unbind all events for `event`.
	 *
	 * @param {String} event
	 * @api private
	 */

	Events.prototype.unbindAllOf = function(event){
	  var bindings = this._events[event];
	  if (!bindings) return;

	  for (var method in bindings) {
	    this.unbind(event, method);
	  }
	};

	/**
	 * Parse `event`.
	 *
	 * @param {String} event
	 * @return {Object}
	 * @api private
	 */

	function parse(event) {
	  var parts = event.split(/ +/);
	  return {
	    name: parts.shift(),
	    selector: parts.join(' ')
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var closest = __webpack_require__(10);
	} catch(err) {
	  var closest = __webpack_require__(10);
	}

	try {
	  var event = __webpack_require__(13);
	} catch(err) {
	  var event = __webpack_require__(13);
	}

	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true, el);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};

	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module Dependencies
	 */

	try {
	  var matches = __webpack_require__(11)
	} catch (err) {
	  var matches = __webpack_require__(11)
	}

	/**
	 * Export `closest`
	 */

	module.exports = closest

	/**
	 * Closest
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Element} scope (optional)
	 */

	function closest (el, selector, scope) {
	  scope = scope || document.documentElement;

	  // walk up the dom
	  while (el && el !== scope) {
	    if (matches(el, selector)) return el;
	    el = el.parentNode;
	  }

	  // check scope for match
	  return matches(el, selector) ? el : null;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var query = __webpack_require__(12);
	} catch (err) {
	  var query = __webpack_require__(12);
	}

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (!el || el.nodeType !== 1) return false;
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	function one(selector, el) {
	  return el.querySelector(selector);
	}

	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};

	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};

	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	try {
	  var index = __webpack_require__(15);
	} catch (err) {
	  var index = __webpack_require__(15);
	}

	/**
	 * Whitespace regexp.
	 */

	var re = /\s+/;

	/**
	 * toString reference.
	 */

	var toString = Object.prototype.toString;

	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */

	module.exports = function(el){
	  return new ClassList(el);
	};

	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */

	function ClassList(el) {
	  if (!el || !el.nodeType) {
	    throw new Error('A DOM element reference is required');
	  }
	  this.el = el;
	  this.list = el.classList;
	}

	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }

	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }

	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};

	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */

	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};

	/**
	 * Toggle class `name`, can force state via `force`.
	 *
	 * For browsers that support classList, but do not support `force` yet,
	 * the mistake will be detected and corrected.
	 *
	 * @param {String} name
	 * @param {Boolean} force
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.toggle = function(name, force){
	  // classList
	  if (this.list) {
	    if ("undefined" !== typeof force) {
	      if (force !== this.list.toggle(name, force)) {
	        this.list.toggle(name); // toggle again to correct
	      }
	    } else {
	      this.list.toggle(name);
	    }
	    return this;
	  }

	  // fallback
	  if ("undefined" !== typeof force) {
	    if (!force) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  } else {
	    if (this.has(name)) {
	      this.remove(name);
	    } else {
	      this.add(name);
	    }
	  }

	  return this;
	};

	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */

	ClassList.prototype.array = function(){
	  var className = this.el.getAttribute('class') || '';
	  var str = className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};

	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */

	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * dependencies
	 */

	var emitter = __webpack_require__(17)
	  , classes = __webpack_require__(14)
	  , events = __webpack_require__(7)
	  , indexOf = __webpack_require__(15);

	/**
	 * export `Movearound`
	 */

	module.exports = Movearound;

	function indexof(el) {
	  if (!el.parentNode) return -1;
	  var list = el.parentNode.children;
	  if (!list || list.length === 0) return -1;
	  return indexOf(list, el);
	}

	/**
	 * Initialize `Movearound` with `el`.
	 *
	 * @param {Element} el
	 * @param {String} className class name to find the draggable elements
	 * @param {Boolean} handle [optional] whether to set handler element
	 * @param {String} class name used for finding sortable elements
	 */

	function Movearound(el, className, handle){
	  if (!(this instanceof Movearound)) return new Movearound(el, className);
	  if (!el) throw new TypeError('connector(): expects an element');
	  this.className = className;
	  this.handle = handle;
	  this.events = events(el, this);
	  this.el = el;
	}

	/**
	 * mixins.
	 */

	emitter(Movearound.prototype);

	/**
	 * bind internal events.
	 *
	 * @return {Movearound}
	 */

	Movearound.prototype.bind = function(){
	  this.events.unbind();
	  this.events.bind('dragstart');
	  this.events.bind('dragover');
	  this.events.bind('dragenter');
	  this.events.bind('dragend');
	  this.events.bind('drop');
	  this.events.bind('mousedown');
	  this.events.bind('mouseup');
	  return this;
	};

	Movearound.prototype._clone = function(node) {
	  this.clone = null;
	  this.clone = node.cloneNode(true);
	  this.clone.innerHTML = '';
	  classes(this.clone).add('movearound-placeholder');
	};

	/**
	 * unbind internal events.
	 *
	 * @return {Movearound}
	 */

	Movearound.prototype.unbind = function(e){
	  this.events.unbind();
	  this.parents = null;
	  this.clone = null;
	  return this;
	};

	/**
	 * destroy movearound
	 *
	 * @return  {Movearound}
	 */

	Movearound.prototype.remove = function() {
	  this.events.unbind();
	  this.off();
	  this.unbind();
	};

	Movearound.prototype.onmousedown = function(e) {
	  var node = e.target;
	  this.parents = this.el.querySelectorAll('.' + this.className);
	  this.els = [];
	  for (var i = 0; i < this.parents.length; i++) {
	    var children = this.parents[i].children;
	    for (var j = 0; j < children.length; j++) {
	      if (!this.handle) {
	        children[j].classList.add('movearound-handler')
	      }
	      this.els.push(children[j]);
	    }
	  }
	  while (node && node !== this.el){
	    if (node.classList.contains('movearound-handler')) {
	      for (var k = 0; k < this.els.length; k++) {
	        if (this.els[k].contains(node)) {
	          this.draggable = this.els[k];
	          this.draggable.draggable = true;
	        }
	      }
	      this._handler = node;
	      return;
	    }
	    node = node.parentNode;
	  }
	  this._handler = null;
	};

	Movearound.prototype.onmouseup = function(e) {
	  if (this.draggable) {
	    this.draggable.draggable = false;
	  }
	};
	/**
	 * on-dragstart
	 */

	Movearound.prototype.ondragstart = function(e){
	  if (!this._handler) {
	    return e.preventDefault();
	  }
	  this._handler = null;
	  this._clone(this.draggable);
	  this.i = indexof(e.target);
	  this.parent = e.target.parentNode;
	  this.display = window.getComputedStyle(e.target).display;
	  var h = window.getComputedStyle(e.target).height;
	  this.clone.style.height = h;
	  e.dataTransfer.setData('text', ' ');
	  e.dataTransfer.effectAllowed = 'move';
	  classes(e.target).add('dragging');
	  this.emit('start', e);
	};

	/**
	 * on-dragover
	 * on-dragenter
	 */

	Movearound.prototype.ondragenter =
	Movearound.prototype.ondragover = function(e){
	  e.preventDefault();
	  if (!this.draggable || !this.clone) return;
	  if (e.target === this.el) return;
	  var el = e.target;
	  var parent;
	  if (within(this.parents, el)) {
	    parent = el;
	    el = null;
	  } else {
	    while (el && el !== this.el) {
	      parent = el.parentNode;
	      if ( parent && within(this.parents, parent))  break;
	      el = parent;
	    }
	  }
	  if (!parent || parent === this.el) return;
	  e.dataTransfer.dropEffect = 'move';
	  this.draggable.style.display = 'none';
	  if (el) {
	    var ci = indexof(this.clone);
	    var i = indexof(el);
	    if (ci < i) el = el.nextSibling;
	  }
	  parent.insertBefore(this.clone, el);
	};

	/**
	 * on-dragend
	 */

	Movearound.prototype.ondragend = function(e){
	  if (this.clone) remove(this.clone);
	  if (!this.draggable) return;
	  this.draggable.style.display = this.display;
	  classes(this.draggable).remove('dragging');
	  this.draggable.draggable = false;
	  if (indexof(this.draggable) !== this.i
	      || this.draggable.parentNode !== this.parent){
	      this.emit('update');
	  }
	};

	/**
	 * on-drop
	 */

	Movearound.prototype.ondrop = function(e){
	  e.stopPropagation();
	  this.clone.parentNode.insertBefore(this.draggable, this.clone);
	  this.ondragend(e);
	  this.emit('drop');
	  this.reset();
	};

	/**
	 * Reset sortable.
	 *
	 * @api private
	 * @return {Movearound}
	 */

	Movearound.prototype.reset = function(){
	  this.i = null;
	  this.parent = null;
	  this.draggable = null;
	  this.display = null;
	};

	/**
	 * Remove the given `el`.
	 *
	 * @param {Element} el
	 * @return {Element}
	 */

	function remove(el){
	  if (!el.parentNode) return;
	  el.parentNode.removeChild(el);
	}

	/**
	 * set `els` `prop` to `val`.
	 *
	 * TODO: separate component
	 *
	 * @param {NodeList} els
	 * @param {String} prop
	 * @param {Mixed} val
	 */

	function prop(els, p, val){
	  if(!els) return;
	  for (var i = 0, len = els.length; i < len; ++i) {
	    els[i][p] = val
	  }
	}

	function within (list, element) {
	  for (var i = 0; i < list.length; i++) {
	    if (list[i] === element) {
	      return true;
	    }
	  }
	  return false;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"tree\">\n  <ul class=\"tree-list\">\n    <li class=\"tree-leaf\"></li>\n    <li class=\"tree-branch\">\n      <div class=\"tree-text\"></div>\n      <ul class=\"tree-list\">\n      </ul>\n    </li>\n  </ul>\n</div>\n";

/***/ }
/******/ ]);