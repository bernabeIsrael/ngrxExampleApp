import {Pipe, PipeTransform} from '@angular/core';
import {InputOutput} from '../models/input-output.model';

@Pipe({
  name: 'inputOrder'
})
export class InputOrderPipe implements PipeTransform {

  transform(items: InputOutput[]): InputOutput[] {

    return items.slice().sort((a, b): number => {
      if (a.type === 'input') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
