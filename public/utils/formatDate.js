// Formats date object to US pattern
export default function formatDate(date) {
    const parsedDate = new Date(date);
    const hours = parsedDate.getHours() >= 10 ? parsedDate.getHours() : `0${parsedDate.getHours()}`;
    const minutes = parsedDate.getMinutes() >= 10 ? parsedDate.getMinutes() : `0${parsedDate.getMinutes()}`;
    const month = parsedDate.getMonth() + 1 >= 10 ? parsedDate.getMonth() + 1 : `0${parsedDate.getMonth() + 1}`;
    const day = parsedDate.getDate() >= 10 ? parsedDate.getDate() : `0${parsedDate.getDate()}`;
    return `${hours}:${minutes} ${month}/${day}/${parsedDate.getFullYear()}`;
}