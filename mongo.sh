docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker run --name mongodb -d -p 27017:27017 -v $(pwd)/Documentos/Projetos/mongodb/database:/data/db mongo
docker logs -f mongodb