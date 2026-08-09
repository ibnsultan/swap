# Mfano wa masharti: kama / basi kama / basi
hifadhi umri = 20;

kama (umri < 18) {
    hifadhi kundi = "mtoto";
} basi kama (umri >= 18 && umri < 50) {
    hifadhi kundi = "kijana";
} basi {
    hifadhi kundi = "mzee";
}

andika "Kundi la umri ni: " + kundi;
