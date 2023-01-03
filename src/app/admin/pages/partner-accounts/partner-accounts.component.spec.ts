import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAccountsComponent } from './partner-accounts.component';

describe('PartnerAccountsComponent', () => {
  let component: PartnerAccountsComponent;
  let fixture: ComponentFixture<PartnerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
