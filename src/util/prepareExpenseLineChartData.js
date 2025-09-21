export const prepareExpenseLineChartData = (transactions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const dailyExpenses = transactions
    .filter((tx) => {
      // For expenses, we typically want positive amounts (money spent)
      // But we should also handle negative amounts if they exist in data
      return Math.abs(tx.amount) > 0;
    })
    .filter((tx) => {
      const d = new Date(tx.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, tx) => {
      const dateKey = tx.date.split("T")[0];
      const date = new Date(tx.date);
      const absoluteAmount = Math.abs(tx.amount); // Use absolute value for expenses

      acc[dateKey] ??= {
        expenses: 0,
        transactionCount: 0,
        transactionDetails: [],
        fullDate: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      acc[dateKey].expenses += absoluteAmount;
      acc[dateKey].transactionCount += 1;
      acc[dateKey].transactionDetails.push({
        description: tx.name,
        amount: absoluteAmount, // Store absolute value
        category: tx.category || "Expense",
      });

      return acc;
    }, {});

  return Object.entries(dailyExpenses)
    .map(([date, v]) => ({
      date,
      name: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      expenses: v.expenses,
      transactionCount: v.transactionCount,
      transactionDetails: v.transactionDetails,
      fullDate: v.fullDate,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};
