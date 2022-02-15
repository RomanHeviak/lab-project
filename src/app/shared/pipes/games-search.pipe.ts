import { IGames } from './../interfaces/IGames';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamesSearch'
})
export class GamesSearchPipe implements PipeTransform {

  transform(value: IGames[], query: string): IGames[] {
    query = query.toLocaleLowerCase()
    return value.filter(el => el.title.toLocaleLowerCase().includes(query) || el.desc.includes(query));
  }

}
