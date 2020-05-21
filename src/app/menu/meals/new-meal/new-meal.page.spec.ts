import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewMealPage } from './new-meal.page';

describe('NewMealPage', () => {
  let component: NewMealPage;
  let fixture: ComponentFixture<NewMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
