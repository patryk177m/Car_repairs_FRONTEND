export const fullDate = (time: Date) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const numberMonth = date.getMonth() + 1;
    const day = date.getDate();

    if (day < 10 && numberMonth < 10) return `0${day}.0${numberMonth}.${year}`;
    if (day < 10) return `0${day}.${numberMonth}.${year}`;
    if (numberMonth < 10) return `${day}.0${numberMonth}.${year}`;


    return `${day}.${numberMonth}.${year}`;
};

export const convertToDate = (date: Date) => {
    if (!date) return null;
    const convertDate = new Date(date);
    return convertDate > new Date() ? "tak" : "nie";
}