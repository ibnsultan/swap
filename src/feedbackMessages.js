const message = {
    english: {
        baseNodeType: (arg) => `${arg} must be of type BaseNode`,
        genericErrorMsg: (arg) => `Cannot process unexpected token : ${arg}`,
        funIncrementAndDecrementMsg: () => "Invalid swap decrement or increment operation",
        invalidFileMsg: () => "Invalid swap file. Expected file with .swap extension",
        invalidAssignment: () => "Cannot assign value to swap functions(kazi) call",
        invalidArrayIndexTypeMsg: (arg) => `Typeof index given for array ${arg} must be a number`,
        arrayIndexDoesNotExistMsg: (arg) => `Index given for array ${arg} does not exist`,
        varDoesNotExist: (type, name) => `${type} ${name} is undefined`,
        iseAlreadyExist: (name, scope) => `Ise with name ${name} already exists within the ${scope} scope`,
        expectStringMsg: (arg) => `${arg} expects a string`,
        expectBooleanMsg: () => "Expecting swap keyword value e.g boolean(kweli|sikweli)",
        unexpectedDeclaration: (arg) => `Yorlang ${arg} keyword not expected`,
        yorlangArithmeticException: () => "SwapArithmeticException - cannot divide by zero",
        undefinedValueMsg: (arg) => `Cannot set value undefined to variable ${arg}`,
        cannotNegateMsg: (arg) => `Cannot apply negation operator to the given expression: ${arg}`,

    },

    swahili: {
        baseNodeType: (arg) => `${arg} Lazima iwe ni aina ya BaseNode`,
        genericErrorMsg: (arg) => `Haiwezekani kuuwa token uliyotumia : ${arg}`,
        funIncrementAndDecrementMsg: () => "Operesheni ya kuongezea au kupunguazia uliyotumia ni batili",
        invalidFileMsg: () => "Faili uliyotumia ni batili, faili inayotarajiwa ni ya ugani .swap",
        invalidAssignment: () => "Haiwezekani kupeleka thamani kwenye function(kazi)",
        invalidArrayIndexTypeMsg: (arg) => `Atọka to je ti array ${arg} gbodo je nomba`,
        arrayIndexDoesNotExistMsg: (arg) => `Atọka to je ti array ${arg} ko si ninu ibi itoju nkan pamo yorlang`,
        varDoesNotExist: (type, name) => `${type} ${name} ko si ninu ibi itoju nkan pamo yorlang`,
        iseAlreadyExist: (name, scope) => `Ise to ni oruko ${name} ti wa ninu odi ${scope} tẹ́lẹ`,
        expectStringMsg: (arg) => `${arg} ti yorlang n reti string`,
        expectBooleanMsg: (arg) => "Neno linalotarajiwa ni kutoka katika kamusi ya Swap",
        unexpectedDeclaration: (arg) => `Yorlang ko reti '${arg}' ninu odi to ti yọjú`,
        yorlangArithmeticException: () => "SwapArithmeticException - Haiwezekani kugawanya kwa sifuri",
        undefinedValueMsg: (arg) => `Yorlang ko le fi ofifo sinu ${arg}`,
        cannotNegateMsg: (arg) => `Yorlang ò le lo aami iyokuru pelu ${arg} `,
    },
};

module.exports = message[global.defaultLang];
