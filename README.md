Rodar os seguintes comandos antes de iniciar o servidor:
docker run --name trainee-teste -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
yarn seed:run
yarn typeorm:run

yarn dev
