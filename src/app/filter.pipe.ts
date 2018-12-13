import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter', pure: false
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, type: string): any[] {
    // console.log(items);
    // console.log('search', searchText);
    if ( !items ) return [];
    if ( !searchText ) return items;

    searchText = searchText.toLowerCase();

    const filteredTabs = [];
    items = items.filter(it => {
      if ( type === 'category' ) {
        return it.category.toLowerCase().includes(searchText)
      } else {
        return it.question.toLowerCase().includes(searchText)
      }
    });

    // console.log('start');
    // items.map(function(item) {
    //   if( typeof item.alreadyExists === 'undefined' ) {
    //     if ( filteredTabs.indexOf(item.category) !== -1 ) {
    //       item.alreadyExists = true;
    //     } else {
    //       item.alreadyExists = false;
    //       filteredTabs.push(item.category);
    //     }
    //   }
    //   console.log(item.category + ':' + item.alreadyExists);
    // });
    // console.log('end');

    return items;
  }

}
