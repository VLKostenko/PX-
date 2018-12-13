import {
  Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Input,
  OnInit, ViewChild
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Observable } from 'rxjs/Observable';
import { FaqComponent } from '../../faq/faq.component';

@Component({
  selector: 'custom-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {

  @Output()
  opened = new EventEmitter<number>();
  @Input()
  activeTabs: boolean = false;
  @Input()
  categories: boolean = false;
  @Input()
  setFirst;
  @Input()
  changeInput: string;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  filterCategories() {
    console.log('filterCategories');
    if ( this.categories ) {
      let filteredTabs = [];
      this.tabs.map(function(item) {
        item.alreadyExists = false;
        if ( filteredTabs.indexOf(item.title) !== -1 ) {
          item.alreadyExists = true;
        } else {
          filteredTabs.push(item.title);
        }
      });
    }
  }

  checkInputChange(inputChange) {
    if ( inputChange ) {
      this.filterCategories();
    }
  }

  ngOnChanges(changes) {
    // if( typeof this.tabs !== 'undefined' ) {
    //   this.filterCategories();
    //   this.tabs.filter( ( item ) => item.alreadyExists )
    // }
    // console.log(changes.changeInput.currentValue);
    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

  }

  // contentChildren are set
  ngAfterContentInit() {
    let tabs = [{
      active: false,
      alreadyExists: false,
      title: 'General' +
      ''
    }];
    this.tabs.toArray().forEach(el => {
      tabs.push(el);
    });

    if ( this.activeTabs ) {
      // get all active tabs
      let tabsWithActive = this.tabs.filter((tab)=>tab.active);

      // if there is no active tab set, activate the first
      if ( tabsWithActive.length === 0 ) {
        this.selectTab(this.tabs.first, 0);
      }
    }
  }

  selectTab(tab: TabComponent, index) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    setTimeout(() => tab.active = true);
    this.opened.emit(index);
    console.log('select Tab func');
  }

}
