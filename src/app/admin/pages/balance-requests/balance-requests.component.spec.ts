import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceRequestsComponent } from './balance-requests.component';

describe('BalanceRequestsComponent', () => {
  let component: BalanceRequestsComponent;
  let fixture: ComponentFixture<BalanceRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
