export const formateDate = (date , config) => {
    const deafultConfig = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const dateObj = new Date(date);
    const formatedDate = dateObj.toLocaleDateString('en-US', config || deafultConfig);
    return formatedDate;
}