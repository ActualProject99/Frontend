export const cls = (...classes: (string | undefined | boolean)[]) =>
  classes
    .filter((className) => className && typeof className === "string")
    .join(" ");
