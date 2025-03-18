// 変数ここで初期化
let typed = '';//タイプの変数
let untyped = '';//テキストの変数
let score = 0;//得点の変数
let typeCount = 0;  // 最初に0に初期化

// HTML要素取得コマンド
const typedfield = document.getElementById('typed');//タイプする機能
const start = document.getElementById('start');//スタート機能
const count = document.getElementById('count');//カウント機能
const numberElement = document.getElementById('number');  // タイプ数表示
const untypedfield = document.getElementById('untyped');//テキスト内容表示
const wrap = document.getElementById('wrap');//

// ココが問題として提示される
const textLists = [
  'Hello World','This is my Apple','How are you?',
  'Today is sunny','I love JavaScript!','Good morning♪',
  'I am Japanese','Let it be','Samurai','Geisya',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming','JavaScript','Java','HTML/CSS','WordPless',
  'Manekkosan',
];

// ランダムに表示させる
const createText = () => {
  typed = '';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;// ここで間違いなく設定
};

// キー入力判定
const keyPress = e => {
  if (e.key === untyped.substring(0, 1)) {
    typeCount++;
    numberElement.textContent = typeCount;  // DOMを更新
      wrap.classList.add('mistyped');
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  score++;
  typeCount++; // タイプ数を増やしていく
  typeCounter.textContent = 'タイプ数: ' + typeCount; // HTML反映

  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  if (untyped === '') {
    createText();
  }
};

// スキルランク判定結果一覧
const rankCheck = score => {
  let text = '';
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if (score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if (score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//タイプ成功数をカウント
numberElement.textContent = typeCount;

// ゲーム終了
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  if (result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  let time = count.textContent;

  const id = setInterval(() => {
    time--;
    count.textContent = time;

    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート
start.addEventListener('click', () => {//クリックスタート
  timer();
  createText();
  start.style.display = 'none';
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';

console.log(`typeCount: ${typeCount}`);
console.log(`current untyped: ${untyped}`);