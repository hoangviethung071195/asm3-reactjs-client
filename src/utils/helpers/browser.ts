export function scrollToBotomEl(el: HTMLElement | null) {
  if (el)
    el.scrollTo(0, el?.scrollHeight);
}