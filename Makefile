.PHONY: build run

build:
	docker build -t gitlab-bot:dev .

run: build
	docker run --rm -p 80:3000 -it gitlab-bot:dev

clean:
	docker rmi gitlab-bot:dev

