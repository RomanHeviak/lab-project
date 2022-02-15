import { Pipe, PipeTransform } from '@angular/core';
import { IPeople } from '../interfaces/IPeople';

@Pipe({
  name: 'peopleSearch'
})
export class PeoplePipe implements PipeTransform {

  transform(value: IPeople[], query: string): IPeople[] {
    return value.filter(el => el.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }

}
