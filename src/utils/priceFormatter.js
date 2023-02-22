export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const changeFormate = (data) => {
  const num = priceFormatter
    .format(data)
    .replaceAll("$", "")
    .replaceAll(",", "");
  if (num >= 1000000) {
    const amount = Math.round((num / 1000000) * 100) / 100;
    return "$" + amount.toLocaleString() + "M";
  }
  if (num >= 1000) {
    const amount = Math.round((num / 1000) * 100) / 100;
    return "$" + amount.toLocaleString() + "K";
  }
  if (num <= 100) {
    return "$" + num;
  }
};

