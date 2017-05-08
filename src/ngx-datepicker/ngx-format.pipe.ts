import { Pipe, PipeTransform } from '@angular/core';
import * as dateFns from 'date-fns';

@Pipe({
  name: 'ngxFormat'
})
export class NgxFormatPipe implements PipeTransform {

  transform(value: Date, ...args: Array<any>): any {
    return dateFns.format(value, args[0] || "DD/MM/YYYY");
  }
}
