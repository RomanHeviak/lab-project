import { IGames } from './../interfaces/IGames';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeFilter'
})
export class RangeFilterPipe implements PipeTransform {

  transform(value: IGames[], priceQuery: string): IGames[] {
    return value.filter(el => Number(el.price) <= Number(priceQuery));
  }

}
