test:
	@mocha -R list unit/
run:
	@.bin/hns -s
dev:
	@grunt supervisor
