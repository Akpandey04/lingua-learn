const fs = require('fs');
const path = require('path');
const { makeWord, makeGrammar, makeUnit, makeLesson, makeDialogueLine } = require('./utils');

const unitsData = [
  {
    id: 'unit-01-meeting-people', title: 'Meeting People',
    vocab: [
      ['greeting_hello', 'Bonjour', 'Hello / Good morning', '/bɔ̃ʒuʁ/', 'Bon-zhoor', 'Bonjour Marie !', 'Hello Marie!', 'Think: Bon=Good, Jour=Day'],
      ['greeting_hi', 'Salut', 'Hi / Bye (informal)', '/saly/', 'Sah-loo', 'Salut Paul !', 'Hi Paul!', 'Sounds like Salute'],
      ['greeting_evening', 'Bonsoir', 'Good evening', '/bɔ̃swaʁ/', 'Bon-swahr', 'Bonsoir monsieur.', 'Good evening sir.', 'Think: Soir sounds like swirl'],
      ['greeting_night', 'Bonne nuit', 'Good night', '/bɔn nɥi/', 'Bun nwee', 'Bonne nuit.', 'Good night.', 'Nuit looks like Night'],
      ['greeting_goodbye', 'Au revoir', 'Goodbye', '/o ʁəvwaʁ/', 'Oh ruh-vwahr', 'Au revoir et merci !', 'Goodbye and thank you!', 'Literally means "To the re-seeing"'],
      ['basic_yes', 'Oui', 'Yes', '/wi/', 'Wee', 'Oui, s\'il vous plaît.', 'Yes, please.', 'Sounds exactly like "We"'],
      ['basic_no', 'Non', 'No', '/nɔ̃/', 'Noh(n)', 'Non, merci.', 'No, thank you.', 'Similar to "No"'],
      ['politeness_thanks', 'Merci', 'Thank you', '/mɛʁsi/', 'Mare-see', 'Merci beaucoup !', 'Thank you very much!', 'Showing "mercy" and thanking them']
    ]
  },
  {
    id: 'unit-02-numbers', title: 'Numbers (1-10)',
    vocab: [
      ['num_1', 'Un', 'One', '/œ̃/', 'Uhn', 'Un café.', 'One coffee.', 'Looks like Un in English'],
      ['num_2', 'Deux', 'Two', '/dø/', 'Duh', 'Deux thés.', 'Two teas.', 'Starts with d like dual'],
      ['num_3', 'Trois', 'Three', '/tʁwa/', 'Trwah', 'Trois amis.', 'Three friends.', 'Starts with tr like three'],
      ['num_4', 'Quatre', 'Four', '/katʁ/', 'Kat-ruh', 'Quatre personnes.', 'Four people.', 'Think: Quarter'],
      ['num_5', 'Cinq', 'Five', '/sɛ̃k/', 'Sank', 'Cinq euros.', 'Five euros.', 'Sounds like sink'],
      ['num_6', 'Six', 'Six', '/sis/', 'Sees', 'Six jours.', 'Six days.', 'Spelled the same as English'],
      ['num_7', 'Sept', 'Seven', '/sɛt/', 'Set', 'Sept semaines.', 'Seven weeks.', 'Starts with s like seven'],
      ['num_8', 'Huit', 'Eight', '/ɥit/', 'Weet', 'Huit heures.', 'Eight hours.', 'Looks different, memorize!'],
      ['num_9', 'Neuf', 'Nine', '/nœf/', 'Nuhf', 'Neuf mois.', 'Nine months.', 'Sounds like enough'],
      ['num_10', 'Dix', 'Ten', '/dis/', 'Dees', 'Dix ans.', 'Ten years.', 'Starts with d like deca']
    ]
  },
  {
    id: 'unit-03-colors', title: 'Colors',
    vocab: [
      ['color_red', 'Rouge', 'Red', '/ʁuʒ/', 'Roozh', 'Le vin rouge.', 'The red wine.', 'Think: Rouge makeup is red'],
      ['color_blue', 'Bleu', 'Blue', '/blø/', 'Bluh', 'Le ciel bleu.', 'The blue sky.', 'Looks like Blue'],
      ['color_green', 'Vert', 'Green', '/vɛʁ/', 'Vair', 'Un thé vert.', 'A green tea.', 'Think: Vertical greens (trees)'],
      ['color_yellow', 'Jaune', 'Yellow', '/ʒon/', 'Zhohn', 'Le soleil jaune.', 'The yellow sun.', 'Think: Jaundice'],
      ['color_black', 'Noir', 'Black', '/nwaʁ/', 'Nwahr', 'Un chat noir.', 'A black cat.', 'Think: Film noir'],
      ['color_white', 'Blanc', 'White', '/blɑ̃/', 'Blahn', 'Le vin blanc.', 'The white wine.', 'Think: Blank page is white']
    ]
  },
  {
    id: 'unit-04-days', title: 'Days of the Week',
    vocab: [
      ['day_monday', 'Lundi', 'Monday', '/lœ̃di/', 'Luhn-dee', 'Lundi matin.', 'Monday morning.', 'Think: Lunar day'],
      ['day_tuesday', 'Mardi', 'Tuesday', '/maʁdi/', 'Mahr-dee', 'Mardi soir.', 'Tuesday evening.', 'Think: Mardi Gras (Fat Tuesday)'],
      ['day_wednesday', 'Mercredi', 'Wednesday', '/mɛʁkʁədi/', 'Mair-kruh-dee', 'Mercredi.', 'Wednesday.', 'Think: Mercury day'],
      ['day_thursday', 'Jeudi', 'Thursday', '/ʒødi/', 'Zhuh-dee', 'Jeudi.', 'Thursday.', 'Think: Jupiter day'],
      ['day_friday', 'Vendredi', 'Friday', '/vɑ̃dʁədi/', 'Vahn-druh-dee', 'Vendredi.', 'Friday.', 'Think: Venus day'],
      ['day_saturday', 'Samedi', 'Saturday', '/samdi/', 'Sahm-dee', 'Samedi.', 'Saturday.', 'Think: Saturn day'],
      ['day_sunday', 'Dimanche', 'Sunday', '/dimɑ̃ʃ/', 'Dee-mahnsh', 'Dimanche.', 'Sunday.', 'Ends in "che"']
    ]
  },
  {
    id: 'unit-05-family', title: 'Family',
    vocab: [
      ['fam_mother', 'Mère', 'Mother', '/mɛʁ/', 'Mair', 'Ma mère.', 'My mother.', 'Sounds like Mare'],
      ['fam_father', 'Père', 'Father', '/pɛʁ/', 'Pair', 'Mon père.', 'My father.', 'Sounds like Pair'],
      ['fam_brother', 'Frère', 'Brother', '/fʁɛʁ/', 'Frair', 'Mon frère.', 'My brother.', 'Think: Fraternity'],
      ['fam_sister', 'Sœur', 'Sister', '/sœʁ/', 'Suhr', 'Ma sœur.', 'My sister.', 'Think: Sorority'],
      ['fam_family', 'Famille', 'Family', '/famij/', 'Fah-mee', 'La famille.', 'The family.', 'Looks like family']
    ]
  },
  {
    id: 'unit-06-food', title: 'Food & Dining',
    vocab: [
      ['food_bread', 'Pain', 'Bread', '/pɛ̃/', 'Pahn', 'Du pain.', 'Some bread.', 'Think: Pan'],
      ['food_cheese', 'Fromage', 'Cheese', '/fʁɔmaʒ/', 'Fro-mahozh', 'Du fromage.', 'Some cheese.', 'Famous French food'],
      ['food_water', 'Eau', 'Water', '/o/', 'Oh', 'De l\'eau.', 'Some water.', 'Think: Eau de toilette (water)'],
      ['food_coffee', 'Café', 'Coffee', '/kafe/', 'Kah-fay', 'Un café.', 'A coffee.', 'Looks like Cafe'],
      ['food_eat', 'Manger', 'To eat', '/mɑ̃ʒe/', 'Mahn-zhay', 'Je veux manger.', 'I want to eat.', 'Think: Blancmange']
    ]
  }
];

