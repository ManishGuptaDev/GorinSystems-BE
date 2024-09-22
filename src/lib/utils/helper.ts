export const generateAuthToken = () => {
    // Generate a random 32-character hexadecimal string
    return [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
}