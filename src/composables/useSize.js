let checkSize = $ref(window.matchMedia("(min-width: 750px)").matches);

window.addEventListener(
  "resize",
  () => (checkSize = window.matchMedia("(min-width: 750px)").matches)
);

export function useSize() {
  return $$({ checkSize })
}