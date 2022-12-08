import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceFailComponent } from './add-balance-fail.component';

describe('AddBalanceFailComponent', () => {
  let component: AddBalanceFailComponent;
  let fixture: ComponentFixture<AddBalanceFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBalanceFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBalanceFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
