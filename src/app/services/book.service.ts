import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Constants } from '../models/constants';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private localStore: StorageService) { }

  /**
   * Returns all the books available in database
   *
   * @returns {Observable<Book[]>}
   * @memberof BookService
   */
  getBooks(): Observable<Book[]> {
    return this.localStore.getItem(Constants.Storage.Books);
  }

  /**
   * Add a book detail in the database
   *
   * @param {Book} _book
   * @returns {Observable<Book>}
   * @memberof BookService
   */
  saveBook(_book: Book): Observable<Book> {
    _book.id = _book.id != '' ? _book.id : this.guid();

    return new Observable((observe) => {
      this.getBooks().subscribe((books: Book[]) => {
        if (books == null) {
          books = [];
        }
        const bookIndex = books.findIndex(book=>book.id == _book.id);
        
        if(bookIndex < 0) {
          books.push(_book);
        } else {
          books[bookIndex] = Object.assign({}, _book);
        }
        
        this.localStore.setItem(Constants.Storage.Books, books).subscribe((isSaved) => {
          if (isSaved) {
            observe.next(_book);
            observe.complete();
          } else {
            observe.next(null);
            observe.complete();
          }
        }, (err) => {
          observe.next(null);
          observe.complete();
        });
      }, (err) => {
        observe.next(null);
        observe.complete();
      })
    })

  }

  /**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 */
  private guid() {
    return this._p8(false) + this._p8(true) + this._p8(true) + this._p8(false);
  }

  private _p8(s: any) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }

}
