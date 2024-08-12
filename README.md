# rect-crud

#### Comando para install el docker de la db
`docker compose up -d db`

#### Comando para visualizar los dockers desplegado
`docker ps -a`

#### Comando para ejecutar la base de datos dentro del contenedor
`docker exec -it db psql -U postgres`

#### Comando para visualizar lo que existe dentro de la bd
`\l`

#### Comando para bajar el docker
`docker-compose down`

#### Comando para iniciar el docker //UNA SOLA VEZ
`npm init -y`

#### Comando para install prisma ORM
`npm i express prisma @prisma/client`

#### Comando para iniciar ORM
`npx prisma init`

#### Comando para generar el modelo de la BD a traves de Prisma
`npx prisma generate`

#### Comando para iniciar el server
`node index.js`

#### Comando para construir la imagen docker
`docker compose build`

#### Comando para install el docker del backend
`docker compose up -d backend`

#### Comando para unir las configuraciones a traves de prisma para integrarlo en la bd psql corriendo en el docker
`docker exec -it backend npx prisma migrate dev --name init`

#### Comando para ejecutar el ORM de la BD (Ejecutar dentro de backend)
`npx prisma studio`

#### Comando para instalar librerias en el frontend
`docker compose build`
`docker compose up -d frontend`
`npm i axios`
`npm run dev`


#### Comando para instalar prometheus con nodejs
`npm i prom-client`

#### Comando para crear el docker del prometheus
`docker run --name=prometheus -p 9090:9090 -v /c/Users/cijei/Desktop/rect-crud-main/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus`

#### Comando para crear el docker del grafana
`docker run --name=grafana -p 3001:3000 grafana/grafana`
