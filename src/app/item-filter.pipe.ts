import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemFilter'
})
export class ItemFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter || (!filter.category && !filter.name)) {
      return [];
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.category.toLowerCase().indexOf(filter.category.toLowerCase()) !== -1 && item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
  }
}
