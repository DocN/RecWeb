import { Injectable } from '@angular/core';

@Injectable()
export class GetJsonService {
  private adminModulesURL = 'http://127.0.0.1/bcitrec/getModules.php';
  private userInternalCreateURL = 'http://127.0.0.1/bcitrec/addInternalUser.php';
  private validateUsernameURL = 'http://127.0.0.1/bcitrec/validateUser.php';
  private getUserInternalListURL = 'http://127.0.0.1/bcitrec/getInternalUsers.php';
  private changeInternalUserPWURL = 'http://127.0.0.1/bcitrec/updateUserInternalPassword.php';
  private applyInternalUserChangesURL = 'http://127.0.0.1/bcitrec/updateUserInternalEdit.php';
  private registerExternalUserURL = 'http://127.0.0.1/bcitrec/external/addExternalUser.php';
  private validateExtuserURL = 'http://127.0.0.1/bcitrec/external/validateExternalUser.php';
  private extUsersTableURL = 'http://127.0.0.1/bcitrec/external/getExternalUsers.php';
  private resetPin = 'http://127.0.0.1/bcitrec/external/resetExtPin.php';
  private applyAccountURL = "http://127.0.0.1/bcitrec/external/updateExtUserEdit.php";
  private deleteExtAccountURL = 'http://127.0.0.1/bcitrec/external/deleteExtUser.php';
  
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

  getChangeInternalUserPWURL() {
    return this.changeInternalUserPWURL;
  }
  getApplyInternalUserChangesURL() {
    return this.applyInternalUserChangesURL;
  }
  getRegisterExternalUserURL() {
    return this.registerExternalUserURL;
  }
  getValidateExtuserURL() {
    return this.validateExtuserURL;
  }
  getExtUsersTableURL() {
    return this.extUsersTableURL;
  }
  getResetExtPinURL() {
    return this.resetPin;
  }
  getApplyAccountURL() {
    return this.applyAccountURL;
  }
  getDeleteExtAccountURL() {
    return this.deleteExtAccountURL;
  }
}
