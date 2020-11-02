import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {

  transform(value: any): Date {
    return new Date(value);
  }

}
