export async function loadGsap() {
  const gsapModule = await import("gsap");

  return gsapModule.gsap;
}
