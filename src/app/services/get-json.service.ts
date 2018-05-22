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
  private uploadImageURL = 'http://127.0.0.1/bcitrec/instructor/upload.php';
  private addInstructorURL = 'http://127.0.0.1/bcitrec/instructor/addInstructor.php';
  private InstructorTableURL = 'http://127.0.0.1/bcitrec/instructor/getInstructors.php';
  private deleteInstructorURL = 'http://127.0.0.1/bcitrec/instructor/deleteInstructor.php';
  private updateInstructorURL = 'http://127.0.0.1/bcitrec/instructor/updateInstructor.php';
  private uploadClassImageURL = 'http://127.0.0.1/bcitrec/classes/upload.php';
  private addClassURL = 'http://127.0.0.1/bcitrec/classes/addClass.php';
  private classCategoriesURL = 'http://127.0.0.1/bcitrec/classes/getClassCategory.php';
  private createClassCategoryURL = 'http://127.0.0.1/bcitrec/classes/createClassCategory.php';
  private deleteCategoryURL = 'http://127.0.0.1/bcitrec/classes/deleteClass.php';
  private updateClassCategoryURL = 'http://127.0.0.1/bcitrec/classes/updateClassCategory.php';
  private ClassTableURL = 'http://127.0.0.1/bcitrec/classes/getClassesTable.php';
  private reservedSlotURL = 'http://127.0.0.1/bcitrec/classes/getReservedSlots.php';
  private updateReservedSlotURL = 'http://127.0.0.1/bcitrec/classes/updateReservedSlot.php';
  private classEventsURL = 'http://127.0.0.1/bcitrec/classes/getClassEvents.php';
  private eventUsersURL = 'http://127.0.0.1/bcitrec/classes/getEventUsers.php';
  private extUserEmailsURL = 'http://127.0.0.1/bcitrec/classes/getExtUserEmails.php';
  private registerForEventURL = 'http://127.0.0.1/bcitrec/classes/registerForEvent.php';
  private cancelReservationURL = 'http://127.0.0.1/bcitrec/classes/cancelReservation.php';
  private updateClassDetailsURL = 'http://127.0.0.1/bcitrec/classes/updateClassDetails.php';
  private userRegisteredEventsURL = 'http://127.0.0.1/bcitrec/external/getUserRegisteredEvents.php';
  private cancelClassURL = 'http://127.0.0.1/bcitrec/classes/cancelClass.php';
  private reviewTableURL = 'http://127.0.0.1/bcitrec/reviews/getReviewsTable.php';
  private summaryDashURL = 'http://127.0.0.1/bcitrec/getDashboardData.php';
  private newUsersDashURL = 'http://127.0.0.1/bcitrec/getDashNewUsers.php';
  private userSettingPasswordURL = 'http://127.0.0.1/bcitrec/userSettingPassword.php';
  private dashEventsURL = 'http://127.0.0.1/bcitrec/getDashEvents.php';
  private dashReviewsURL = 'http://127.0.0.1/bcitrec/getDashReviews.php';
  private messageClassURL = 'http://127.0.0.1/bcitrec/classes/sendClassMsg.php';
  private scheduleURL = 'http://127.0.0.1/bcitrec/schedule/getSchedule.php';
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
  getUploadImageURL() {
    return this.uploadImageURL;
  }

  getAddInstructorURL() {
    return this.addInstructorURL;
  }
  getInstructorTableURL() {
    return this.InstructorTableURL;
  }

  getDeleteInstructorURL() {
    return this.deleteInstructorURL;
  }

  getUpdateInstructorURL() {
    return this.updateInstructorURL;
  }

  getUploadClassImageURL() {
    return this.uploadClassImageURL;
  }

  getAddClassURL() {
    return this.addClassURL;
  }

  getClassCategoriesURL() {
    return this.classCategoriesURL;
  }
  getCreateClassCategoryURL() {
    return this.createClassCategoryURL;
  }

  getDeleteCategoryURL() {
    return this.deleteCategoryURL;
  }

  getUpdateClassCategoryURL() {
    return this.updateClassCategoryURL;
  }
  getClassTableURL() {
    return this.ClassTableURL;
  }

  getReservedSlotURL() {
    return this.reservedSlotURL;
  }
  getUpdateReservedSlotURL() {
    return this.updateReservedSlotURL;
  }

  getClassEventsURL() {
    return this.classEventsURL;
  }

  getEventUsersURL() {
    return this.eventUsersURL;
  }

  getExtUserEmailsURL() {
    return this.extUserEmailsURL;
  }

  getRegisterForEventURL() {
    return this.registerForEventURL;
  }
  getCancelReservationURL() {
    return this.cancelReservationURL
  }

  getUpdateClassDetailsURL() {
    return this.updateClassDetailsURL;
  }

  getUserRegisteredEventsURL() {
    return this.userRegisteredEventsURL;
  }
  getCancelClassURL() {
    return this.cancelClassURL;
  }
  getReviewTableURL() {
    return this.reviewTableURL
  }

  getSummaryDashURL() {
    return this.summaryDashURL;
  }

  getNewUsersDashURL() {
    return this.newUsersDashURL;
  }

  getUserSettingPasswordURL() {
    return this.userSettingPasswordURL;
  }

  getDashEventsURL() {
    return this.dashEventsURL;
  }

  getDashReviewsURL() {
    return this.dashReviewsURL;
  }
  getMessageClassURL() {
    return this.messageClassURL;
  }

  getscheduleURL() {
    return this.scheduleURL;
  }
}
