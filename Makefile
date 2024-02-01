DATA_VOLUME     := $(shell pwd)
IMAGE           := kevinrutherford/rookery-collections
MK_IMAGE_BUILT  := .mk-built
MK_PUBLISHED    := .mk-published
MK_COMPILED     := .mk-compiled
MK_LINTED       := .mk-linted
SOURCES         := $(shell find src -type f)

.PHONY: all build-dev ci-* clean clobber dev lint watch-*

# Software development - - - - - - - - - - - - - - - - - - - - - - - - - - - -

all: $(MK_LINTED)

watch-compiler: node_modules
	npx tsc --watch

$(MK_COMPILED): node_modules $(SOURCES) tsconfig.json
	npx tsc --noEmit
	@touch $@

$(MK_LINTED): node_modules .eslintrc.js $(SOURCES)
	npx eslint src --ext .ts
	npx ts-unused-exports tsconfig.json --silent --ignoreTestFiles
	@touch $@

# CI pipeline - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ci-test: clean $(MK_COMPILED) $(MK_LINTED)

# Dev server - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev: build-dev
	docker run \
		-e FORCE_COLOR=3 \
		-p 44002:8081 \
		-v /var/opt/zk:/var/opt/zk \
		-v $(DATA_VOLUME)/src:/home/wiki/src:ro \
		$(IMAGE):local-dev

build-dev: node_modules
	docker build -t $(IMAGE):local-dev . --target dev

# Artefacts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node_modules: package.json
	npm install

# Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean:
	rm -f $(MK_IMAGE_BUILT) $(MK_PUBLISHED) $(MK_LINTED)

clobber: clean
	-rm -rf node_modules
	-docker rmi $$(docker images -f "dangling=true" -q)
	-docker volume rm $$(docker volume ls -f "dangling=true" -q)

