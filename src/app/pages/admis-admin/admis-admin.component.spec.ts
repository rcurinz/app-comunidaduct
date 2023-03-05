import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisAdminComponent } from './admis-admin.component';

describe('AdmisAdminComponent', () => {
  let component: AdmisAdminComponent;
  let fixture: ComponentFixture<AdmisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmisAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
