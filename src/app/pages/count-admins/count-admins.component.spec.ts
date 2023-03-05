import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountAdminsComponent } from './count-admins.component';

describe('CountAdminsComponent', () => {
  let component: CountAdminsComponent;
  let fixture: ComponentFixture<CountAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
