import { useContext } from "react";
import { AuthContext } from "../../libs/contexts/authContext";
import ErrorNoti from "./error_noti";
import InfoNoti from "./info_noti";
import SuccNoti from "./success_noti";
import WarnNoti from "./warning_noti";

export default function Notify() {
  const { notiData, _closeNoti } = useContext(AuthContext);
  const { type, msg } = notiData;

  if (type === "info") {
    setTimeout(() => {
      _closeNoti();
    }, 3000);
    return <InfoNoti msg={msg} />;
  }

  if (type === "warning") {
    setTimeout(() => {
      _closeNoti();
    }, 3000);
    return <WarnNoti msg={msg} />;
  }

  if (type === "error") {
    setTimeout(() => {
      _closeNoti();
    }, 3000);
    return <ErrorNoti msg={msg} />;
  }

  if (type === "success") {
    setTimeout(() => {
      _closeNoti();
    }, 3000);
    return <SuccNoti msg={msg} />;
  }

  return null;
}
