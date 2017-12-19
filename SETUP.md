How to setup the server running gitlab bot
==========================================

Get a up to date version of ubuntu or any other system being able to host docker as this project uses docker to provide an up to date node.js environment.

Install docker
--------------

```shell
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get install docker-ce
```

Start the project
-----------------

Build the docker image and run it with port forwarding:
```shell
make run
```

By default the containers port 3000 will be forwarded to the host port 80. This can be changed by providing an environment variable `PORT` like `PORT=8080 make run`.

Remove the built docker image:
```shell
make clean
```

