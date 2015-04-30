test:
	@mocha -R list unit/
run:
	@bin/hns-serve -p 4000 
dev:
	@grunt serve:dev 
