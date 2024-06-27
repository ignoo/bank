//TODO validate move to separate file
export const validate = (value, input, errors, rules) => {
    for (let i = 0; i < rules.length; i++) {
        let result;
        if (!Array.isArray(rules[i])) {
            result = rules[i](value);
        } else {
            result = rules[i][0](value, rules[i][1]);
        }
        if (result === 1) {
            return true;
        } 
        if (result === 0) {
            continue;
        } 
        if (result !== true) {
            errors.set(input, input + ': ' + result);
            return false;
        }
    }
    return true;
}

export const sometimes = value => {
    if (value) {
        return 0;
    }
    return 1;
}

export const required = value => {
    if (value) {
        return true;
    }
    return 'privaloma';
}

export const min = (value, min) => {
    if (typeof value === 'number') {
        if (value >= min) {
            return true;
        }
        return 'Per mažas';
    }
    if (value.length >= min) {
        return true;
    }
    return 'per trumpas (mažiausiai ' + min + ' raidės)';
}

export const max = (value, max) => {
    if (typeof value === 'number') {
        if (value <= max) {
            return true;
        }
        return 'Per didelis';
    }
    if (value.length <= max) {
        return true;
    }
    return 'per ilgas (daugiausiai ' + max + ' raidės)';
}

export const string = value => {
    if (typeof value === 'string') {
        return true;
    }
    return 'Not a string';
}

export const integer = value => {
    const n = Number(value);
    if (isNaN(n)) {
        return 'Įrašykite skaičių';
    }
    if (n === parseInt(n, 10)) {
        return true;
    }
}

export const number = value => {
    if (typeof value === 'number') {
        return true;
    }
    return 'Neleistini simboliai';
}

export const lettersOnly = value => {
    if (value.match(/^[a-zA-Z ]+$/)) {
        return true;
    }
    return 'Neleistini simboliai';
}

// export const date = value => {
    // const d = new Date(value);
    // if (d instanceof Date && !isNaN(d)) {
        // return true;
    // }
//     return 'Netinkama data ar datos formatas';
// }

// export const inNumbers = value => {
    //if (numbers.includes(+value)) {
        // return true;
    // }
    // return 'Invalid value';
// }

export const imageType = (value, types) => {
    if (types.include(value.type.split('/').pop())) {
        return true;
    }
    return 'Invalid image type';
}

export const imageSize = (value, size) => {
    if (value.size <= size) {
        return true;
    }
    return 'Image is too big. Maximum size is' + size / 1000000 + 'MB';
}