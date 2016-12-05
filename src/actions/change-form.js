export const CHANGE_FIELD = 'CHANGE_FIELD';

export function changeField(name, value) {
    return {
        type: CHANGE_FIELD,
        name,
        value
    };
}