const allConcepts = [];
const allLessons = [];
const allUnits = [];

let unitOrder = 1;

unitsData.forEach(ud => {
  const unitConcepts = ud.vocab.map(v => makeWord(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7]));
  allConcepts.push(...unitConcepts);
  
  const lessonObj = makeLesson(
    `lesson-01-${ud.id.replace('unit-', '')}`,
    ud.id,
    ud.title + " - Basics",
    'learning',
    [`Learn ${ud.title.toLowerCase()} vocabulary`],
    unitConcepts,
    null,
    [],
    [
      { type: 'mcq', question: `Translate: ${unitConcepts[0].englishMeaning}`, answer: unitConcepts[0].nativeWord || unitConcepts[0].native, options: unitConcepts.map(c => c.nativeWord || c.native).slice(0,4) }
    ]
  );
  
  allLessons.push(lessonObj);
  
  allUnits.push(makeUnit(
    ud.id,
    ud.title,
    [`Master ${ud.title.toLowerCase()}`],
    unitConcepts.map(c => c.id),
    [ { id: lessonObj.id, title: lessonObj.title, type: 'learning', conceptIds: unitConcepts.map(c => c.id) } ]
  ));
  
  unitOrder++;
});

// Generate the files
unitsData.forEach(ud => {
  const filePath = path.join(__dirname, 'a1-units', `${ud.id}.js`);
  const fileContent = `
    module.exports = {
      unit: ${JSON.stringify(allUnits.find(u => u.id === ud.id), null, 2)},
      concepts: ${JSON.stringify(allConcepts.filter(c => ud.vocab.map(v=>v[0]).includes(c.id)), null, 2)},
      lessons: ${JSON.stringify(allLessons.filter(l => l.unitId === ud.id), null, 2)}
    };
  `;
  fs.writeFileSync(filePath, fileContent);
});

console.log("Generated A1 units base content!");
