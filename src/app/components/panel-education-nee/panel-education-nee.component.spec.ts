import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEducationNeeComponent } from './panel-education-nee.component';

describe('PanelEducationNeeComponent', () => {
  let component: PanelEducationNeeComponent;
  let fixture: ComponentFixture<PanelEducationNeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEducationNeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEducationNeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
