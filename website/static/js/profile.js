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
const memberProfiles = {'akimotomanatsu': {'生年月日': '1993年8月20日', '血液型': 'B型', '星座': 'しし座', '身長': '154cm'}, 'ikutaerika': {'生年月日': '1997年1月22日', '血液型': 'A型', '星座': 'みずがめ座', '身長': '160cm'}, 'itoujunna': {'生年月日': '1998年11月30日', '血液型': 'A型', '星座': 'いて座', '身長': '166cm'}, 'itouriria': {'生年月日': '2002年10月8日', '血液型': 'B型', '星座': 'てんびん座', '身長': '154cm'}, 'iwamotorenka': {'生年月日': '2004年2月2日', '血液型': 'B型', '星座': 'みずがめ座', '身長': '159cm'}, 'umezawaminami': {'生年月日': '1999年1月6日', '血液型': 'A型', '星座': 'やぎ座', '身長': '170cm'}, 'oozonomomoko': {'生年月日': '1999年9月13日', '血液型': 'O型', '星座': 'おとめ座', '身長': '156cm'}, 'kitanohinako': {'生年月日': '1996年7月17日', '血液型': 'O型', '星座': 'かに座', '身長': '158cm'}, 'kuboshiori': {'生年月日': '2001年7月14日', '血液型': 'O型', '星座': 'かに座', '身長': '161cm'}, 'saitouasuka': {'生年月日': '1998年8月10日', '血液型': 'O型', '星座': 'しし座', '身長': '158cm'}, 'sakaguchitamami': {'生年月日': '2001年11月10日', '血液型': 'A型', '星座': 'さそり座', '身長': '161cm'}, 'satoukaede': {'生年月日': '1998年3月23日', '血液型': 'A型', '星座': 'おひつじ座', '身長': '161cm'}, 'shinuchimai': {'生年月日': '1992年1月22日', '血液型': 'B型', '星座': 'みずがめ座', '身長': '165cm'}, 'suzukiayane': {'生年月日': '1999年3月5日', '血液型': 'O型', '星座': 'うお座', '身長': '161cm'}, 'takayamakazumi': {'生年月日': '1994年2月8日', '血液型': 'A型', '星座': 'みずがめ座', '身長': '162cm'}, 'teradaranze': {'生年月日': '1998年9月23日', '血液型': '不明', '星座': 'てんびん座', '身長': '155cm'}, 'nakamurareno': {'生年月日': '2001年9月27日', '血液型': '不明', '星座': 'てんびん座', '身長': '167cm'}, 'higuchihina': {'生年月日': '1998年1月31日', '血液型': 'A型', '星座': 'みずがめ座', '身長': '161cm'}, 'hoshinominami': {'生年月日': '1998年2月6日', '血液型': 'B型', '星座': 'みずがめ座', '身長': '155cm'}, 'horimiona': {'生年月日': '1996年10月15日', '血液型': 'O型', '星座': 'てんびん座', '身長': '162cm'}, 'matsumurasayuri': {'生年月日': '1992年8月27日', '血液型': 'B型', '星座': 'おとめ座', '身長': '164cm'}, 'mukaihazuki': {'生年月日': '1999年8月23日', '血液型': 'A型', '星座': 'おとめ座', '身長': '152cm'}, 'yamazakirena': {'生年月日': '1997年5月21日', '血液型': 'B型', '星座': 'ふたご座', '身長': '164cm'}, 'yamashitamizuki': {'生年月日': '1999年7月26日', '血液型': 'O型', '星座': 'しし座', '身長': '160cm'}, 'yoshidaayanochristie': {'生年月日': '1995年9月6日', '血液型': 'A型', '星座': 'おとめ座', '身長': '161cm'}, 'yodayuuki': {'生年月日': '2000年5月5日', '血液型': 'O型', '星座': 'おうし座', '身長': '153cm'}, 'watanabemiria': {'生年月日': '1999年11月1日', '血液型': 'O型', '星座': 'さそり座', '身長': '153cm'}, 'wadamaaya': {'生年月日': '1998年4月23日', '血液型': 'O型', '星座': 'おうし座', '身長': '161cm'}, 'endousakura': {'生年月日': '2001年10月3日', '血液型': '不明', '星座': 'てんびん座', '身長': '164cm'}, 'kakiharuka': {'生年月日': '2001年8月8日', '血液型': 'A型', '星座': 'しし座', '身長': '166cm'}, 'kakehashisayaka': {'生年月日': '2002年11月20日', '血液型': 'B型', '星座': 'さそり座', '身長': '154cm'}, 'kanagawasaya': {'生年月日': '2001年10月31日', '血液型': 'O型', '星座': 'さそり座', '身長': '165cm'}, 'kitagawayuri': {'生年月日': '2001年8月8日', '血液型': '不明', '星座': 'しし座', '身長': '165cm'}, 'kuromiharuka': {'生年月日': '2004年1月19日', '血液型': 'O型', '星座': 'やぎ座', '身長': '162cm'}, 'satourika': {'生年月日': '2001年8月9日', '血液型': 'B型', '星座': 'しし座', '身長': '160cm'}, 'shibatayuna': {'生年月日': '2003年3月3日', '血液型': 'A型', '星座': 'うお座', '身長': '160cm'}, 'seimiyarei': {'生年月日': '2003年8月1日', '血液型': 'O型', '星座': 'しし座', '身長': '164cm'}, 'tamuramayu': {'生年月日': '1999年1月12日', '血液型': 'A型', '星座': 'やぎ座', '身長': '160cm'}, 'tsutsuiayame': {'生年月日': '2004年6月8日', '血液型': 'O型', '星座': 'ふたご座', '身長': '160cm'}, 'hayakawaseira': {'生年月日': '2000年8月24日', '血液型': 'A型', '星座': 'おとめ座', '身長': '164cm'}, 'hayashiruna': {'生年月日': '2003年10月2日', '血液型': 'O型', '星座': 'てんびん座', '身長': '164cm'}, 'matsuomiyu': {'生年月日': '2004年1月3日', '血液型': 'O型', '星座': 'やぎ座', '身長': '167cm'}, 'yakubomio': {'生年月日': '2002年8月14日', '血液型': 'B型', '星座': 'しし座', '身長': '153cm'}, 'yumikinao': {'生年月日': '1999年2月3日', '血液型': 'A型', '星座': 'みずがめ座', '身長': '165cm'}};
const questions = ['生年月日', '身長'];

