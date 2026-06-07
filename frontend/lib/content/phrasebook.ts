/**
 * Пиньинь + произнесение русскими буквами (приближённо, для туриста).
 */

export type PhraseRow = {
  ru: string;
  zh: string;
  pinyin: string;
  /** Как произнести по-русски (транскрипция). */
  transcriptionRu: string;
  note?: string;
};

export const PHRASE_ROWS: PhraseRow[] = [
  {
    ru: "Здравствуйте",
    zh: "你好",
    pinyin: "nǐ hǎo",
    transcriptionRu: "ни ха́о",
    note: "универсальное приветствие",
  },
  { ru: "Спасибо", zh: "谢谢", pinyin: "xièxie", transcriptionRu: "сьесиэ́" },
  {
    ru: "Пожалуйста (в ответ на спасибо)",
    zh: "不客气",
    pinyin: "bú kèqi",
    transcriptionRu: "бу́ кэчи́",
  },
  { ru: "Извините", zh: "对不起", pinyin: "duìbuqǐ", transcriptionRu: "дуйбуци́" },
  {
    ru: "Сколько это стоит?",
    zh: "多少钱？",
    pinyin: "duōshao qián?",
    transcriptionRu: "дуоша́о ця́нь?",
  },
  {
    ru: "Где …?",
    zh: "…在哪里？",
    pinyin: "… zài nǎli?",
    transcriptionRu: "… цзай на́ли?",
  },
  { ru: "Я не понимаю", zh: "我不懂", pinyin: "wǒ bù dǒng", transcriptionRu: "во́ бу до́н" },
  {
    ru: "Есть меню на английском?",
    zh: "有英文菜单吗？",
    pinyin: "yǒu Yīngwén càidān ma?",
    transcriptionRu: "ю́ ин-вэнь цайда́нь ма?",
  },
  {
    ru: "Вода (без газа)",
    zh: "矿泉水",
    pinyin: "kuàngquánshuǐ",
    transcriptionRu: "куа́н-цюань-шуй",
    note: "часто так называют бутилированную воду",
  },
  { ru: "Счёт, пожалуйста", zh: "买单", pinyin: "mǎidān", transcriptionRu: "ма́йда́нь" },
  {
    ru: "Туалет",
    zh: "洗手间在哪里？",
    pinyin: "xǐshǒujiān zài nǎli?",
    transcriptionRu: "сишо́цзянь цзай на́ли?",
    note: "где туалет",
  },
  {
    ru: "Помогите!",
    zh: "救命！",
    pinyin: "jiùmìng!",
    transcriptionRu: "цзю̀ми́н!",
    note: "в экстренной ситуации",
  },
  { ru: "До свидания", zh: "再见", pinyin: "zàijiàn", transcriptionRu: "цзайцзя̀н" },
];
