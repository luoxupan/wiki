/**
 * 用法
 * const eleDom = generateElements('<div>Hello World!</div>');
 * eleDom是一个数组
 * append到dom
 * document.body.append(...eleDom);
 */
export function generateElements(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.children;
}
