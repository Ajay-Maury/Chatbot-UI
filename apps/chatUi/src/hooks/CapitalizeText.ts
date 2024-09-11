export function CapitalizeText(text:string) {
    return text.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}