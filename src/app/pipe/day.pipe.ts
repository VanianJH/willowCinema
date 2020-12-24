import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day'
})
export class DayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value);
    const today = new Date();
    // const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    let prefix = '';

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      prefix = '今天';
    } else {
      today.setDate(today.getDate() + 1);

      if (date.getTime() === today.getTime()) {
        prefix = '明天';
      } else {
        prefix = '';
      }
    }

    return prefix + ' ' + weekday[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()];
  }

}
