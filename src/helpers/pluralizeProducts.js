export default function pluralizeProducts(n) {
  const lastTwo = n % 100;
  const last = n % 10;
  let word = "товаров";
  if (lastTwo < 11 || lastTwo > 14) {
    if (last === 1) word = "товар";
    else if (last >= 2 && last <= 4) word = "товара";
  }
  return `${n} ${word}`;
}
