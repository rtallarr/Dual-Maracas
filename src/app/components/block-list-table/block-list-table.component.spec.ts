import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockListTableComponent } from './block-list-table.component';

describe('BlockListTableComponent', () => {
  let component: BlockListTableComponent;
  let fixture: ComponentFixture<BlockListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
