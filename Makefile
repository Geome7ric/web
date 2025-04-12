build:
	npm run build

deploy:
	npx vercel --prod

build-deploy: build deploy

up:
	npm run dev