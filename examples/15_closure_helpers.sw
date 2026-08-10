# Mfano wa helper kazi zinazotumia njia (closures): ramanisha, chuja,
# punguza, kilamoja - pamoja na kwaJson/kutokaJson

hifadhi namba = [1, 2, 3, 4, 5];

# ramanisha (map) - tengeneza orodha mpya kwa kutumia njia kwa kila kipengele
hifadhi maradufu = njia (x) {
    rejesha x * 2;
};
andika ramanisha(namba, maradufu);

# chuja (filter) - chuja vipengele vinavyokidhi sharti
hifadhi kubwaKulikoTatu = njia (x) {
    rejesha x > 3;
};
andika chuja(namba, kubwaKulikoTatu);

# punguza (reduce) - kunja orodha kuwa thamani moja
hifadhi jumlisha = njia (jumla, x) {
    rejesha jumla + x;
};
andika punguza(namba, jumlisha, 0);

# kilamoja (forEach) - fanya kitu kwa kila kipengele, ukitumia lambda moja kwa moja
kilamoja(namba, njia (x) {
    andika "namba: " + x;
});

# kwaJson na kutokaJson - kwenda na kurudi kati ya swap na JSON.
# (Swap string literals hazina njia ya "escape" - haiwezekani kuandika alama
# ya nukuu mbili (") ndani ya string moja kwa moja - kwa hiyo mfano huu
# unatengeneza JSON kwa kutumia kwaJson badala ya kuandika kwa mkono.)
hifadhi mtu = ramani(jina: "Juma", umri: 25);
hifadhi maandishiYaMtu = kwaJson(mtu);
andika maandishiYaMtu;
andika kutokaJson(maandishiYaMtu);

hifadhi maandishi = kwaJson([1, 2, 3]);
andika maandishi;
andika kutokaJson(maandishi);
