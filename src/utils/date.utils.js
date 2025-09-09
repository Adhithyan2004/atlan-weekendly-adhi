//  Convert Date -> YYYY-MM-DD
  export function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

   //  Restrict to weekends
  export function isWeekend(dateStr) {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split("-");
    const dt = new Date(y, Number(m) - 1, d);
    const day = dt.getDay();
    return day === 0 || day === 6; // Sunday=0, Saturday=6
  }