export function getGreeting(): [string, "sun" | "moon"] {
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 0 && hour < 12) {
    return ["Good Morning", "sun"];
  } else if (hour >= 12 && hour < 18) {
    return ["Good Afternoon", "sun"];
  } else {
    return ["Good Evening", "moon"];
  }
}
