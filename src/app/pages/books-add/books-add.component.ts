import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Constants } from 'src/app/models/constants';
import { Categories } from 'src/app/models/categories';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 *
 *
 * @export
 * @class BooksAddComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.scss']
})
export class BooksAddComponent implements OnInit {

  addForm: FormGroup;
  categories: any[];
  exisitingBook: Book;
  defaultBookImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAKlBMVEXd6fUAAAClrrc3Oj1SV1sbHR5udHrBy9aKkZlESExgZWtWWl9ITFApKy0YTDg5AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAArUlEQVRoge3OsQrCMBRG4cRKqoPQrWuhPoCISOcOKo4+waXU28UhiyC4CEIewee1rYu4tTieb/pDyCHGAAAAAAAAAAAwRF7Wxki3EvsZ/cGOaa0n0j2Xf7QSo7VovKt9YqNme6xUXBVl1mzqdp5lSOvkNPWF0fiRXt1tdQ+NzIITa3TeTsmGtPKy+5c/qH8W0f510SBT7VuL9mI5qPXN/ZyDH1sCAAAAAAAAgDHeChYfOD2V7rMAAAAASUVORK5CYII=';
  imageUrl: string;
  /**
   *Creates an instance of BooksAddComponent.
   * @param {FormBuilder} formBuilder
   * @param {BookService} bookService
   * @param {ActivatedRoute} route
   * @memberof BooksAddComponent
   */
  constructor(private formBuilder: FormBuilder, 
    private bookService: BookService, 
    private route: ActivatedRoute,
    private router: Router) {
    this.categories = [];
    for (const _category in Categories) {
      if (isNaN(Number(_category))) {
        // console.log('Cat:',_category,'-', Categories[_category]);
        this.categories.push({ text: _category, value: Categories[_category] });
      }
    }

    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if(bookId != null && bookId != '') {
        bookService.getBooks().subscribe((books) => {
          const filBook = books.filter((book) => {
            return book.id == bookId;
          });
          if(filBook != null && filBook.length > 0) {
            this.exisitingBook = Object.assign({}, filBook[0]);
          }          

        })
      }
    });

  }

  ngOnInit(): void {
    this.imageUrl = this.exisitingBook != undefined && this.exisitingBook['image'] != undefined ? this.exisitingBook['image'] : this.defaultBookImage;
    this.addForm = this.formBuilder.group({
      id: [this.exisitingBook != undefined ? this.exisitingBook['id'] : ''],
      name: [this.exisitingBook != undefined ? this.exisitingBook['name'] : '', [Validators.required, Validators.pattern(Constants.Patterns.Name)]],
      author: [this.exisitingBook != undefined ? this.exisitingBook['author'] : '', [Validators.required, Validators.pattern(Constants.Patterns.Name)]],
      category: [this.exisitingBook != undefined ? this.exisitingBook['category'] : '', [Validators.required]],
      edition: [this.exisitingBook != undefined ? this.exisitingBook['edition'] : '', [Validators.required, Validators.pattern(Constants.Patterns.Name)]],
      price: [this.exisitingBook != undefined ? this.exisitingBook['price'] : '', [Validators.required, Validators.pattern(Constants.Patterns.Price)]],
      image: [this.imageUrl, [Validators.required]]
    })
  }

  /**
   * Returns all the form controls for the add form.
   *
   * @readonly
   * @memberof BooksAddComponent
   */
  get controls() {
    return this.addForm.controls;
  }

  /**
   * Adds a new book to database if validation is succeeded.
   *
   * @returns
   * @memberof BooksAddComponent
   */
  onAddSubmit() {
    if (!this.addForm.valid) {
      this.addForm.markAllAsTouched();
      return;
    }
    const newBook: Book = Object.assign({}, this.addForm.value);
    this.bookService.saveBook(newBook).subscribe((_book) => {
      if (_book != null) {
        this.addForm.reset();
        this.router.navigateByUrl('/list');
      } else {
        console.log('%cError: Book Saved', 'color: red;')
      }
    });
  }



  /**
   * Get the image data URI on file change event and assign to form control
   *
   * @param {*} event
   * @returns
   * @memberof BooksAddComponent
   */
  imageFileChange(event: any) {
    const imageControl = this.addForm.get('image');

    const updateImageValueAndValidity = this.updateImageValueAndValidity;
    if(event.target.files.length == 0) {
      this.imageUrl = this.defaultBookImage;
      updateImageValueAndValidity(imageControl,'', true);
      return;
    }

    const file = event.target.files[0];
    if(file.size > 51200) {
      event.target.value = null;
      this.imageUrl = this.defaultBookImage;
      updateImageValueAndValidity(imageControl,'', true);
      return;
    }

    const reader = new FileReader();
    let imageUrl = this.imageUrl
    reader.onload= () => {
      // convert image file to base64 string
      imageUrl = reader.result as string;
      updateImageValueAndValidity(imageControl,imageUrl, true);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  /**
   * Update the control with value and update validation
   *
   * @param {AbstractControl} contorl
   * @param {string} value
   * @param {boolean} [updateValidation]
   * @memberof BooksAddComponent
   */
  updateImageValueAndValidity(contorl: AbstractControl,value: string, updateValidation?:boolean) {
    
    contorl.setValue(value);
    if(updateValidation) {
      contorl.updateValueAndValidity();
      contorl.markAsTouched();
    }    
  }
}
