import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeChartComponent } from './range-chart.component';

describe('RangeChartComponent', () => {
  let component: RangeChartComponent;
  let fixture: ComponentFixture<RangeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RangeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
