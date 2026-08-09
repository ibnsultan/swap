# Mfano wa kazi (functions), kurudisha thamani, na wigo (scope)
njia jumlisha(a, b) {
    rejesha a + b;
}

hifadhi jumla = jumlisha(12, 6);
andika "Jumla ni: " + jumla;

hifadhi x = 3;
njia ongeza() {
    hifadhi x = x + 10;
    andika "Ndani ya kazi, x ni: " + x;
}
ongeza();
andika "Nje ya kazi, x bado ni: " + x;

# Neno "ita" linatumika kuashiria kuwa mabadiliko ya kigeuzo hiki
# ndani ya kazi yatoke pia nje ya kazi (wigo wa nje).
njia badilishaX() {
    ita `x`;
    hifadhi x = x + 10;
    andika "Ndani ya kazi (ita), x ni: " + x;
}
badilishaX();
andika "Nje ya kazi, x sasa ni: " + x;
