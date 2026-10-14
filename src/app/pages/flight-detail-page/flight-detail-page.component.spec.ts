import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailPageComponent } from './flight-detail-page.component';

describe('FlightDetailPageComponent', () => {
  let component: FlightDetailPageComponent;
  let fixture: ComponentFixture<FlightDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
