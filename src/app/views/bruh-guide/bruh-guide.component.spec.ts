import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BruhGuideComponent } from './bruh-guide.component';

describe('BruhGuideComponent', () => {
  let component: BruhGuideComponent;
  let fixture: ComponentFixture<BruhGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BruhGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BruhGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
