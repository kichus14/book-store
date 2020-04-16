import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BooksAddComponent } from './pages/books-add/books-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from './components/control-error/control-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTitleComponent,
    BooksListComponent,
    BooksAddComponent,
    ControlErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
