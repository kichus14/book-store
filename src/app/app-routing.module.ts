import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { BooksAddComponent } from './pages/books-add/books-add.component';


const routes: Routes = [
  { path: '', 
    redirectTo: 'list',
    pathMatch: 'full'
}, {
  path: 'list',
  component: BooksListComponent
}, {
  path: 'add',
  component: BooksAddComponent
}, {
  path: 'edit/:id',
  component: BooksAddComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
