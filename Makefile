.PHONY: build run

PORT?=80

build:
	docker build -t gitlab-bot:dev .

run: build
	docker run --rm -p ${PORT}:3000 -it gitlab-bot:dev

clean:
	docker rmi gitlab-bot:dev

