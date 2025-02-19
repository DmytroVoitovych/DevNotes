import router from "@/router";
import { ElMessageBox, ElNotification } from "element-plus";
import type { FirebaseError } from "firebase/app";
import { h } from "vue";

export const successResetLinkSendingInform = () =>
  ElMessageBox.alert("Reset link is submitet, check your mail and follow instructions", {
    title: "Success",
    showClose: false,
    confirmButtonText: "OK",
    customClass: "alertSuccessTitle",
  });

export const errorResetLinkSendingInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || "Error sending reset link. Please try again.", {
    showClose: false,
    confirmButtonText: "OK",
    title: "Error",
    customClass: "errAlertTitle",
  });
};

export const successPasswordResetInform = () =>
  ElMessageBox.alert("Password successfully reset. You can now log in with your new password.", {
    title: "Success",
    showClose: false,
    confirmButtonText: "OK",
    customClass: "alertSuccessTitle",
  });

export const successPasswordUpdateInform = () =>
  ElMessageBox.alert("Password successfully changed. You can now log in with your new password.", {
    title: "Success",
    showClose: false,
    confirmButtonText: "OK",
    customClass: "alertSuccessTitle",
  });

export const errorPasswordResetInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || "Error resetting password. Please try again.", {
    showClose: false,
    confirmButtonText: "OK",
    title: "Error",
    customClass: "errAlertTitle",
  });
};

export const errorPasswordChangeInform = (err: FirebaseError) => {
  return ElMessageBox.alert(err.message || "Error changing password. Please try again.", {
    showClose: false,
    confirmButtonText: "OK",
    title: "Error",
    customClass: "errAlertTitle",
  });
};

export const needToGetNewResetLink = () =>
  ElMessageBox.alert("You need to ask a new link to reset password.", {
    showClose: false,
    confirmButtonText: "OK",
    title: "Error",
    customClass: "errAlertTitle",
  });

export const noteAdded = () =>
  ElNotification.success({
    message: "Note saved successfully!",
    position: "bottom-right",
    customClass: "successInfo",
    duration: 1500,
  });

export const noteUpdated = (actionFlag: boolean) =>
  ElNotification.success({
    message: h("p", null, [
      h("span", null, !actionFlag ? "Note restored." : "Note archived."),
      h(
        "a",
        {
          onClick() {
            return !actionFlag
              ? router.push({ name: "notes" })
              : router.push({ name: "archivednotes" });
          },
          style: { float: "right", textDecoration: "underline", cursor: "pointer" },
        },
        !actionFlag ? "All notes." : "Archived notes.",
      ),
    ]),
    position: "bottom-right",
    customClass: "successInfo",
    duration: 3500,
  });

export const noteDeleted = () =>
  ElNotification.success({
    message: "Note permanently deleted.",
    position: "bottom-right",
    customClass: "successInfo",
    duration: 1500,
  });

export const noteChanged = () =>
  ElNotification.success({
    message: "Note changed successfully!",
    position: "bottom-right",
    customClass: "successInfo",
    duration: 1500,
  });
