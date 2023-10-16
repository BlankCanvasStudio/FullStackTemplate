
class Validation {
    // Make sure these are in sync with ts-src/queries/validation
    email(email_in) {
        if(email_in.length > 320) { return false; }
        let regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regexp.test(email_in);
    }
    password(password) {
        if(typeof password !=="string") { return false; }
        if(password.length > 60 || password.length === 0) { return false; }
        return true;
    }
    date(date) {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }
    username(username) {
        if(username.length > 50 || username.length === 0) { return false; }
        if(typeof username == "string") { return true; }
        return false;
    } 
    url(url_in) {
        if (typeof url_in !== "string") { return false; }
        let regexp = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
        if(regexp.test(url_in)) { return true; }
        return false;
    }
    string(string_in) {
        if (typeof string_in === "string" && string_in.length) { return true; }
        return false;
    }
    UUID(UUID_in) {
        if (typeof UUID_in !== "string") { return false; }
        let regexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regexp.test(UUID_in);
    }
}

export default new Validation();
