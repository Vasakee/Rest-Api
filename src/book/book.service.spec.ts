import { getModelToken } from "@nestjs/mongoose"
import { Test, TestingModule } from "@nestjs/testing"
import { Model } from "mongoose"
import { BookService } from "./book.service"
import { Book, Category } from "./schemas/book.schema"


describe('BookService', () => {


    let bookService: BookService
    let model: Model<Book>

    const mockBook = {
        "_id": "66bd3253876e8da36d67b5a9",
        "user": "66bb47d961597df99f6c09ab",
        "title": "Book 6",
        "description": "Eight Book Description",
        "author": "Eight Author",
        "price": 50,
        "category": Category.CRIME
    }
    const mockBookService = {
        findById: jest.fn()
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken(Book.name),
                    useValue: mockBookService
                },
            ],
        }).compile()

        bookService = module.get<BookService>(BookService)
        model = module.get<Model<Book>>(getModelToken(Book.name))
    })

    describe('findById', () => {
        it('should find and return a book by ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockBook)

            const result = await bookService.findById(mockBook._id)

            expect(model.findById).toHaveBeenCalledWith(mockBook._id)
            expect(result).toEqual(mockBook)
        })
    })
})