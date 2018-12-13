import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import faqListEn from '../faq-info-en';
import faqListTr from '../faq-info-tr';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import animatedScrollTo from '../animated-scroll-to/animated-scroll-to';
//import { faqListModel } from '../faq-info.model';
//import { MaterializeAction } from 'angular2-materialize';


const FAQ_LIST = {
  en: faqListEn,
  tr: faqListTr
};

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {

  content: any;
  questionsOffsetTop: number;
  searchText: string = '';
  faqShowId: number = -1;
  notFound = false;
  linkBack: boolean = false;
  faqOpened: boolean = false;
  faqList: any[];
  filteredTabs: any[] = [];
  modalVisible: boolean = false;

  @Output()
  changeInput = new EventEmitter<string>();

  @Input()
  filter: boolean = false;

  constructor(translate: TranslateService) {
    this.faqList = FAQ_LIST[localStorage.getItem('language')];
    translate.onLangChange.subscribe((params: LangChangeEvent) => {
      this.notFound = false;
      this.linkBack = false;
      this.closeAnswer();
      this.faqList = FAQ_LIST[params.lang];
    });
  }

  @HostListener('input') onInput() {
    let items = this.faqList;
    let itemsLength: number = items.length;
    let changedItemsLength: number = items.length;
    if ( !items ) return [];
    this.searchText = this.searchText.toLowerCase();
    items = items.filter(it => {
      return it.question.toLowerCase().includes(this.searchText) || it.answer.toLowerCase().includes(this.searchText);
    });
    changedItemsLength = items.length;
    // console.log(itemsLength, 'items length');
    // console.log(changedItemsLength, 'changed items length');
    if ( itemsLength === changedItemsLength ) {
      this.linkBack = false;
      this.notFound = false;
    } else if ( changedItemsLength === 0 ) {
      this.linkBack = true;
      this.notFound = true;
    } else {
      this.linkBack = true;
      this.notFound = false;
      return items;
    }
  }

  closeAnswer() {
    this.faqOpened = false;
    this.faqShowId = -1;
  }

  switchFaq(id, event) {
    // @ts-ignore
    const faqId = this.faqList[id].id;
    const target = event.target;
    const question = document.getElementById(id);
    const answer: any = question.children[1];
    const prevOpenedAnswer: any = this.faqShowId > -1 && document.getElementById(String(this.faqShowId)).children[1];
    const height = answer.offsetHeight + 65;

    if (this.faqShowId === faqId) {
      answer.setAttribute('style', 'max-height:' + height + 'px');
      answer.addEventListener('transitionend', this.closeAnswer.bind(this), {once: true});
      setTimeout(() => {
        answer.removeAttribute('style');
      }, 0);
    } else {
      const show = () => {
        answer.removeAttribute('style');
        this.faqOpened = true;
        this.faqShowId = faqId;
        setTimeout(() => {
          answer.setAttribute('style', 'max-height:' + height + 'px');
        }, 0);
      };
      if (prevOpenedAnswer) {
        prevOpenedAnswer.setAttribute('style', 'max-height:' + (prevOpenedAnswer.offsetHeight + 65) + 'px');
        prevOpenedAnswer.addEventListener('transitionend', show.bind(this), {once: true});
        setTimeout(() => {
          prevOpenedAnswer.removeAttribute('style');
        }, 0);
      } else {
        show();
      }
    }

    setTimeout(() => {
      const id = target.className.split('faqlink-')[1];
      const isWindow = window.innerWidth < 768;
      if (id) {
        return this.switchFaq(id, {
          target: question.children[0]
        });
      }
      animatedScrollTo({
        targetElement: question,
        insideElement: isWindow ? window : this.content,
        duration: 300,
        isWindow
        // offset: this.questionsOffsetTop + target.offsetParent.offsetTop
      });
    }, 1100);
  }

  openFaq(id) {
    this.faqOpened = true;
    this.faqShowId = this.faqList[id].id;
    window.scrollTo(0, 0);
  }

  closeFaq() {
    this.faqOpened = false;
    this.searchText = '';
    window.scrollTo(0, 0);
  }

  backToMain() {
    this.linkBack = false;
    this.notFound = false;
    this.faqOpened = false;
    this.searchText = '';
  }

  openModal() {
    this.modalVisible =
      true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  ngOnInit() {
    this.content = document.getElementsByClassName('page-content')[0];
    this.questionsOffsetTop = (<HTMLInputElement>document.getElementsByClassName('questions-list')[0]).offsetTop;

    window.addEventListener('click', (e) => {
      const target = (<HTMLInputElement>event.target);

      if (target.parentElement.classList.contains('answer')) {
        e.stopPropagation();
      }
      if (target.classList.contains('signup-button')) {
        e.preventDefault();
        e.stopPropagation();
        this.openModal();
      }
    });

    window.addEventListener('resize', () => {
      if (this.faqShowId === -1) {
        return;
      }
      const answer: any = document.getElementById(String(this.faqShowId)).children[1];
      answer.setAttribute('style', 'max-height:none');
    });
  }


}
