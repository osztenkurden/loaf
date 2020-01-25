export function hashCode(str: string) { // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       // tslint:disable-next-line:no-bitwise
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

export function textToRGB(i: string) {
    // tslint:disable-next-line:no-bitwise
    const c = (hashCode(i) & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#" + "00000".substring(0, 6 - c.length) + c;
}
