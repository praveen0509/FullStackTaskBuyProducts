import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyProductHomePageComponent } from './buy-product-home-page.component';

describe('BuyProductHomePageComponent', () => {
  let component: BuyProductHomePageComponent;
  let fixture: ComponentFixture<BuyProductHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyProductHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyProductHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
