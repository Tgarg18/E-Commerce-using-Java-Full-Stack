let navigateFn;

export const setNavigate = (navigate) => {
  navigateFn = navigate;
};

export const navigateTo = (path) => {
  if (navigateFn) {
    navigateFn(path);
  } else {
    console.warn("Navigate function not set.");
  }
};
