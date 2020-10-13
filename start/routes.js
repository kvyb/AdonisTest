'use strict'

const BookController = require('../app/Controllers/Http/BookController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')
Route.get('/', 'BookController.index')
Route.get('/books', 'BookController.index')
Route.get('books/create', 'BookController.create')
Route.post('books', 'BookController.store')