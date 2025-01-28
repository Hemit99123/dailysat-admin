export const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
  
    const suffix = (n: number) => {
      if (n >= 11 && n <= 13) return 'th';
      const lastDigit = n % 10;
      if (lastDigit === 1) return 'st';
      if (lastDigit === 2) return 'nd';
      if (lastDigit === 3) return 'rd';
      return 'th';
    };
  
    return `${day}, ${month} ${dateNum}${suffix(dateNum)} ${year}`;
};
  