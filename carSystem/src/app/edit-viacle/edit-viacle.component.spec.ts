import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViacleComponent } from './edit-viacle.component';

describe('EditViacleComponent', () => {
  let component: EditViacleComponent;
  let fixture: ComponentFixture<EditViacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditViacleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
