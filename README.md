# walmart-party

The party in the back of the Mullet

### Run the party in a Docker container

#### What you will need

* Docker
* Docker compose

#### Two ways to run it in a Docker container

The easy way _which will be mapped to port 3000_.

```bash

docker-compose up
```

The _other_ way which will be mapped to whatever port you ask.
i.e port 3000

```bash

docker build -t walmart-party:latest .
docker run -it -p 3000:3000 walmart-party:latest
```
