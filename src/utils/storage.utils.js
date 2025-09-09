
export function saveActivities(activities) {
  localStorage.setItem("activities", JSON.stringify(activities));
}

export function loadActivities(){
  const saved = localStorage.getItem("activities");
  return saved ? JSON.parse(saved) : [];
}
