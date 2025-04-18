export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "Invalid Date";

  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getInitials(fullName) {
  if (!fullName || typeof fullName !== "string") return "U"; // Default initial

  const names = fullName.trim().split(" ");
  const initials = names
    .filter((name) => name.length > 0)
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join("");

  return initials || "U"; // Return "U" if no initials are found
}

export const PRIORITY_STYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = ["bg-blue-600", "bg-yellow-600", "bg-red-600", "bg-green-600"];
