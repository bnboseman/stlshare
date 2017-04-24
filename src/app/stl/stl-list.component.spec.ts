import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StlListComponent } from './stl-list.component';

describe('StlListComponent', () => {
  let component: StlListComponent;
  let fixture: ComponentFixture<StlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StlListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
