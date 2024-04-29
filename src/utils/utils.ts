export function formatDate(inputDate: string) {
  let originalDate = new Date(inputDate);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let hours = originalDate.getHours();
  let minutes: any = originalDate.getMinutes();
  let month = months[originalDate.getMonth()];
  let day = originalDate.getDate();
  let year = originalDate.getFullYear();

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  minutes = minutes < 10 ? "0" + minutes : minutes;

  let formattedDate = month + " " + day + ", " + year;

  return formattedDate;
}

export function timeAgo(dateString: string) {
  const providedDate: any = new Date(dateString);
  const now: any = new Date();

  const timeDifferenceInSeconds = Math.floor((now - providedDate) / 1000);

  if (providedDate > now) {
    return null;
  }

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} second${
      timeDifferenceInSeconds !== 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 2592000) {
    // Less than 30 days (approx. a month)
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
  } else if (timeDifferenceInSeconds < 31536000) {
    // Less than 365 days (approx. a year)
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
  }
}
