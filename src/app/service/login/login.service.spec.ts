import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', async () => {
    let res : any;
    res = await service.getSignUp({username:"asd", password: "asd", secondPassword: "asd"})
    console.log(res)
    expect(service).toBeTruthy();
  });
});
