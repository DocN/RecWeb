import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClasscategoriesComponent } from './manage-classcategories.component';

describe('ManageClasscategoriesComponent', () => {
  let component: ManageClasscategoriesComponent;
  let fixture: ComponentFixture<ManageClasscategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClasscategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClasscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
