# ibm-dashboard
Angel Padilla Esqueda A01639055 </br>
Ana Paola Tirado González A01638763</br>
Luis David López Magaña A00344656</br>
José Antonio Chaires Monroy A01640114</br>
Oscar Jahir Valdés Caballero A01638923</br>
</br></br>

Nombre: </br>

Misión:</br>
Nuestra misión es desarrollar software transparente, confiable, seguro, innovador y adepto a las necesidades del cliente y los usuarios. </br>
Para lograrlo pondremos en practica metodologías y estándares de la industria.</br>
</br>
Visión:</br>
Nuestra visión es proporcionar a los clientes una propuesta de valor integral.</br>
</br>
Valores:</br>
- Honestidad</br>
- Confiabilidad</br>
- Humildad</br>


# Development

Things you need to run the project:
1. NodeJS
2. Docker

## Initialize the NextJS app
1. Install yarn `npm i -g yarn`
2. Run `yarn` to install dependencies
3. Run the development server locally: `yarn dev`

### To start the DB
1. Run `docker build ./data-dashboard/prisma -t ibm-dashboard-psql`
2. Run `docker run -p 5432:5432 ibm-dashboard-psql`


### Prisma
Create migration: npx prisma migrate dev --name username
