const japaneseUnits = [
  {
    id: 'meeting',
    unitTitle: 'Greetings',
    words: [
      { id: 'a1_ja_konnichiwa', native: 'こんにちは', english: 'Hello', ipa: 'konnichiwa', pron: 'Konnichiwa', tip: 'Daytime greeting', ex: 'こんにちは。', ext: 'Hello.' },
      { id: 'a1_ja_ohayou', native: 'おはよう', english: 'Good morning', ipa: 'ohayou', pron: 'Ohayou', tip: 'Morning greeting', ex: 'おはようございます。', ext: 'Good morning.' },
      { id: 'a1_ja_arigatou', native: 'ありがとう', english: 'Thank you', ipa: 'arigatou', pron: 'Arigatou', tip: 'Thanks', ex: 'ありがとうございます。', ext: 'Thank you very much.' },
      { id: 'a1_ja_sumimasen', native: 'すみません', english: 'Excuse me / Sorry', ipa: 'sumimasen', pron: 'Sumimasen', tip: 'Useful for apologizing or getting attention', ex: 'すみません。', ext: 'Excuse me.' },
      { id: 'a1_ja_sayounara', native: 'さようなら', english: 'Goodbye', ipa: 'sayounara', pron: 'Sayounara', tip: 'Farewell', ex: 'さようなら。', ext: 'Goodbye.' }
    ],
    sentences: [
      { text: "おはようございます", tokens: ["おはよう", "ござい", "ます"] },
      { text: "ありがとうございます", tokens: ["ありがとう", "ござい", "ます"] }
    ]
  },
  {
    id: 'numbers',
    unitTitle: 'Numbers',
    words: [
      { id: 'a1_ja_ichi', native: '一', english: 'One', ipa: 'ichi', pron: 'Ichi', tip: 'Number 1', ex: '一つ。', ext: 'One thing.' },
      { id: 'a1_ja_ni', native: '二', english: 'Two', ipa: 'ni', pron: 'Ni', tip: 'Number 2', ex: '二つ。', ext: 'Two things.' },
      { id: 'a1_ja_san', native: '三', english: 'Three', ipa: 'san', pron: 'San', tip: 'Number 3', ex: '三つ。', ext: 'Three things.' },
      { id: 'a1_ja_yon', native: '四', english: 'Four', ipa: 'yon', pron: 'Yon', tip: 'Number 4', ex: '四つ。', ext: 'Four things.' },
      { id: 'a1_ja_go', native: '五', english: 'Five', ipa: 'go', pron: 'Go', tip: 'Number 5', ex: '五つ。', ext: 'Five things.' }
    ],
    sentences: [
      { text: "一、二、三", tokens: ["一、", "二、", "三", "四"] },
      { text: "四と五", tokens: ["四", "と", "五", "一"] }
    ]
  },
  {
    id: 'basics',
    unitTitle: 'Basic Verbs',
    words: [
      { id: 'a1_ja_taberu', native: '食べる', english: 'To eat', ipa: 'taberu', pron: 'Taberu', tip: 'Eating', ex: '寿司を食べる。', ext: 'I eat sushi.' },
      { id: 'a1_ja_nomu', native: '飲む', english: 'To drink', ipa: 'nomu', pron: 'Nomu', tip: 'Drinking', ex: '水を飲む。', ext: 'I drink water.' },
      { id: 'a1_ja_miru', native: '見る', english: 'To see / watch', ipa: 'miru', pron: 'Miru', tip: 'Seeing', ex: 'テレビを見る。', ext: 'I watch TV.' },
      { id: 'a1_ja_kiku', native: '聞く', english: 'To listen / ask', ipa: 'kiku', pron: 'Kiku', tip: 'Listening', ex: '音楽を聞く。', ext: 'I listen to music.' },
      { id: 'a1_ja_iku', native: '行く', english: 'To go', ipa: 'iku', pron: 'Iku', tip: 'Going', ex: '学校へ行く。', ext: 'I go to school.' }
    ],
    sentences: [
      { text: "寿司を食べる", tokens: ["寿司", "を", "食べる", "飲む"] },
      { text: "学校へ行く", tokens: ["学校", "へ", "行く", "見る"] }
    ]
  },
  {
    id: 'family',
    unitTitle: 'Family',
    words: [
      { id: 'a1_ja_haha', native: '母', english: 'Mother (my)', ipa: 'haha', pron: 'Haha', tip: 'My mom', ex: '母は優しい。', ext: 'My mother is kind.' },
      { id: 'a1_ja_chichi', native: '父', english: 'Father (my)', ipa: 'chichi', pron: 'Chichi', tip: 'My dad', ex: '父は忙しい。', ext: 'My father is busy.' },
      { id: 'a1_ja_ane', native: '姉', english: 'Older sister (my)', ipa: 'ane', pron: 'Ane', tip: 'My older sister', ex: '姉は学生です。', ext: 'My older sister is a student.' },
      { id: 'a1_ja_ani', native: '兄', english: 'Older brother (my)', ipa: 'ani', pron: 'Ani', tip: 'My older brother', ex: '兄は会社員です。', ext: 'My older brother is an office worker.' },
      { id: 'a1_ja_imouto', native: '妹', english: 'Younger sister (my)', ipa: 'imouto', pron: 'Imouto', tip: 'My younger sister', ex: '妹は可愛いです。', ext: 'My younger sister is cute.' }
    ],
    sentences: [
      { text: "母と父", tokens: ["母", "と", "父"] },
      { text: "姉と兄", tokens: ["姉", "と", "兄", "妹"] }
    ]
  },
  {
    id: 'food',
    unitTitle: 'Food',
    words: [
      { id: 'a1_ja_mizu', native: '水', english: 'Water', ipa: 'mizu', pron: 'Mizu', tip: 'Water', ex: '水をください。', ext: 'Water, please.' },
      { id: 'a1_ja_gohan', native: 'ご飯', english: 'Rice / Meal', ipa: 'gohan', pron: 'Gohan', tip: 'Rice', ex: 'ご飯を食べる。', ext: 'I eat rice.' },
      { id: 'a1_ja_niku', native: '肉', english: 'Meat', ipa: 'niku', pron: 'Niku', tip: 'Meat', ex: '肉が好きです。', ext: 'I like meat.' },
      { id: 'a1_ja_sakana', native: '魚', english: 'Fish', ipa: 'sakana', pron: 'Sakana', tip: 'Fish', ex: '魚を食べます。', ext: 'I eat fish.' },
      { id: 'a1_ja_yasai', native: '野菜', english: 'Vegetable', ipa: 'yasai', pron: 'Yasai', tip: 'Vegetable', ex: '野菜は健康にいい。', ext: 'Vegetables are good for health.' }
    ],
    sentences: [
      { text: "水を飲む", tokens: ["水", "を", "飲む", "食べる"] },
      { text: "ご飯と肉", tokens: ["ご飯", "と", "肉", "野菜"] }
    ]
  },
  {
    id: 'travel',
    unitTitle: 'Travel',
    words: [
      { id: 'a1_ja_eki', native: '駅', english: 'Train station', ipa: 'eki', pron: 'Eki', tip: 'Station', ex: '駅はどこですか。', ext: 'Where is the station?' },
      { id: 'a1_ja_densha', native: '電車', english: 'Train', ipa: 'densha', pron: 'Densha', tip: 'Train', ex: '電車に乗る。', ext: 'I ride the train.' },
      { id: 'a1_ja_hikouki', native: '飛行機', english: 'Airplane', ipa: 'hikouki', pron: 'Hikouki', tip: 'Airplane', ex: '飛行機で行く。', ext: 'I go by airplane.' },
      { id: 'a1_ja_kippu', native: '切符', english: 'Ticket', ipa: 'kippu', pron: 'Kippu', tip: 'Ticket', ex: '切符を買う。', ext: 'I buy a ticket.' },
      { id: 'a1_ja_umi', native: '海', english: 'Sea / Ocean', ipa: 'umi', pron: 'Umi', tip: 'Sea', ex: '海に行きたい。', ext: 'I want to go to the sea.' }
    ],
    sentences: [
      { text: "駅はどこですか", tokens: ["駅", "は", "どこ", "ですか", "海"] },
      { text: "電車に乗る", tokens: ["電車", "に", "乗る", "飛行機"] }
    ]
  },
  {
    id: 'time',
    unitTitle: 'Time & Days',
    words: [
      { id: 'a1_ja_kyou', native: '今日', english: 'Today', ipa: 'kyou', pron: 'Kyou', tip: 'Today', ex: '今日は暑い。', ext: 'Today is hot.' },
      { id: 'a1_ja_ashita', native: '明日', english: 'Tomorrow', ipa: 'ashita', pron: 'Ashita', tip: 'Tomorrow', ex: '明日会おう。', ext: 'Let\'s meet tomorrow.' },
      { id: 'a1_ja_ima', native: '今', english: 'Now', ipa: 'ima', pron: 'Ima', tip: 'Now', ex: '今は何時ですか。', ext: 'What time is it now?' },
      { id: 'a1_ja_jikan', native: '時間', english: 'Time / Hour', ipa: 'jikan', pron: 'Jikan', tip: 'Time', ex: '時間がありません。', ext: 'I don\'t have time.' },
      { id: 'a1_ja_getsuyoubi', native: '月曜日', english: 'Monday', ipa: 'getsuyoubi', pron: 'Getsuyoubi', tip: 'Monday', ex: '月曜日に働く。', ext: 'I work on Monday.' }
    ],
    sentences: [
      { text: "今日は月曜日です", tokens: ["今日", "は", "月曜日", "です", "明日"] },
      { text: "今は何時ですか", tokens: ["今", "は", "何時", "ですか", "時間"] }
    ]
  }
];

module.exports = { japaneseUnits };
