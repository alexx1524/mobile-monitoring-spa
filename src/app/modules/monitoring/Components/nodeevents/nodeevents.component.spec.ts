import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeEventsComponent } from './nodeevents.component';

describe('NodeEventsComponent', () => {
  let component: NodeEventsComponent;
  let fixture: ComponentFixture<NodeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
