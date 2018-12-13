interface Options {
  targetElement: HTMLElement;
  // Длительность в мс.
  duration: number;
  // Элемент, который будет прокручиваться.
  insideElement: HTMLElement | Window;
  offset?: number;
  onStart?: () => void;
  onEnd?: () => void;
  isWindow?: boolean;
}

function animatedScrollTo({targetElement, duration, insideElement, offset = 0, isWindow, onStart, onEnd}: Options): void {
  const startPositionY = isWindow ? window.scrollY : (<HTMLElement>insideElement).scrollTop;
  const targetPositionY = startPositionY + targetElement.getBoundingClientRect().top -
    (isWindow ? 0 : (<HTMLElement>insideElement).getBoundingClientRect().top) + offset;

  if (targetPositionY === startPositionY) {
    return;
  }

  let currentPositionY = 0;
  let start: number;

  if (typeof onStart === 'function') {
    onStart();
  }

  window.requestAnimationFrame(animateScroll);

  function animateScroll(timestamp: number): void {
    start = start || timestamp;

    const deltaTop = Math.round(targetPositionY - startPositionY);
    const progress = timestamp - start;
    const percent = (progress >= duration ? 1 : easeInOutQuad(progress / duration));
    currentPositionY = startPositionY + Math.ceil(deltaTop * percent);

    if (isWindow) {
      insideElement.scrollTo(0, currentPositionY);
    } else {
      (<HTMLElement>insideElement).scrollTop = currentPositionY;
    }

    if (percent < 1) {
      window.requestAnimationFrame(animateScroll);
    } else if (typeof onEnd === 'function') {
      onEnd();
    }
  }
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - 8 * (--x) * x * x * x;
}

export default animatedScrollTo;
