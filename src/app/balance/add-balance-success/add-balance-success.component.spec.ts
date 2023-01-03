import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceSuccessComponent } from './add-balance-success.component';

describe('AddBalanceSuccessComponent', () => {
  let component: AddBalanceSuccessComponent;
  let fixture: ComponentFixture<AddBalanceSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBalanceSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBalanceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
