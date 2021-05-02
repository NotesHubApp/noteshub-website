/**
 * @see https://easings.net/
 */
 function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/**
 * @see https://htmldom.dev/scroll-to-an-element-smoothly/
 */
export const scrollToTarget = function(target: Element, duration: number = 1000, animationFunction: (t: number) => number = easeOutExpo) {
  const top = target.getBoundingClientRect().top;
  const startPos = window.pageYOffset;
  const diff = top;

  let startTime: DOMHighResTimeStamp | null = null;
  let requestId: number;

  const loop = (currentTime: DOMHighResTimeStamp) => {
      if (!startTime) {
          startTime = currentTime;
      }

      // Elapsed time in miliseconds
      const time = currentTime - startTime;

      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startPos + diff * animationFunction(percent));

      if (time < duration) {
          // Continue moving
          requestId = window.requestAnimationFrame(loop);
      } else {
          window.cancelAnimationFrame(requestId);
      }
  };
  requestId = window.requestAnimationFrame(loop);
};
