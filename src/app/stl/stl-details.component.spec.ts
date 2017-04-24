import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StlDetailsComponent } from './stl-details.component';

describe('StlDetailsComponent', () => {
  let component: StlDetailsComponent;
  let fixture: ComponentFixture<StlDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StlDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
