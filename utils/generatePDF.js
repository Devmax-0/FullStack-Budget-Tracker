import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePDF(data) {
  const { title, amount, expenses } = data;

  const doc = new jsPDF();

  // Set title
  doc.setFontSize(24);
  doc.setTextColor(40, 56, 65);
  doc.text("Budget Report", 14, 22);

  // Set metadata
  doc.setFontSize(16);
  doc.setTextColor(52, 73, 94);
  doc.text(`Title: ${title}`, 14, 40);
  doc.text(`Total Amount: ${amount}`, 14, 50);

  // Prepare table data
  const tableColumn = ["Expense Name", "Amount", "Date"];
  const tableRows = [];

  expenses.forEach((expense) => {
    const expenseData = [expense.name, expense.amount, expense.date];
    tableRows.push(expenseData);
  });

  // Add table
  doc.autoTable({
    startY: 60,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    styles: {
      fontSize: 12,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [40, 56, 65],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
    tableLineColor: [189, 195, 199],
    tableLineWidth: 0.1,
  });

  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  return doc.save("budget_report.pdf");
}
