import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseDecreaseBtnComponent } from './increase-decrease-btn.component';

describe('IncreaseDecreaseBtnComponent', () => {
  let component: IncreaseDecreaseBtnComponent;
  let fixture: ComponentFixture<IncreaseDecreaseBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncreaseDecreaseBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncreaseDecreaseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
