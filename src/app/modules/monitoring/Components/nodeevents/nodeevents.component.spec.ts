import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeeventsComponent } from './nodeevents.component';

describe('NodeeventsComponent', () => {
  let component: NodeeventsComponent;
  let fixture: ComponentFixture<NodeeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeeventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
