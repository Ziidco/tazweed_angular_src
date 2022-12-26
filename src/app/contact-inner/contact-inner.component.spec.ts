import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInnerComponent } from './contact-inner.component';

describe('ContactInnerComponent', () => {
  let component: ContactInnerComponent;
  let fixture: ComponentFixture<ContactInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
