export function toISODate(d) {
    const ISODate = new Date(d);
    ISODate.setHours(ISODate.getHours(), ISODate.getMinutes() - ISODate.getTimezoneOffset());
    return ISODate.toISOString().replace("T", " ").replace("Z", "").split(".")[0];
}
