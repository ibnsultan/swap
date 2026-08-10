# Mfano wa njia (functions) kama thamani za kwanza (first-class values)

# Kuhifadhi njia isiyo na jina (lambda) kwenye kigeuzo, na kuiita.
# Kumbuka: kwa kuwa hii ni "hifadhi ... = <expression>;" ni lazima iishe
# kwa ';' baada ya mabano ya mwisho ya njia, tofauti na tamko la kawaida
# la njia (ambalo halihitaji ';' baada ya mabano yake).
hifadhi ongeza = njia (a, b) {
    rejesha a + b;
};
andika ongeza(2, 3);

# Kupeleka njia kama hoja (argument) kwa njia nyingine
hifadhi ongezaMaraMbili = njia (a) {
    rejesha a * 2;
};
njia tumia(kazi, x) {
    rejesha kazi(x);
}
andika tumia(ongezaMaraMbili, 10);

# Kurudisha njia kutoka kwenye njia nyingine
njia pataOngeza() {
    rejesha njia (a, b) {
        rejesha a + b;
    };
}
hifadhi ongezaMpya = pataOngeza();
andika ongezaMpya(4, 5);

# Lambda inaweza kujiita yenyewe (recursion) bila kuharibu wigo wa mwenye kuiita
hifadhi kokotoaFactorial = njia (n) {
    kama (n <= 1) {
        rejesha 1;
    }
    rejesha n * kokotoaFactorial(n - 1);
};
andika kokotoaFactorial(5);
