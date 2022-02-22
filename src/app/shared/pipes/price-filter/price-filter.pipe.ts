import { IGames } from '../../interfaces/IGames';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(games: IGames[], price: string): IGames[] {
    const res = games.filter(el => Number(el.price) <= Number(price));
    return res.length ? res : games;
  }

}
