import { useEffect } from "react";

const AppSecurity = () => {
  useEffect(() => {
    const disableRightClick = (event) => event.preventDefault();
    const disableShortcuts = (event) => {
      if (
        event.ctrlKey &&
        ["u", "s", "c", "x", "v", "i", "j"].includes(event.key.toLowerCase()) ||
        event.key === "F12"
      ) {
        event.preventDefault();
      }
    };
    const disableCopyPaste = (event) => event.preventDefault();

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableShortcuts);
    document.addEventListener("copy", disableCopyPaste);
    document.addEventListener("cut", disableCopyPaste);
    document.addEventListener("paste", disableCopyPaste);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableShortcuts);
      document.removeEventListener("copy", disableCopyPaste);
      document.removeEventListener("cut", disableCopyPaste);
      document.removeEventListener("paste", disableCopyPaste);
    };
  }, []);

  return null;
};

export default AppSecurity;
