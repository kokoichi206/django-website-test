
let src = document.getElementById('picture');
console.log(src);

let ansNumOfMembers = Math.floor(Math.random()*memberNames.length);
let AnserName = memberNames[ansNumOfMembers];
let nameEn = AnserName[0];
let NameJa = AnserName[1];
let picSrc = '{% static \'Picture/' + nameEn +'.jpeg\' %}';
console.log(picSrc);

