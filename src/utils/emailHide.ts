export function emailHide(email: string) {
    const c = email.split('@');
    const b = c.length && c[0] ? c[0].slice(0, -3) + '***' + '@' + c[1] : email;
    return b
}