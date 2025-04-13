build:
	npm run build -y

deploy:
	npx vercel --prod -y

bd: build deploy

up:
	npm run dev