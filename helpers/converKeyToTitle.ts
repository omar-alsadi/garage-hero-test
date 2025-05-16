export const converKeyToTitle = (str: string) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
};
