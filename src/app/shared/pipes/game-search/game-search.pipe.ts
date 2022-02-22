import { IGames } from '../../interfaces/IGames';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameSearch'
})
export class GameSearchPipe implements PipeTransform {

  transform(games: IGames[], query: string): IGames[] {
    return games.filter(el => el.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || el.desc.includes(query));
  }

}
