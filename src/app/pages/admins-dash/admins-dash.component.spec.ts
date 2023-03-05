import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsDashComponent } from './admins-dash.component';

describe('AdminsDashComponent', () => {
  let component: AdminsDashComponent;
  let fixture: ComponentFixture<AdminsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
