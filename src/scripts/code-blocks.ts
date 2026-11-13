/**
 * The code blocks' buttons (src/lib/markdown/rehype-code-blocks.ts): copy the
 * code, and wrap long lines. Each stays hidden until it can work.
 */
const canCopy = 'clipboard' in navigator && typeof navigator.clipboard.writeText === 'function';

for (const block of document.querySelectorAll<HTMLElement>('.code-block')) {
  const code = block.querySelector('code') ?? block.querySelector('pre');
  const wrap = block.querySelector<HTMLButtonElement>('[data-action="wrap"]');
  const copy = block.querySelector<HTMLButtonElement>('[data-action="copy"]');
  if (!code) continue;

  if (wrap) {
    // Offered only while a line runs past the edge, or while wrapping is on.
    const update = () => {
      wrap.hidden = !block.classList.contains('word-wrap') && code.scrollWidth <= code.clientWidth;
    };
    new ResizeObserver(update).observe(block);
    wrap.addEventListener('click', () => {
      const on = block.classList.toggle('word-wrap');
      wrap.setAttribute('aria-pressed', String(on));
      update();
    });
  }

  if (copy && canCopy) {
    copy.hidden = false;
    const idle = copy.querySelector<SVGElement>('[data-idle]');
    const done = copy.querySelector<SVGElement>('[data-done]');
    let timer: number | undefined;
    copy.addEventListener('click', async () => {
      await navigator.clipboard.writeText((code.textContent ?? '').replace(/\r?\n$/, ''));
      idle?.setAttribute('hidden', '');
      done?.removeAttribute('hidden');
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        done?.setAttribute('hidden', '');
        idle?.removeAttribute('hidden');
      }, 1000);
    });
  }
}
