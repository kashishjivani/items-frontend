import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemsListCrudService } from 'src/app/services/items-list-crud.service';
import { Items } from 'src/app/models/items';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  items$: Observable<Items[]> = new Observable<Items[]>();
  // item: Items = {
  //   id: 0,
  //   name: '',
  //   active: false,
  //   date: new Date(),
  //   price: 0.0,
  // };
  // ItemName: string = "";

  constructor(private itemsListCrudService: ItemsListCrudService) {}

  ngOnInit(): void {
    this.items$ = this.fetchAll();
  }
  fetchAll(): Observable<Items[]> {
    return this.itemsListCrudService.fetchAll();
  }


  post(item_name: any, item_active: any, item_price: any,): void {
    // const item = (<string>item_name, <boolean>item_active, <number> item_price);
    // if (!item) return;
    this.items$ = this.itemsListCrudService
      .post( item_name, item_active, item_price)
      .pipe(tap(() => (this.items$ = this.fetchAll())));
    console.log(item_name, item_active, item_price);
  }

  update(id: number, item_name: any, item_active: any, item_price: any): void {
    const item = (<string>item_name, <boolean> item_active, <number>item_price);
    // if (!item) return;

    // const newGrocery: Items = {
    //   id: 0,
    //   name: '',
    //   active: false,
    //   date: new Date(),
    //   price: 0.0,
    // };


    this.items$ = this.itemsListCrudService
      .update(id, item_name, item_active, item_price)
      .pipe(tap(() => (this.items$ = this.fetchAll())));
  }

  delete(id: number): void {
    this.items$ = this.itemsListCrudService
      .delete(id)
      .pipe(tap(() => (this.items$ = this.fetchAll())));
  }
}
