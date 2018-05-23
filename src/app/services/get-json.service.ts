import { Injectable } from '@angular/core';

@Injectable()
export class GetJsonService {
  //private originalURL = "http://159.89.138.93/bcitrec/";
  private originalURL = "http://127.0.0.1/bcitrec/";
  private adminModulesURL = this.originalURL + 'getModules.php';
  private userInternalCreateURL = this.originalURL + 'addInternalUser.php';
  private validateUsernameURL = this.originalURL + 'validateUser.php';
  private getUserInternalListURL = this.originalURL + 'getInternalUsers.php';
  private changeInternalUserPWURL = this.originalURL + 'updateUserInternalPassword.php';
  private applyInternalUserChangesURL = this.originalURL + 'updateUserInternalEdit.php';
  private registerExternalUserURL = this.originalURL + 'external/addExternalUser.php';
  private validateExtuserURL = this.originalURL + 'external/validateExternalUser.php';
  private extUsersTableURL = this.originalURL + 'external/getExternalUsers.php';
  private resetPin = this.originalURL + 'external/resetExtPin.php';
  private applyAccountURL = this.originalURL + "external/updateExtUserEdit.php";
  private deleteExtAccountURL = this.originalURL + 'external/deleteExtUser.php';
  private uploadImageURL = this.originalURL + 'instructor/upload.php';
  private addInstructorURL = this.originalURL + 'instructor/addInstructor.php';
  private InstructorTableURL = this.originalURL + 'instructor/getInstructors.php';
  private deleteInstructorURL = this.originalURL + 'instructor/deleteInstructor.php';
  private updateInstructorURL = this.originalURL + 'instructor/updateInstructor.php';
  private uploadClassImageURL = this.originalURL + 'classes/upload.php';
  private addClassURL = this.originalURL + 'classes/addClass.php';
  private classCategoriesURL = this.originalURL + 'classes/getClassCategory.php';
  private createClassCategoryURL = this.originalURL + 'classes/createClassCategory.php';
  private deleteCategoryURL = this.originalURL + 'classes/deleteClass.php';
  private updateClassCategoryURL = this.originalURL + 'classes/updateClassCategory.php';
  private ClassTableURL = this.originalURL + 'classes/getClassesTable.php';
  private reservedSlotURL = this.originalURL + 'classes/getReservedSlots.php';
  private updateReservedSlotURL = this.originalURL + 'classes/updateReservedSlot.php';
  private classEventsURL = this.originalURL + 'classes/getClassEvents.php';
  private eventUsersURL = this.originalURL + 'classes/getEventUsers.php';
  private extUserEmailsURL = this.originalURL + 'classes/getExtUserEmails.php';
  private registerForEventURL = this.originalURL + 'classes/registerForEvent.php';
  private cancelReservationURL = this.originalURL + 'classes/cancelReservation.php';
  private updateClassDetailsURL = this.originalURL + 'classes/updateClassDetails.php';
  private userRegisteredEventsURL = this.originalURL + 'external/getUserRegisteredEvents.php';
  private cancelClassURL = this.originalURL + 'classes/cancelClass.php';
  private reviewTableURL = this.originalURL + 'reviews/getReviewsTable.php';
  private summaryDashURL = this.originalURL + 'getDashboardData.php';
  private newUsersDashURL = this.originalURL + 'getDashNewUsers.php';
  private userSettingPasswordURL = this.originalURL + 'userSettingPassword.php';
  private dashEventsURL = this.originalURL + 'getDashEvents.php';
  private dashReviewsURL = this.originalURL + 'getDashReviews.php';
  private messageClassURL = this.originalURL + 'classes/sendClassMsg.php';
  private scheduleURL = this.originalURL + 'schedule/getSchedule.php';
  private fullDeleteClassURL = this.originalURL + 'classes/fullDeleteClass.php';
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

  getFullDeleteClassURL() {
    return this.fullDeleteClassURL;
  }

}
