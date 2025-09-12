//  Convert Date -> YYYY-MM-DD
  export function formatDateLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

   //  Restrict users to select only weekends
  export function isWeekend(dateStr) {
    if (!dateStr) return false;
    const [y, m, d] = dateStr.split("-");
    const dt = new Date(y, Number(m) - 1, d);
    const day = dt.getDay();
    return day === 0 || day === 6; // Sunday=0, Saturday=6
  }

// Convert YYYY-MM-DD to DD-MM-YYYY for disaply purposes
  export function reorderDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

// Convert to 12hr format for better readability
export function formatTime12hr(time) {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 → 12, 13 → 1, etc.
  return `${hour}:${minute} ${ampm}`;
}

export const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };
