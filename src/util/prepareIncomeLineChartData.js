export const prepareIncomeLineChartData = (transactions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const dailyIncome = transactions
    .filter((tx) => tx.amount > 0)
    .filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, tx) => {
      const dateKey = tx.date.split("T")[0];
      const date = new Date(tx.date);

      acc[dateKey] ??= {
        income: 0,
        transactionCount: 0,
        transactionDetails: [],
        fullDate: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      acc[dateKey].income += tx.amount;
      acc[dateKey].transactionCount += 1;
      acc[dateKey].transactionDetails.push({
        description: tx.name,
        amount: tx.amount,
        category: tx.category || "Income",
      });

      return acc;
    }, {});

  return Object.entries(dailyIncome)
    .map(([date, v]) => ({
      date,
      name: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      income: v.income,
      transactionCount: v.transactionCount,
      transactionDetails: v.transactionDetails,
      fullDate: v.fullDate,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
