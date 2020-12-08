import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  occupation: { [key: string]: string[] } = { "信息技术": ["互联网", "IT", "通信", "电子", "游戏"], "金融保险": ["投资", "股票基金", "保险", "银行", "信托担保"], "商业服务": ["资讯", "贸易", "美容保健", "家政服务", "旅游", "餐饮酒店", "娱乐休闲", "批发零售", "汽车"], "建筑地产": ["房地产", "建筑", "物业", "装修"], "工程制造": ["机械制造", "生物医药", "食品", "服装", "能源", "化工"], "交通运输": ["航空", "铁路", "航运船舶", "公共交通", "物流运输"], "文化传媒": ["媒体出版", "设计", "广告创意", "动漫", "公关会展", "摄影"], "娱乐体育": ["影视", "运动体育", "音乐", "模特"], "公共事业": ["医疗", "教育", "政府机关", "科研", "公益机构", "农林牧渔"], "学生": ["学生"], "其他": ["其他"] };

  constructor() { }

  ngOnInit(): void {

    
  }

}
