
const memberNames = [
     ["akimotomanatsu", "秋元 真夏"],
     ["ikutaerika", "生田 絵梨花"],
     ["itoujunna", "伊藤 純奈"],
     ["itouriria", "伊藤 理々杏"],
     ["iwamotorenka", "岩本 蓮加"],
     ["umezawaminami", "梅澤 美波"],
     ["oozonomomoko", "大園 桃子"],
     ["kitanohinako", "北野 日奈子"],
     ["kuboshiori", "久保 史緒里"],
     ["saitouasuka", "齋藤 飛鳥"],
     ["sakaguchitamami", "阪口 珠美"],
     ["satoukaede", "佐藤 楓"],
     ["shinuchimai", "新内 眞衣"],
     ["suzukiayane", "鈴木 絢音"],
     ["takayamakazumi", "高山 一実"],
     ["teradaranze", "寺田 蘭世"],
     ["nakamurareno", "中村 麗乃"],
     ["higuchihina", "樋口 日奈"],
     ["hoshinominami", "星野 みなみ"],
     ["horimiona", "堀 未央奈"],
     ["matsumurasayuri", "松村 沙友理"],
     ["mukaihazuki", "向井 葉月"],
     ["yamazakirena", "山崎 怜奈"],
     ["yamashitamizuki", "山下 美月"],
     ["yoshidaayanochristie", "吉田 綾乃クリスティー"],
     ["yodayuuki", "与田 祐希"],
     ["watanabemiria", "渡辺 みり愛"],
     ["wadamaaya", "和田 まあや"],
     ["endousakura", "遠藤 さくら"],
     ["kakiharuka", "賀喜 遥香"],
     ["kakehashisayaka", "掛橋 沙耶香"],
     ["kanagawasaya", "金川 紗耶"],
     ["kitagawayuri", "北川 悠理"],
     ["kuromiharuka", "黒見 明香"],
     ["satourika", "佐藤 璃果"],
     ["shibatayuna", "柴田 柚菜"],
     ["seimiyarei", "清宮 レイ"],
     ["tamuramayu", "田村 真佑"],
     ["tsutsuiayame", "筒井 あやめ"],
     ["hayakawaseira", "早川 聖来"],
     ["hayashiruna", "林 瑠奈"],
     ["matsuomiyu", "松尾 美佑"],
     ["yakubomio", "矢久保 美緒"],
     ["yumikinao", "弓木 奈於"]      
];

let src = document.getElementById('picture');
console.log(src);

let ansNumOfMembers = Math.floor(Math.random()*memberNames.length);
let AnserName = memberNames[ansNumOfMembers];
let nameEn = AnserName[0];
let NameJa = AnserName[1];
let picSrc = '{% static \'Picture/' + nameEn +'.jpeg\' %}';
console.log(picSrc);

