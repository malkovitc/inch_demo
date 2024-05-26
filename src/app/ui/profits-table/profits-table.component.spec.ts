import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsTableComponent } from './profits-table.component';

describe('ProfitsTableComponent', () => {
  let component: ProfitsTableComponent;
  let fixture: ComponentFixture<ProfitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
