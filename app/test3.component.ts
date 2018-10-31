import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Hero } from './hero1';

export enum Color {Red, Green, Blue};

/**
 * Giant grab bag of stuff to drive the chapter
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit, OnInit {

  ngOnInit() {
    this.resetHeroes();
    this.setCurrentClasses();
    this.setCurrentStyles();
  }

  ngAfterViewInit() {
    // Detect effects of NgForTrackBy
    trackChanges(this.heroesNoTrackBy,   () => this.heroesNoTrackByCount++);
    trackChanges(this.heroesWithTrackBy, () => this.heroesWithTrackByCount++);
  }

  @ViewChildren('noTrackBy')   heroesNoTrackBy:   QueryList<ElementRef>;
  @ViewChildren('withTrackBy') heroesWithTrackBy: QueryList<ElementRef>;

  actionName = 'Go for it';
  badCurly = 'bad curly';
  classes = 'special';
  help = '';

  alert(msg?: string)      { window.alert(msg); }
  callFax(value: string)   { this.alert(`Faxing ${value} ...`); }
  callPhone(value: string) { this.alert(`Calling ${value} ...`); }
  canSave =  true;

  changeIds() {
    this.resetHeroes();
    this.heroes.forEach(h => h.id += 10 * this.heroIdIncrement++);
    this.heroesWithTrackByCountReset = -1;
  }

  clearTrackByCounts() {
    const trackByCountReset = this.heroesWithTrackByCountReset;
    this.resetHeroes();
    this.heroesNoTrackByCount = -1;
    this.heroesWithTrackByCount = trackByCountReset;
    this.heroIdIncrement = 1;
  }

  clicked = '';
  clickMessage = '';
  clickMessage2 = '';

  Color = Color;
  color = Color.Red;
  colorToggle() {this.color = (this.color === Color.Red) ? Color.Blue : Color.Red; }

  currentHero: Hero;

  deleteHero(hero: Hero) {
    this.alert(`Delete ${hero ? hero.name : 'the hero'}.`);
  }

  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';

  fontSizePx = 16;

  title = 'Template Syntax';

  getVal(): number { return 2; }

  name: string = Hero.heroes[0].name;
  hero: Hero; // defined to demonstrate template context precedence
  heroes: Hero[];

  // trackBy change counting
  heroesNoTrackByCount   = 0;
  heroesWithTrackByCount = 0;
  heroesWithTrackByCountReset = 0;

  heroIdIncrement = 1;

  
  heroImageUrl = 'assets/images/hero.png';
 
  villainImageUrl = 'assets/images/villain.png';

  iconUrl = 'assets/images/ng-logo.png';
  isActive = false;
  isSpecial = true;
  isUnchanged = true;

  get nullHero(): Hero { return null; }

  onClickMe(event: KeyboardEvent) {
    let evtMsg = event ? ' Event target class is ' + (<HTMLElement>event.target).className  : '';
    this.alert('Click me.' + evtMsg);
  }

  onSave(event: KeyboardEvent) {
    let evtMsg = event ? ' Event target is ' + (<HTMLElement>event.target).textContent : '';
    this.alert('Saved.' + evtMsg);
    if (event) { event.stopPropagation(); }
  }

  onSubmit() {/* referenced but not used */}

  product = {
    name: 'frimfram',
    price: 42
  };

  // updates with fresh set of cloned heroes
  resetHeroes() {
    this.heroes = Hero.heroes.map(hero => hero.clone());
    this.currentHero = this.heroes[0];
    this.hero = this.currentHero;
    this.heroesWithTrackByCountReset = 0;
  }

  setUppercaseName(name: string) {
    this.currentHero.name = name.toUpperCase();
  }

  currentClasses: {};
  setCurrentClasses() {
    // CSS classes: added/removed per current state of component properties
    this.currentClasses =  {
      'saveable': this.canSave,
      'modified': !this.isUnchanged,
      'special':  this.isSpecial
    };
  }

  currentStyles: {};
  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'font-style':  this.canSave      ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
      'font-size':   this.isSpecial    ? '24px'   : '12px'
    };
  }

  trackByHeroes(index: number, hero: Hero): number { return hero.id; }

  trackById(index: number, item: any): number { return item['id']; }
}

// helper to track changes to viewChildren
function trackChanges(views: QueryList<ElementRef>, changed: () => void) {
  let oldRefs = views.toArray();
  views.changes.subscribe((changes: QueryList<ElementRef>) => {
      const changedRefs = changes.toArray();
      // Check if every changed Element is the same as old and in the same position
      const isSame = oldRefs.every((v, i) => v.nativeElement === changedRefs[i].nativeElement);
      if (!isSame) {
        oldRefs = changedRefs;
        // wait a tick because called after views are constructed
        setTimeout(changed, 0);
      }
  });
}