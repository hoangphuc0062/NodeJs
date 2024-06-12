function formatNumber(number) {
  const formattedNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
  return formattedNumber;
}

export default formatNumber;
