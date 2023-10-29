import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersPageComponent } from './stickers-page.component';

describe('StickersPageComponent', () => {
  let component: StickersPageComponent;
  let fixture: ComponentFixture<StickersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
