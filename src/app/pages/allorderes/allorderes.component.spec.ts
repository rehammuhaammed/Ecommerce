import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllorderesComponent } from './allorderes.component';

describe('AllorderesComponent', () => {
  let component: AllorderesComponent;
  let fixture: ComponentFixture<AllorderesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllorderesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllorderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
