export const getDate = (param: string) => {
    const date = new Date(param);
    const options = {year: 'numeric', month: 'long', day: 'numeric' };


    return date.toLocaleDateString(undefined, options);
}