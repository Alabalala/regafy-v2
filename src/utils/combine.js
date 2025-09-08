export const combine = (...classes) => {
  return classes.filter(Boolean).join(" ");
};