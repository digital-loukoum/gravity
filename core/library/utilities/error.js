export default function error(status, message) {
    return {
        status,
        headers: {},
        body: message,
    };
}
