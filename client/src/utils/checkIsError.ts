export const checkIsError = (str: string): boolean => {
    const reg = /error/i;
    return reg.test(str);
}