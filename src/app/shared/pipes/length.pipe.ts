import { IPeople } from './../interfaces/IPeople';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {

  transform(value: IPeople[]): number {
    return value.length;
  }

}