let score = 0;
let quizIndex = 0;

// 何回このゲームするか
const quizLength = 5;

// HTMLのオブジェクトを取ってくる場合には$を入れる
const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;
const $question = document.getElementById('js-question');

let ansNumOfMembers = -1

let Answer
// クイズの問題文、選択肢を定義
const createAnswers = () => {
     let answers = [];
     // questionsの中から質問したい項目をランダムで選ぶ
     questionTipe = questions[Math.floor(Math.random()*questions.length)];
     // 問題文として採用する人
     ansNumOfMembers = Math.floor(Math.random()*memberNames.length);

     answerNameEn = memberNames[ansNumOfMembers][0]
     $question.textContent = memberNames[ansNumOfMembers][1] + 'の' + questionTipe + 'は？';

     Answer = memberProfiles[answerNameEn][questionTipe];
     answers.push(Answer);

     // 残りの3つの答えを生成
     while(answers.length < 4){
          let candNumOfMembers = Math.floor(Math.random()*memberNames.length);
          candNameEn = memberNames[candNumOfMembers][0];
          cand = memberProfiles[candNameEn][questionTipe];
          if(answers.includes(cand)){
               
          } else {
               answers.push(cand);
          }
     }

     // 今、答えが0番目で固定なので、ランダムに並び変える
     // 0から3までの乱数を生成
     let ansewerIndex = Math.floor( Math.random() * 4 );
     let tmp = answers[ansewerIndex];
     answers[0] = tmp;
     answers[ansewerIndex] = Answer;

     let tmpIndex = 0;
     while(tmpIndex < buttonLength){
          $button[tmpIndex].textContent = answers[tmpIndex];
          tmpIndex++;
     }
};

createAnswers();


const clickHandler = (e) => {

     if(Answer === e.target.textContent){
          window.alert('正解');
          score++;
     } else {
          window.alert('不正解: 正解は' + Answer + 'です！');
     }

     quizIndex++;

     if(quizIndex < quizLength){
          createAnswers();
     } else {
          window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！');
     }
};

// ボタンをクリックしたら正誤判定
let handleIndex = 0;
while (handleIndex < buttonLength) {
     $button[handleIndex].addEventListener('click', (e) => {
          clickHandler(e);
     });
     handleIndex++;
}
