
export function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + year;
}
  
export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug", 
    "Sep", "Oct", "Nov", "Dec"
  ];

  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return date.getDate() + ' ' + monthNames[monthIndex] + ' ' + year + ' - ' + hours + ':' + minutes;
}  

const isObject = val => {
  return typeof val === 'object' && val !== null;
};

export const classnames = (...args) => {
    const classes = [];
    args.forEach(arg => {
        if (typeof arg === 'string') {
            classes.push(arg);
        } else if (isObject(arg)) {
            Object.keys(arg).forEach(key => {
                if (arg[key]) {
                    classes.push(key);
                }
            });
        } else {
            throw new Error(
                '`classnames` only accepts string or object as arguments'
            );
        }
    });

    return classes.join(' ');
};