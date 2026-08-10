# Mfano wa ramani (map/object) - hifadhi ya data yenye funguo (key) na thamani (value)
hifadhi mtu = ramani(jina: "Juma", umri: 25);
andika mtu;
andika mtu.jina;
andika mtu.umri;

# Kubadilisha thamani ya funguo, au kuongeza funguo mpya (upsert), zote
# zinahitaji neno "hifadhi" mbele, kama ilivyo kwa oganizesheni (array)
hifadhi mtu.jina = "Asha";
hifadhi mtu.kazi = "Mwalimu";
andika mtu;

# ramani tupu
hifadhi tupu = ramani();
andika tupu;

# Thamani za ramani zinaweza kuwa aina yoyote, hata ramani nyingine ndani yake
hifadhi kitabu = ramani(jina: "Swahili Kwanza", bei: 5000, wapo: [1, 2, 3]);
andika kitabu.bei;
andika kitabu.wapo;
