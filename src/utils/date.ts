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

export const convertToDate = (date: string | Date): boolean => {
    const convertDate = new Date(date);
    return convertDate >= new Date();
};

export const calcGuarantee = (
    miles: number,
    actualMiles: number,
    milesByGuarantee: number
): boolean => {
    return (miles + milesByGuarantee) >= actualMiles;
};

export const checkGuarantee = (
    dateValid: boolean,
    mileageValid: boolean
): string => {
    if (dateValid && mileageValid) return "tak";
    return "nie";
};