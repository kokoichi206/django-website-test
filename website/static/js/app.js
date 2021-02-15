
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

let score = 0;
let quizIndex = 0;

// 何回このゲームするか
const quizLength = 5;

// HTMLのオブジェクトを取ってくる場合には$を入れる
const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;

// 後で他の関数でも使いたくて、globalにしておく
let NameJa = 'brabra';
let ansNumOfMembers = -1
// クイズの問題文、選択肢を定義
const createAnswers = () => {
     let answers = [];
     ansNumOfMembers = Math.floor(Math.random()*memberNames.length);
     answers.push(ansNumOfMembers)

     let AnserName = memberNames[ansNumOfMembers];
     let nameEn = AnserName[0];
     NameJa = AnserName[1];
     let picSrc = 'https://koko-django-website.herokuapp.com/static/Picture/' + nameEn +'.jpeg';
     console.log(document.getElementById('picture').src);
     console.log(picSrc);
     document.getElementById('picture').src = picSrc;
    console.log(document.getElementById('picture').src);
     // 残りの3つの答えを生成
     while(answers.length < 4){
          let candNumOfMembers = Math.floor(Math.random()*memberNames.length);
          if(answers.includes(candNumOfMembers)){
               
          } else {
          let candNumOfMembers = Math.floor(Math.random()*memberNames.length);
               answers.push(candNumOfMembers);
          }
     }

     // 今、答えが0番目で固定なので、ランダムに並び変える
     // 0から3までの乱数を生成
     let ansewerIndex = Math.floor( Math.random() * 4 );
     let tmp = answers[ansewerIndex];
     answers[0] = tmp
     answers[ansewerIndex] = ansNumOfMembers

     let tmpIndex = 0;
     while(tmpIndex < buttonLength){
          $button[tmpIndex].textContent = memberNames[answers[tmpIndex]][1];
          tmpIndex++;
     }
};

createAnswers();


const clickHandler = (e) => {

     if(memberNames[ansNumOfMembers][1] === e.target.textContent){
          window.alert('正解');
          score++;
     } else {
          window.alert('不正解: 正解は' + memberNames[ansNumOfMembers][1] + 'です。');
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
