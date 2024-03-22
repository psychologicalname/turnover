export function emailHide(email: string) {
    let c = email.split('@');
    let b = c.length && c[0] ? c[0].slice(0, -3) + '***' + '@' + c[1] : email;
    return b
}