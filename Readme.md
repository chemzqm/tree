# tree

  Lightweight tree component, with dynamic node, event and D&D support.

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/tree

## Events

* `update` emitted after D&D event.
* `active` emitted with `node` and `id` when a leaf node is clicked, class `active` is added to that node.

## API

### Tree(parent)

Init tree with parent node.

### .branch(text, [config])

Add a branch node with `text` and optional config (id is used for `data-id` attribute and parent is refenence of parent node).

### .leaf(text, [config])

Add a leaf node with text and optional config object.

### .find(id)

Get the node by `data-id`.

### .show(id | el)

Make the node visible by `data-id` or node refenence.

### .remove(id | el)

Remove the node by `data-id` or node refenence.

### .draggable()

Make the leaves draggable.

### .collapse(id | el)

Collapse the branch node by id or node reference.

### .parents(id | el)

Get branch node list by id or node reference.

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright chemzqm@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
