# Mfano wa kazi tegemezi (built-in helpers)
andika herufiKubwa("herufi");
andika herufiNdogo("HERUFI");
andika kaunta([26,78,75,"embe"]);
andika hariri("wewe ni mbaya", "mbaya", "mzuri");
andika tafuta("wewe ni mbaya", "mbaya");

# badili: str_replace - inaruhusu ubadilishaji rahisi, wa mfululizo, na wa regex
andika badili("wewe ni mbaya", "mbaya", "mzuri");
andika badili("mbaya mbaya mbaya", "mbaya", "mzuri", "yote");
andika badili("mbwa na paka", ["mbwa","paka"], ["ng'ombe","kuku"]);
andika badili("a1 b2 c3", "[0-9]", "#", "regex", "g");
