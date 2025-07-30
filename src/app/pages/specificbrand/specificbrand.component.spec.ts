import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificbrandComponent } from './specificbrand.component';

describe('SpecificbrandComponent', () => {
  let component: SpecificbrandComponent;
  let fixture: ComponentFixture<SpecificbrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificbrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
