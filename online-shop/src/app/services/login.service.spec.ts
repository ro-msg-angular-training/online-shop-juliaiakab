import { TestBed } from '@angular/core/testing';
import { User } from '../interfaces/userInterface';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let user = {} as User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should return value from observable', (done: DoneFn) => {
    service.login((user = {} as User)).subscribe((value) => {
      expect(value).toBe('observable value');
      done();
    });
  });
});
