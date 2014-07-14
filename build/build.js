/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("component~indexof@0.0.3", function (exports, module) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});

require.register("component~classes@1.2.1", function (exports, module) {
/**
 * Module dependencies.
 */

var index = require("component~indexof@0.0.3");

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
  if (!el) throw new Error('A DOM element reference is required');
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
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
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

});

require.register("component~query@0.0.3", function (exports, module) {
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

});

require.register("component~domify@1.2.2", function (exports, module) {

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  _default: [0, '', '']
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

map.text =
map.circle =
map.ellipse =
map.line =
map.path =
map.polygon =
map.polyline =
map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return the children.
 *
 * @param {String} html
 * @return {Array}
 * @api private
 */

function parse(html) {
  if ('string' != typeof html) throw new TypeError('String expected');
  
  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return document.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = document.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = document.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = document.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

});

require.register("component~emitter@1.1.3", function (exports, module) {

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
  (this._callbacks[event] = this._callbacks[event] || [])
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
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
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
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
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
    , callbacks = this._callbacks[event];

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
  return this._callbacks[event] || [];
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

});

require.register("chemzqm~tap-event@0.0.8", function (exports, module) {
var cancelEvents = [
  'touchcancel',
  'touchstart',
]

var endEvents = [
  'touchend',
]

module.exports = Tap

function Tap(callback) {
  // to keep track of the original listener
  listener.handler = callback

  return listener

  // el.addEventListener('touchstart', listener)
  function listener(e1) {
    // tap should only happen with a single finger
    if (!e1.touches || e1.touches.length > 1)
      return

    var el = this;

    cancelEvents.forEach(function (event) {
      document.addEventListener(event, cleanup)
    })
    el.addEventListener('touchmove', cleanup);

    endEvents.forEach(function (event) {
      document.addEventListener(event, done)
    })

    function done(e2) {
      // since touchstart is added on the same tick
      // and because of bubbling,
      // it'll execute this on the same touchstart.
      // this filters out the same touchstart event.
      if (e1 === e2)
        return

      cleanup()

      // already handled
      if (e2.defaultPrevented)
        return

      var preventDefault = e1.preventDefault
      var stopPropagation = e1.stopPropagation

      e2.stopPropagation = function () {
        stopPropagation.call(e1)
        stopPropagation.call(e2)
      }

      e2.preventDefault = function () {
        preventDefault.call(e1)
        preventDefault.call(e2)
      }

      // calls the handler with the `end` event,
      // but i don't think it matters.
      callback.call(el, e2)
    }

    function cleanup(e2) {
      if (e1 === e2)
        return

      cancelEvents.forEach(function (event) {
        document.removeEventListener(event, cleanup)
      })
      el.removeEventListener('touchmove', cleanup);

      endEvents.forEach(function (event) {
        document.removeEventListener(event, done)
      })
    }
  }
}

});

require.register("component~event@0.1.3", function (exports, module) {
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
});

require.register("component~event@0.1.4", function (exports, module) {
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
});

require.register("component~matches-selector@0.1.2", function (exports, module) {
/**
 * Module dependencies.
 */

var query = require("component~query@0.0.3");

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
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});

require.register("discore~closest@0.1.2", function (exports, module) {
var matches = require("component~matches-selector@0.1.2")

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return  
  }
}
});

require.register("component~delegate@0.2.2", function (exports, module) {
/**
 * Module dependencies.
 */

var closest = require("discore~closest@0.1.2")
  , event = require("component~event@0.1.4");

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

});

require.register("chemzqm~events@1.0.9", function (exports, module) {

/**
 * Module dependencies.
 */

var events = require("component~event@0.1.4");
var delegate = require("component~delegate@0.2.2");
var tap = require("chemzqm~tap-event@0.0.8");
var closest = require("discore~closest@0.1.2");

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
  var cb;

  if (name === 'tap') {
    cb = this.getTapCallback(e, method, args);
    name = 'touchstart';
  } else {
    // callback
    cb = function (){
      var a = [].slice.call(arguments).concat(args);
      obj[method].apply(obj, a);
    }
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

Events.prototype.getTapCallback = function (e, method, args) {
  var obj = this.obj;
  var el = this.el;
  var selector = e.selector;
  return tap(function (ev) {
    if (selector) {
      ev.delegateTarget = closest(ev.target, selector, true, el);
    }
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  })
}

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

});

require.register("component~events@1.0.7", function (exports, module) {

/**
 * Module dependencies.
 */

var events = require("component~event@0.1.3");
var delegate = require("component~delegate@0.2.2");

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

});

require.register("yields~indexof@1.0.0", function (exports, module) {

/**
 * indexof
 */

var indexof = [].indexOf;

/**
 * Get the index of the given `el`.
 *
 * @param {Element} el
 * @return {Number}
 */

module.exports = function(el){
  if (!el.parentNode) return -1;

  var list = el.parentNode.children
    , len = list.length;

  if (indexof) return indexof.call(list, el);
  for (var i = 0; i < len; ++i) {
    if (el == list[i]) return i;
  }
  return -1;
};

});

require.register("chemzqm~movearound@0.4.0", function (exports, module) {
/**
 * dependencies
 */

var emitter = require("component~emitter@1.1.3")
  , classes = require("component~classes@1.2.1")
  , events = require("component~events@1.0.7")
  , indexof = require("yields~indexof@1.0.0");

/**
 * export `Movearound`
 */

module.exports = Movearound;

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
  if (!parent) return;
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

});

require.register("tree", function (exports, module) {
var domify = require("component~domify@1.2.2");
var events = require("chemzqm~events@1.0.9");
var classes = require("component~classes@1.2.1");
var movearound = require("chemzqm~movearound@0.4.0");
var Emitter = require("component~emitter@1.1.3");
var tmpl = require("tree/template.html");
var query = require("component~query@0.0.3");


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


});

require.define("tree/template.html", "<div class=\"tree\">\n  <ul class=\"tree-list\">\n    <li class=\"tree-leaf\"></li>\n    <li class=\"tree-branch\">\n      <div class=\"tree-text\"></div>\n      <ul class=\"tree-list\">\n      </ul>\n    </li>\n  </ul>\n</div>\n");

