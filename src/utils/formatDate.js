export const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";

  const date = new Date(dateString);
  const options = {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  // Format the date as "Sun, Mar 02, 2025"
  let formattedDate = date.toLocaleDateString("en-US", options);

  // Remove the comma after day
  formattedDate = formattedDate.replace(/(\d{2}),/, "$1");

  return formattedDate;
};
