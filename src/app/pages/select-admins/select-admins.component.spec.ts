import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAdminsComponent } from './select-admins.component';

describe('SelectAdminsComponent', () => {
  let component: SelectAdminsComponent;
  let fixture: ComponentFixture<SelectAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
