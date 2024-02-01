IMAGE           := kevinrutherford/rookery-collections
MK_IMAGE  := .mk-built
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

# Production build - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(MK_IMAGE): $(SOURCES) Dockerfile node_modules
	docker build --tag $(IMAGE) .
	@touch $@

preview: $(MK_IMAGE)
	docker run -e FORCE_COLOR=3 -p 44002:8081 -it --rm $(IMAGE)

release: $(MK_IMAGE) git-status-clean
	docker tag $(IMAGE):latest $(IMAGE):$(IMAGE_VERSION)
	docker push $(IMAGE):$(IMAGE_VERSION)
	docker push $(IMAGE):latest

git-status-clean:
	@test -z "$$(git status --porcelain)"

# Artefacts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node_modules: package.json
	npm install
	@touch $@

# Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean:
	rm -f $(MK_IMAGE) $(MK_PUBLISHED) $(MK_LINTED)

clobber: clean
	rm -rf node_modules
	docker system prune --force --volumes

