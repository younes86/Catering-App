import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MealItemComponent } from './meal-item.component';

describe('MealItemComponent', () => {
  let component: MealItemComponent;
  let fixture: ComponentFixture<MealItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MealItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
