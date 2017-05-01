import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StlUploadComponent } from './stl-upload.component';

describe('StlUploadComponent', () => {
  let component: StlUploadComponent;
  let fixture: ComponentFixture<StlUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StlUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StlUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
