import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUtilsComponent } from './admin-utils.component';

describe('AdminUtilsComponent', () => {
  let component: AdminUtilsComponent;
  let fixture: ComponentFixture<AdminUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUtilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
