import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  bookList: Book[];

  /**
   *Creates an instance of BooksListComponent.
   * @param {BookService} bookService
   * @memberof BooksListComponent
   */
  constructor(private bookService: BookService) { 
    this.bookList = [];
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.bookList = Object.assign([], books);
    });

  }

}
