import { TestBed } from '@angular/core/testing';

import { ItemsListCrudService } from './items-list-crud.service';

describe('GroceryListCrudService', () => {
  let service: ItemsListCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsListCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
