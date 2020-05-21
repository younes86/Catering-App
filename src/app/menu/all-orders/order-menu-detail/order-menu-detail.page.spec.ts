import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderMenuDetailPage } from './order-menu-detail.page';

describe('OrderMenuDetailPage', () => {
  let component: OrderMenuDetailPage;
  let fixture: ComponentFixture<OrderMenuDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMenuDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderMenuDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
