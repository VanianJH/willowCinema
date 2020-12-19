import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  occupation: { [key: string]: string[] } = { "信息技术": ["互联网", "IT", "通信", "电子", "游戏"], "金融保险": ["投资", "股票基金", "保险", "银行", "信托担保"], "商业服务": ["资讯", "贸易", "美容保健", "家政服务", "旅游", "餐饮酒店", "娱乐休闲", "批发零售", "汽车"], "建筑地产": ["房地产", "建筑", "物业", "装修"], "工程制造": ["机械制造", "生物医药", "食品", "服装", "能源", "化工"], "交通运输": ["航空", "铁路", "航运船舶", "公共交通", "物流运输"], "文化传媒": ["媒体出版", "设计", "广告创意", "动漫", "公关会展", "摄影"], "娱乐体育": ["影视", "运动体育", "音乐", "模特"], "公共事业": ["医疗", "教育", "政府机关", "科研", "公益机构", "农林牧渔"], "学生": ["学生"], "其他": ["其他"] };
  checkoutForm;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private cookie: CookieService,
    private message: NzMessageService) {

    this.checkoutForm = this.formBuilder.group({
      name: '',
      sex: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      marriage: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
      interest1: new FormControl(false, Validators.required),
      interest2: new FormControl(false, Validators.required),
      interest3: new FormControl(false, Validators.required),
      interest4: new FormControl(false, Validators.required),
      interest5: new FormControl(false, Validators.required),
      interest6: new FormControl(false, Validators.required),
      interest7: new FormControl(false, Validators.required),
      interest8: new FormControl(false, Validators.required),
      interest9: new FormControl(false, Validators.required),
      interest10: new FormControl(false, Validators.required),
      interest11: new FormControl(false, Validators.required),
      interest12: new FormControl(false, Validators.required),
      interest13: new FormControl(false, Validators.required),
      interest14: new FormControl(false, Validators.required),
      interest15: new FormControl(false, Validators.required),
      sign: ''
    });
  }



  Name: string = "西楚小霸王";
  Sex: string;
  BornYear: string;
  BornMonth: string;
  BornDay: string;
  LifeState: string;
  Work: string;
  WorkDetail: string;
  Hobby: string;
  Sign: string = "全都是泡沫~~";

  ngOnInit(): void {
    // this.checkoutForm = this.formBuilder.group({
    //   day: "4",
    //   interest1: false,
    //   interest2: true,
    //   interest3: false,
    //   interest4: false,
    //   interest5: false,
    //   interest6: false,
    //   interest7: false,
    //   interest8: false,
    //   interest9: false,
    //   interest10: false,
    //   interest11: true,
    //   interest12: false,
    //   interest13: false,
    //   interest14: false,
    //   interest15: true,
    //   job: "金融保险",
    //   marriage: "单身",
    //   month: "5",
    //   name: "凛冬将至",
    //   sex: "1",
    //   sign: "吹啊吹啊，我的骄傲放纵~~",
    //   year: "2017",
    // })
    console.log('userId: ',JSON.parse(this.cookie.get('userMsg'))['id'])
    this.userService.getUserProfile(JSON.parse(this.cookie.get('userMsg'))['id'])
        .subscribe(res=>{
          if(res['success']) {
            let igot = JSON.parse(res['content'])
            console.log('igot:', igot)
            this.checkoutForm = this.formBuilder.group(igot)
          }
        })


    // console.log('msg',JSON.parse("{\"day\":\"4\",\"interest1\":false,\"interest2\":true,\"interest3\":false,\"interest4\":false,\"interest5\":false,\"interest6\":false,\"interest7\":false,\"interest8\":false,\"interest9\":false,\"interest10\":false,\"interest11\":true,\"interest12\":false,\"interest13\":false,\"interest14\":false,\"interest15\":true,\"job\":\"金融保险\",\"marriage\":\"单身\",\"month\":\"5\",\"name\":\"凛冬将至\",\"sex\":\"1\",\"sign\":\"吹啊吹啊，我的骄傲放纵~~\",\"year\":\"2017\"}"))

  }

  verifyGender(a) {
    return this.Sex === a
  }

  setSex(a) {
    this.Sex = a
  }

  getName() {

  }

  saveMsg(v) {
    console.log(v)
    this.userService.saveUserProfile(JSON.parse(this.cookie.get('userMsg'))['id'], v).subscribe(res=>{
      if(res['success']) {
        this.message.success('保存成功！')
      }
      else {}
    })
  }

  onSubmit(customerData) {
    console.log(customerData)
  }
}
