import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies/movies.service';
import { FilterDate } from '../../interface/filter-date';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  filters: FilterDate[];
  selectedDate: string;

  categories: string[] = ['全部','剧情','喜剧','动作','爱情','科幻','动画','悬疑',
  '惊悚','恐怖','犯罪','同性','音乐','歌舞','历史','战争','奇幻',
  '冒险','灾难','武侠'];

  places: string[] = ['全部', '中国大陆', '欧美', '美国','中国香港','中国台湾','日本',
  '韩国','英国' ,'法国','德国','意大利','西班牙','印度','泰国','俄罗斯']
  selectedCate: string = '全部';
  selectedPlace: string = '全部'

  constructor(private ms: MoviesService) {
  }

  ngOnInit() {
    this.getFilters();
  }


  // get filters value, text to display
  getFilters() {
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    this.filters = [];
    this.selectedDate = this.dateToString(date);

    for (let i = 0; i < 7; i++) {
      this.filters.push({ date: this.dateToString(date), day: i === 0 ? 'Today' : weekday[date.getDay()] });
      date.setDate(date.getDate() + 1);
    }

    this.filters.push({ date: 'all', day: 'All Times' });
  }

  // change filter
  changeFilter(date: string) {
    this.selectedDate = date;
  }

  changeCate(cate: string) {
    console.log(cate)
    this.selectedCate = cate;
    this.ms.searchMoviePlugin(this.selectedCate==='全部'?'':this.selectedCate, this.selectedPlace==='全部'?'':this.selectedPlace);
  }

  changePlace(place: string) {
    console.log(place)
    this.selectedPlace = place 
    this.ms.searchMoviePlugin(this.selectedCate==='全部'?'':this.selectedCate, this.selectedPlace==='全部'?'':this.selectedPlace);

  }

  // date to string mm/dd/yyyy
  private dateToString(date: Date): string {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  }
}
