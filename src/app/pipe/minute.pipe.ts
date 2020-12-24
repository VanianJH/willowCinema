import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minute'
})
export class MinutePipe implements PipeTransform {

  transform(value: number): string {
    const hour  = Math.floor(value / 60);

    return hour > 0 ? hour + ' 小时 ' + (value % 60) + ' 分钟' : value + ' 分钟';
  }
}
