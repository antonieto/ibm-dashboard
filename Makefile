# Build the Docker image for the app service
build:
	docker-compose build

# Start the Docker containers
start:
	docker-compose up -d \
	&& export DATABASE_URL=postgres://postgres:password@localhost:5432/ibmdashboard-local \
	&& cd ./data-dashboard \
	&& yarn install \
	&& npx prisma migrate deploy && yarn dev
	

# Stop the Docker containers
stop:
	docker-compose down --remove-orphans \
	

# Show logs from the Docker containers
logs:
	docker-compose logs -f app

reset-db:
	docker-compose down -v \
	&& docker-compose up -d \
	&& export DATABASE_URL=postgres://postgres:password@localhost:5432/ibmdashboard-local \
	&& cd ./data-dashboard \
	&& npx prisma migrate reset --force && yarn dev
