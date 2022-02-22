import { IGames } from '../../interfaces/IGames';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genresFilter'
})
export class GenresFilterPipe implements PipeTransform {

  transform(games: IGames[], query: string): IGames[] {
    const qenres = query.split(' ')
    let res = games.filter(el => qenres.includes(String(el.genre)))
    if(qenres[0] === ''){
      res = games
    }
    return res
  }

}
