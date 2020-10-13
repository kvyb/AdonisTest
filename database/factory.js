'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Book', (faker) => {
   return {
     title: faker.sentence({ words:5 }),
     author: faker.name(),
     cover_image: "https://via.placeholder.com/300",
     isbn: faker.string({ length: 10, numeric: true })
   }
})
