
build: components index.js tree.css template.html
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean
