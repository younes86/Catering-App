import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDrinksPage } from './new-drinks.page';

describe('NewDrinksPage', () => {
  let component: NewDrinksPage;
  let fixture: ComponentFixture<NewDrinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDrinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDrinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
