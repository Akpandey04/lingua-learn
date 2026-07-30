const germanUnits = [
  {
    id: 'greetings',
    unitTitle: 'Greetings',
    words: [
      { id: 'a1_de_hallo', native: 'Hallo', english: 'Hello', ipa: '/ˈha.lo/', pron: 'Hah-lo', tip: 'Almost identical to English.', ex: 'Hallo, ich bin Julia.', ext: 'Hello, I am Julia.' },
      { id: 'a1_de_guten_morgen', native: 'Guten Morgen', english: 'Good morning', ipa: '/ˈɡuː.tən ˈmɔʁ.ɡən/', pron: 'Goo-ten mor-gen', tip: 'Morgen sounds like morning.', ex: 'Guten Morgen, Anna.', ext: 'Good morning, Anna.' },
      { id: 'a1_de_guten_tag', native: 'Guten Tag', english: 'Good day', ipa: '/ˈɡuː.tən taːk/', pron: 'Goo-ten tahk', tip: 'Tag means day.', ex: 'Guten Tag, Herr Weber.', ext: 'Good day, Mr. Weber.' },
      { id: 'a1_de_guten_abend', native: 'Guten Abend', english: 'Good evening', ipa: '/ˈɡuː.tən ˈaː.bənt/', pron: 'Goo-ten ah-bent', tip: 'Abend sounds slightly like event.', ex: 'Guten Abend, Maria.', ext: 'Good evening, Maria.' },
      { id: 'a1_de_tschuess', native: 'Tschüss', english: 'Bye', ipa: '/tʃʏs/', pron: 'Tshoos', tip: 'A casual, fun way to say bye.', ex: 'Tschüss, bis bald!', ext: 'Bye, see you soon!' }
    ],
    sentences: [
      { text: "Hallo, Guten Morgen", tokens: ["Hallo,", "Guten", "Morgen", "Abend"] },
      { text: "Guten Tag und Tschüss", tokens: ["Guten", "Tag", "und", "Tschüss"] }
    ]
  },
  {
    id: 'numbers',
    unitTitle: 'Numbers 1-5',
    words: [
      { id: 'a1_de_eins', native: 'eins', english: 'one', ipa: '/aɪ̯ns/', pron: 'eyens', tip: 'Eins starts with E, like English One starts with O? No, think Einstein (one stone).', ex: 'Ich habe eins.', ext: 'I have one.' },
      { id: 'a1_de_zwei', native: 'zwei', english: 'two', ipa: '/tsvaɪ̯/', pron: 'tsvy', tip: 'Z sounds like ts in German.', ex: 'Das sind zwei.', ext: 'Those are two.' },
      { id: 'a1_de_drei', native: 'drei', english: 'three', ipa: '/dʁaɪ̯/', pron: 'dry', tip: 'Sounds like dry.', ex: 'Wir sind drei.', ext: 'We are three.' },
      { id: 'a1_de_vier', native: 'vier', english: 'four', ipa: '/fiːɐ̯/', pron: 'feer', tip: 'V sounds like F in German.', ex: 'Ich sehe vier.', ext: 'I see four.' },
      { id: 'a1_de_fuenf', native: 'fünf', english: 'five', ipa: '/fʏnf/', pron: 'foonf', tip: 'The ü makes a rounded u sound.', ex: 'Ich brauche fünf.', ext: 'I need five.' }
    ],
    sentences: [
      { text: "Eins, zwei, drei", tokens: ["Eins,", "zwei,", "drei", "vier"] },
      { text: "Vier und fünf", tokens: ["Vier", "und", "fünf", "eins"] }
    ]
  },
  {
    id: 'basic_verbs',
    unitTitle: 'Basic Verbs',
    words: [
      { id: 'a1_de_sein', native: 'sein', english: 'to be', ipa: '/zaɪ̯n/', pron: 'zyne', tip: 'To be or not to be.', ex: 'Ich will da sein.', ext: 'I want to be there.' },
      { id: 'a1_de_haben', native: 'haben', english: 'to have', ipa: '/ˈhaː.bən/', pron: 'hah-ben', tip: 'Looks like have.', ex: 'Wir haben Zeit.', ext: 'We have time.' },
      { id: 'a1_de_gehen', native: 'gehen', english: 'to go', ipa: '/ˈɡeː.ən/', pron: 'gay-en', tip: 'G for go.', ex: 'Wir gehen jetzt.', ext: 'We go now.' },
      { id: 'a1_de_kommen', native: 'kommen', english: 'to come', ipa: '/ˈkɔ.mən/', pron: 'koh-men', tip: 'Looks and means come.', ex: 'Sie kommen heute.', ext: 'They come today.' },
      { id: 'a1_de_machen', native: 'machen', english: 'to do/make', ipa: '/ˈma.xən/', pron: 'mah-khen', tip: 'Similar to make.', ex: 'Was machen wir?', ext: 'What do we do?' }
    ],
    sentences: [
      { text: "Wir haben Zeit", tokens: ["Wir", "haben", "Zeit", "sein"] },
      { text: "Wir gehen jetzt", tokens: ["Wir", "gehen", "jetzt", "kommen"] }
    ]
  },
  {
    id: 'family',
    unitTitle: 'Family',
    words: [
      { id: 'a1_de_familie', native: 'die Familie', english: 'the family', ipa: '/diː faˈmiː.li̯ə/', pron: 'dee fah-mee-lee-eh', tip: 'Family with an e at the end.', ex: 'Die Familie ist groß.', ext: 'The family is big.' },
      { id: 'a1_de_mutter', native: 'die Mutter', english: 'the mother', ipa: '/diː ˈmʊ.tɐ/', pron: 'dee moo-ter', tip: 'Mother.', ex: 'Die Mutter ist hier.', ext: 'The mother is here.' },
      { id: 'a1_de_vater', native: 'der Vater', english: 'the father', ipa: '/deːɐ̯ ˈfaː.tɐ/', pron: 'der fah-ter', tip: 'V sounds like F. Vater = Father.', ex: 'Der Vater arbeitet.', ext: 'The father works.' },
      { id: 'a1_de_bruder', native: 'der Bruder', english: 'the brother', ipa: '/deːɐ̯ ˈbʁuː.dɐ/', pron: 'der broo-der', tip: 'Brother.', ex: 'Der Bruder spielt.', ext: 'The brother plays.' },
      { id: 'a1_de_schwester', native: 'die Schwester', english: 'the sister', ipa: '/diː ˈʃvɛs.tɐ/', pron: 'dee shves-ter', tip: 'Sister.', ex: 'Die Schwester liest.', ext: 'The sister reads.' }
    ],
    sentences: [
      { text: "Die Mutter ist hier", tokens: ["Die", "Mutter", "ist", "hier"] },
      { text: "Der Bruder spielt", tokens: ["Der", "Bruder", "spielt", "Vater"] }
    ]
  },
  {
    id: 'food',
    unitTitle: 'Food & Drinks',
    words: [
      { id: 'a1_de_wasser', native: 'das Wasser', english: 'the water', ipa: '/das ˈva.sɐ/', pron: 'dahs vah-ser', tip: 'Water with a V sound.', ex: 'Ich trinke das Wasser.', ext: 'I drink the water.' },
      { id: 'a1_de_brot', native: 'das Brot', english: 'the bread', ipa: '/das bʁoːt/', pron: 'dahs brot', tip: 'Bread.', ex: 'Das Brot ist gut.', ext: 'The bread is good.' },
      { id: 'a1_de_apfel', native: 'der Apfel', english: 'the apple', ipa: '/deːɐ̯ ˈap.fl̩/', pron: 'der ahp-fel', tip: 'Apple.', ex: 'Ich esse den Apfel.', ext: 'I eat the apple.' },
      { id: 'a1_de_kaffee', native: 'der Kaffee', english: 'the coffee', ipa: '/deːɐ̯ ˈka.fe/', pron: 'der kah-fay', tip: 'Coffee.', ex: 'Der Kaffee ist heiß.', ext: 'The coffee is hot.' },
      { id: 'a1_de_milch', native: 'die Milch', english: 'the milk', ipa: '/diː mɪlç/', pron: 'dee milch', tip: 'Milk.', ex: 'Ich mag die Milch.', ext: 'I like the milk.' }
    ],
    sentences: [
      { text: "Ich trinke das Wasser", tokens: ["Ich", "trinke", "das", "Wasser"] },
      { text: "Das Brot ist gut", tokens: ["Das", "Brot", "ist", "gut"] }
    ]
  },
  {
    id: 'travel',
    unitTitle: 'Travel',
    words: [
      { id: 'a1_de_bahnhof', native: 'der Bahnhof', english: 'the train station', ipa: '/deːɐ̯ ˈbaːn.hoːf/', pron: 'der bahn-hof', tip: 'Bahn = train, Hof = yard.', ex: 'Wo ist der Bahnhof?', ext: 'Where is the station?' },
      { id: 'a1_de_bus', native: 'der Bus', english: 'the bus', ipa: '/deːɐ̯ bʊs/', pron: 'der boos', tip: 'Bus.', ex: 'Der Bus kommt bald.', ext: 'The bus comes soon.' },
      { id: 'a1_de_ticket', native: 'das Ticket', english: 'the ticket', ipa: '/das ˈtɪ.kɪt/', pron: 'dahs tih-kit', tip: 'Same as English.', ex: 'Ich habe das Ticket.', ext: 'I have the ticket.' },
      { id: 'a1_de_hotel', native: 'das Hotel', english: 'the hotel', ipa: '/das hoˈtɛl/', pron: 'dahs ho-tel', tip: 'Same as English.', ex: 'Das Hotel ist schön.', ext: 'The hotel is nice.' },
      { id: 'a1_de_flughafen', native: 'der Flughafen', english: 'the airport', ipa: '/deːɐ̯ ˈfluːk.haː.fn̩/', pron: 'der floog-hah-fen', tip: 'Flug = flight, Hafen = port.', ex: 'Wir sind am Flughafen.', ext: 'We are at the airport.' }
    ],
    sentences: [
      { text: "Wo ist der Bahnhof?", tokens: ["Wo", "ist", "der", "Bahnhof?"] },
      { text: "Ich habe das Ticket", tokens: ["Ich", "habe", "das", "Ticket"] }
    ]
  },
  {
    id: 'time',
    unitTitle: 'Time & Daily Life',
    words: [
      { id: 'a1_de_heute', native: 'heute', english: 'today', ipa: '/ˈhɔɪ̯.tə/', pron: 'hoy-teh', tip: 'Hoy is today in Spanish too.', ex: 'Wir lernen heute.', ext: 'We learn today.' },
      { id: 'a1_de_morgen', native: 'morgen', english: 'tomorrow', ipa: '/ˈmɔʁ.ɡn̩/', pron: 'mor-gen', tip: 'Also means morning.', ex: 'Wir gehen morgen.', ext: 'We go tomorrow.' },
      { id: 'a1_de_uhr', native: 'die Uhr', english: 'the clock/o\'clock', ipa: '/diː uːɐ̯/', pron: 'dee oor', tip: 'Sounds like hour.', ex: 'Es ist ein Uhr.', ext: 'It is one o\'clock.' },
      { id: 'a1_de_montag', native: 'der Montag', english: 'Monday', ipa: '/deːɐ̯ ˈmoːn.taːk/', pron: 'der mon-tahk', tip: 'Moon day.', ex: 'Montag ist gut.', ext: 'Monday is good.' },
      { id: 'a1_de_wochenende', native: 'das Wochenende', english: 'the weekend', ipa: '/das ˈvɔ.xən.ɛn.də/', pron: 'dahs voh-khen-en-deh', tip: 'Woche = week, Ende = end.', ex: 'Ein tolles Wochenende!', ext: 'A great weekend!' }
    ],
    sentences: [
      { text: "Wir lernen heute", tokens: ["Wir", "lernen", "heute", "morgen"] },
      { text: "Es ist ein Uhr", tokens: ["Es", "ist", "ein", "Uhr"] }
    ]
  }
];

module.exports = { germanUnits };
