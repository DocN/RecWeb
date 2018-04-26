import { Injectable } from '@angular/core';

@Injectable()
export class GetJsonService {
  private adminModulesURL = 'http://127.0.0.1/bcitrec/getModules.php';

  constructor() { }

  getAdminModulesURL() {
    return this.adminModulesURL;
  }
}
