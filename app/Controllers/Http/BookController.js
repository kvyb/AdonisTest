'use strict'
//import model to be able to use it for handling form input via controller to DB
const Book = use('App/Models/Book')
const { validate } = use("Validator")

class BookController {
    async index({ view }) {  
      const books = await Book.all();

      return view.render("book.index", {
        books: books.toJSON(),
      });
    }
    //creates form referred from router and renders /book/create view
    async create({ view }) {
        return view.render("book.create");
    }
    //method to store book information from above created view input in DB
    async store({ request, response, session }) {
        const validation = await validate(request.all(), {
            title: "required",
            author: "required",
            cover_image: "required",
            isbn: "required|min:10|max:10",
        });

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll();
            return response.redirect("back");
        }

        const book = new Book();
    
        book.title = request.input("title");
        book.author = request.input("author");
        book.cover_image = request.input("cover_image");
        book.isbn = request.input("isbn");
    
        await book.save();

        session.flash({ notification: "Book has been Created" });
        return response.redirect("/");
    }
    //Show page for each book based on its ID
    async show({ params, view }) {
        const book = await Book.find(params.id);
    
        return view.render("book.show", {
          book,
        });
    }
    
    async edit({ params, view }) {
        const book = await Book.find(params.id);

        return view.render("book.edit", {
            book,
        });
    }

    async update({ params, request, response, session }) {
        const book = await Book.find(params.id);
    
        book.title = request.input("title");
        book.author = request.input("author");
        book.cover_image = request.input("cover_image");
        book.isbn = request.input("isbn");
    
        await book.save();
    
        session.flash({ notification: "Book Updated" });
    
        return response.redirect("/");
    }
    
    async destroy({ params, session, response }) {
        const book = await Book.find(params.id);
    
        await book.delete();
    
        session.flash({ notification: "Book Deleted" });
    
        return response.redirect("/");
    }
}

module.exports = BookController
