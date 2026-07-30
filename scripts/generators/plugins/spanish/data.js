const spanishUnits = [
  {
    id: 'meeting',
    unitTitle: 'Meeting People',
    words: [
      { id: 'a1_es_hola', native: 'Hola', english: 'Hello', ipa: '/ˈo.la/', pron: 'Oh-lah', tip: 'H is silent.', ex: '¡Hola amigo!', ext: 'Hello friend!' },
      { id: 'a1_es_buenos', native: 'Buenos días', english: 'Good morning', ipa: '/ˈbwe.nos ˈdi.as/', pron: 'Bway-nos dee-ahs', tip: 'Good days.', ex: 'Buenos días a todos.', ext: 'Good morning everyone.' },
      { id: 'a1_es_gracias', native: 'Gracias', english: 'Thank you', ipa: '/ˈɡɾa.sjas/', pron: 'Grah-see-ahs', tip: 'Gracious.', ex: 'Muchas gracias.', ext: 'Thank you very much.' },
      { id: 'a1_es_porfavor', native: 'Por favor', english: 'Please', ipa: '/poɾ faˈβoɾ/', pron: 'Por fah-vor', tip: 'For favor.', ex: 'Un café, por favor.', ext: 'A coffee, please.' },
      { id: 'a1_es_adios', native: 'Adiós', english: 'Goodbye', ipa: '/aˈðjos/', pron: 'Ah-dee-os', tip: 'To God (a Dios).', ex: 'Adiós, hasta mañana.', ext: 'Goodbye, see you tomorrow.' }
    ],
    sentences: [
      { text: "Hola, buenos días", tokens: ["Hola,", "buenos", "días", "noches"] },
      { text: "Gracias y adiós", tokens: ["Gracias", "y", "adiós", "hola"] }
    ]
  },
  {
    id: 'numbers',
    unitTitle: 'Numbers',
    words: [
      { id: 'a1_es_uno', native: 'Uno', english: 'One', ipa: '/ˈu.no/', pron: 'Oo-no', tip: 'Number 1', ex: 'Un boleto.', ext: 'One ticket.' },
      { id: 'a1_es_dos', native: 'Dos', english: 'Two', ipa: '/dos/', pron: 'Dos', tip: 'Number 2', ex: 'Dos personas.', ext: 'Two people.' },
      { id: 'a1_es_tres', native: 'Tres', english: 'Three', ipa: '/tɾes/', pron: 'Tres', tip: 'Number 3', ex: 'Tres días.', ext: 'Three days.' },
      { id: 'a1_es_cuatro', native: 'Cuatro', english: 'Four', ipa: '/ˈkwa.tɾo/', pron: 'Kwah-tro', tip: 'Number 4', ex: 'Cuatro horas.', ext: 'Four hours.' },
      { id: 'a1_es_cinco', native: 'Cinco', english: 'Five', ipa: '/ˈsin.ko/', pron: 'Seen-ko', tip: 'Number 5', ex: 'Cinco euros.', ext: 'Five euros.' }
    ],
    sentences: [
      { text: "Uno, dos, tres", tokens: ["Uno,", "dos,", "tres", "cuatro"] },
      { text: "Cuatro y cinco", tokens: ["Cuatro", "y", "cinco", "dos"] }
    ]
  },
  {
    id: 'basics',
    unitTitle: 'Basic Verbs',
    words: [
      { id: 'a1_es_ser', native: 'Ser', english: 'To be (permanent)', ipa: '/seɾ/', pron: 'Sair', tip: 'Permanent identity', ex: 'Yo soy estudiante.', ext: 'I am a student.' },
      { id: 'a1_es_estar', native: 'Estar', english: 'To be (temporary)', ipa: '/esˈtaɾ/', pron: 'Es-tar', tip: 'Temporary state or location', ex: 'Él está feliz.', ext: 'He is happy.' },
      { id: 'a1_es_tener', native: 'Tener', english: 'To have', ipa: '/teˈneɾ/', pron: 'Teh-nair', tip: 'Ten = have', ex: 'Tengo un perro.', ext: 'I have a dog.' },
      { id: 'a1_es_hacer', native: 'Hacer', english: 'To do/make', ipa: '/aˈseɾ/', pron: 'Ah-sair', tip: 'Hacer things', ex: 'Hago mi tarea.', ext: 'I do my homework.' },
      { id: 'a1_es_ir', native: 'Ir', english: 'To go', ipa: '/iɾ/', pron: 'Ear', tip: 'Ear goes', ex: 'Voy al parque.', ext: 'I go to the park.' }
    ],
    sentences: [
      { text: "Yo soy feliz", tokens: ["Yo", "soy", "feliz", "estoy"] },
      { text: "Tengo que ir", tokens: ["Tengo", "que", "ir", "ser"] }
    ]
  },
  {
    id: 'family',
    unitTitle: 'La Familia',
    words: [
      { id: 'a1_es_madre', native: 'Madre', english: 'Mother', ipa: '/ˈma.ðɾe/', pron: 'Mah-dray', tip: 'Mom', ex: 'Mi madre es alta.', ext: 'My mother is tall.' },
      { id: 'a1_es_padre', native: 'Padre', english: 'Father', ipa: '/ˈpa.ðɾe/', pron: 'Pah-dray', tip: 'Dad', ex: 'Tu padre trabaja.', ext: 'Your father works.' },
      { id: 'a1_es_hermano', native: 'Hermano', english: 'Brother', ipa: '/eɾˈma.no/', pron: 'Er-mah-no', tip: 'Bro', ex: 'Tengo un hermano.', ext: 'I have a brother.' },
      { id: 'a1_es_hermana', native: 'Hermana', english: 'Sister', ipa: '/eɾˈma.na/', pron: 'Er-mah-nah', tip: 'Sis', ex: 'Mi hermana estudia.', ext: 'My sister studies.' },
      { id: 'a1_es_abuelo', native: 'Abuelo', english: 'Grandfather', ipa: '/aˈβwe.lo/', pron: 'Ah-bway-lo', tip: 'Grandpa', ex: 'El abuelo lee.', ext: 'The grandfather reads.' }
    ],
    sentences: [
      { text: "Mi madre y padre", tokens: ["Mi", "madre", "y", "padre"] },
      { text: "Tengo un hermano", tokens: ["Tengo", "un", "hermano", "abuelo"] }
    ]
  },
  {
    id: 'food',
    unitTitle: 'Food',
    words: [
      { id: 'a1_es_agua', native: 'Agua', english: 'Water', ipa: '/ˈa.ɣwa/', pron: 'Ah-gwah', tip: 'Aqua', ex: 'Bebo mucha agua.', ext: 'I drink a lot of water.' },
      { id: 'a1_es_pan', native: 'Pan', english: 'Bread', ipa: '/pan/', pron: 'Pahn', tip: 'Pan', ex: 'Como pan con queso.', ext: 'I eat bread with cheese.' },
      { id: 'a1_es_carne', native: 'Carne', english: 'Meat', ipa: '/ˈkaɾ.ne/', pron: 'Car-nay', tip: 'Carnivore', ex: 'No como carne.', ext: 'I do not eat meat.' },
      { id: 'a1_es_pescado', native: 'Pescado', english: 'Fish', ipa: '/pesˈka.ðo/', pron: 'Pes-cah-do', tip: 'Pescatarian', ex: 'El pescado es fresco.', ext: 'The fish is fresh.' },
      { id: 'a1_es_fruta', native: 'Fruta', english: 'Fruit', ipa: '/ˈfɾu.ta/', pron: 'Froo-tah', tip: 'Fruit', ex: 'Me gusta la fruta.', ext: 'I like fruit.' }
    ],
    sentences: [
      { text: "Bebo agua fría", tokens: ["Bebo", "agua", "fría", "caliente"] },
      { text: "Como pan y fruta", tokens: ["Como", "pan", "y", "fruta"] }
    ]
  },
  {
    id: 'travel',
    unitTitle: 'Travel',
    words: [
      { id: 'a1_es_hotel', native: 'Hotel', english: 'Hotel', ipa: '/oˈtel/', pron: 'Oh-tell', tip: 'H is silent.', ex: 'El hotel es grande.', ext: 'The hotel is big.' },
      { id: 'a1_es_aeropuerto', native: 'Aeropuerto', english: 'Airport', ipa: '/a.e.ɾoˈpweɾ.to/', pron: 'Ah-eh-ro-pwer-to', tip: 'Aero-port', ex: 'Vamos al aeropuerto.', ext: 'We are going to the airport.' },
      { id: 'a1_es_maleta', native: 'Maleta', english: 'Suitcase', ipa: '/maˈle.ta/', pron: 'Mah-leh-tah', tip: 'Mallet', ex: 'Tengo mi maleta.', ext: 'I have my suitcase.' },
      { id: 'a1_es_boleto', native: 'Boleto', english: 'Ticket', ipa: '/boˈle.to/', pron: 'Bo-leh-to', tip: 'Ticket', ex: 'Compro un boleto.', ext: 'I buy a ticket.' },
      { id: 'a1_es_playa', native: 'Playa', english: 'Beach', ipa: '/ˈpla.ʝa/', pron: 'Plah-yah', tip: 'Play at the beach', ex: 'Me encanta la playa.', ext: 'I love the beach.' }
    ],
    sentences: [
      { text: "Voy al hotel", tokens: ["Voy", "al", "hotel", "aeropuerto"] },
      { text: "Tengo mi boleto", tokens: ["Tengo", "mi", "boleto", "maleta"] }
    ]
  },
  {
    id: 'time',
    unitTitle: 'Time & Days',
    words: [
      { id: 'a1_es_hoy', native: 'Hoy', english: 'Today', ipa: '/oj/', pron: 'Oy', tip: 'H is silent.', ex: 'Hoy hace sol.', ext: 'Today is sunny.' },
      { id: 'a1_es_manana', native: 'Mañana', english: 'Tomorrow', ipa: '/maˈɲa.na/', pron: 'Mah-nyah-nah', tip: 'Manana', ex: 'Hasta mañana.', ext: 'See you tomorrow.' },
      { id: 'a1_es_hora', native: 'Hora', english: 'Hour/Time', ipa: '/ˈo.ɾa/', pron: 'Oh-rah', tip: 'Hour', ex: '¿Qué hora es?', ext: 'What time is it?' },
      { id: 'a1_es_semana', native: 'Semana', english: 'Week', ipa: '/seˈma.na/', pron: 'Seh-mah-nah', tip: 'Seven', ex: 'La próxima semana.', ext: 'Next week.' },
      { id: 'a1_es_lunes', native: 'Lunes', english: 'Monday', ipa: '/ˈlu.nes/', pron: 'Loo-nes', tip: 'Lunar', ex: 'Trabajo el lunes.', ext: 'I work on Monday.' }
    ],
    sentences: [
      { text: "Hoy es lunes", tokens: ["Hoy", "es", "lunes", "mañana"] },
      { text: "¿Qué hora es?", tokens: ["¿Qué", "hora", "es?", "día"] }
    ]
  }
];

module.exports = { spanishUnits };
