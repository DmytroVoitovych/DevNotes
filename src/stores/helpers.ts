import { ElMessageBox, ElNotification } from 'element-plus';
import type { FirebaseError } from 'firebase/app';

export const successResetLinkSendingInform = () =>
  ElMessageBox.alert('Reset link is submitet, check your mail and follow instructions', {
    title: 'Success',
    showClose: false,
    confirmButtonText: 'OK',
    customClass: 'alertSuccessTitle',
  });

export const errorResetLinkSendingInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || 'Error sending reset link. Please try again.', {
    showClose: false,
    confirmButtonText: 'OK',
    title: 'Error',
    customClass: 'errAlertTitle',
  });
};

export const successPasswordResetInform = () =>
  ElMessageBox.alert('Password successfully reset. You can now log in with your new password.', {
    title: 'Success',
    showClose: false,
    confirmButtonText: 'OK',
    customClass: 'alertSuccessTitle',
  });

export const errorPasswordResetInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || 'Error resetting password. Please try again.', {
    showClose: false,
    confirmButtonText: 'OK',
    title: 'Error',
    customClass: 'errAlertTitle',
  });
};

export const needToGetNewResetLink = () =>
  ElMessageBox.alert('You need to ask a new link to reset password.', {
    showClose: false,
    confirmButtonText: 'OK',
    title: 'Error',
    customClass: 'errAlertTitle',
  });

export const noteAdded = () =>
  ElNotification.success({
    message: 'Note saved successfully!',
    position: 'bottom-right',
    customClass: 'successInfo',
    duration: 1500,
  });

export const noteUpdated = (actionFlag: boolean) =>
  ElNotification.success({
    message: !actionFlag ? 'Note restored.' : 'Note archived.',
    position: 'bottom-right',
    customClass: 'successInfo',
    duration: 1500,
  });

export const noteDeleted = () =>
  ElNotification.success({
    message: 'Note permanently deleted.',
    position: 'bottom-right',
    customClass: 'successInfo',
    duration: 1500,
  });
