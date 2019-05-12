export const phoneNumCheck = (str: string): boolean => /^[0-9]{10,11}$/.test(str);
export const signKeyCheck = (str: string): boolean => /^[a-zA-Z0-9]{6,6}$/.test(str);
export const idCheck = (str: string): boolean => /[a-z0-9-_]{5,20}$/.test(str);
export const pwCheck = (str: string): boolean => /^[a-zA-Z0-9!@#$%^&*()]{8,16}$/.test(str);
