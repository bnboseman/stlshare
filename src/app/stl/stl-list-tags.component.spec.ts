import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StlListTagsComponent } from './stl-list-tags.component';

describe('StlListTagsComponent', () => {
  let component: StlListTagsComponent;
  let fixture: ComponentFixture<StlListTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StlListTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StlListTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
