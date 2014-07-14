
build: components index.js tree.css template.html
	@component build --dev

components: component.json
	@component install --dev

doc:
	@component build --dev
	@rm -fr .gh-pages
	@mkdir .gh-pages
	@mv build .gh-pages/
	@cp example.html .gh-pages/index.html
	@ghp-import .gh-pages -n -p
	@rm -fr .gh-pages

clean:
	rm -fr build components

.PHONY: clean
