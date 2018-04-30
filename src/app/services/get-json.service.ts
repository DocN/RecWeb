import { Injectable } from '@angular/core';

@Injectable()
export class GetJsonService {
  private adminModulesURL = 'http://127.0.0.1/bcitrec/getModules.php';
  private userInternalCreateURL = 'http://127.0.0.1/bcitrec/addInternalUser.php';
  private validateUsernameURL = 'http://127.0.0.1/bcitrec/validateUser.php';
  private getUserInternalListURL = 'http://127.0.0.1/bcitrec/getInternalUsers.php';
  constructor() { }

  getAdminModulesURL() {
    return this.adminModulesURL;
  }
  getInternalUserCreateURL() {
    return this.userInternalCreateURL;
  }

  getvaldiateUsernameURL() {
    return this.validateUsernameURL;
  }

  getInternalUserTableURL() {
    return this.getUserInternalListURL;
  }
}
