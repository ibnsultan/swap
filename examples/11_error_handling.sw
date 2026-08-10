# Mfano wa jaribu/kamata (try/catch) - kushughulikia makosa wakati wa kuendesha
jaribu {
    hifadhi x = 10 / 0;
    andika "Hii haitachapishwa";
} kamata (hitilafu) {
    andika "Kosa limepatikana: " + hitilafu;
}

andika "Programu inaendelea baada ya kamata";

# jaribu/kamata pia hushika makosa mengine ya wakati wa kuendesha, si migawanyo tu
jaribu {
    andika kigeuzoAmbachoHakipo;
} kamata (hitilafu) {
    andika "Kosa lingine: " + hitilafu;
}

# Neno vunja/rejesha ndani ya jaribu bado hufanya kazi kama kawaida
njia gawanya(a, b) {
    jaribu {
        rejesha a / b;
    } kamata (hitilafu) {
        andika "Imeshindikana kugawanya: " + hitilafu;
        rejesha 0;
    }
}
andika "10 / 2 = " + gawanya(10, 2);
andika "10 / 0 = " + gawanya(10, 0);
