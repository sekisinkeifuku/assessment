(function() {
    'use strict';

    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');

    /**
     * 指定した要素の子供を全て削除する
     * @param {HTMLElement} element HTMLの要素 
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    userNameInput.onkeydown =(event) => {
        if (event.key === 'Enter') {
            assessmentButton.onclick();
        }
    };

    assessmentButton.onclick = () => {
        const username = userNameInput.value;

        if (username.length === 0) {
            return;
        }

        //診断結果表示エリアのクリア(子供の要素がある限りすべて削除)
        removeAllChildren(resultDivided);
        
        //診断結果表示エリアの作成
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        //診断結果answers文言表示エリア
        const paragraph = document.createElement('p');
        const result = assessment(username);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //tweetエリアのクリア（子供の要素がある限りすべて削除）
        removeAllChildren(tweetDivided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';

        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.innerText = 'Tweet #あなたのいいところ';

        tweetDivided.appendChild(anchor);

        twttr.widgets.load();

    };

    const answers = [
        '{username}のいいところは声です。{username}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{username}のいいところはまなざしです。{username}に見つめられた人は、気になって仕方がないでしょう。',
        '{username}のいいところは情熱です。{username}の情熱に周りの人は感化させられます。',
        '{username}のいいところは厳しさです。{username}の厳しさが物事をいつも成功に導きます。',
        '{username}のいいところは知識す。博識な{username}を多くの人が頼りにしています。',
        '{username}のいいところはユニークさです。{username}だけのその特徴がみんなを楽しくさせます。',
        '{username}のいいところは用心深さです。{username}の洞察に、多くの人が助けられます。',
        '{username}のいいところは見た目です。内側からあふれ出る{username}の良さに皆が気を惹かれます。',
        '{username}のいいところは決断力です。{username}がする決断にいつも助けられる人がいます。',
        '{username}のいいところは思いやりです。{username}に気をかけてもらったこと多くの人が感謝しています。',
        '{username}のいいところは感受性です。{username}が感じたことにみんなが共感し、わかりあうことができます。',
        '{username}のいいところは節度です。強引すぎない{username}の考えに皆が感謝しています。',
        '{username}のいいところは好奇心です。新しいことに向かっていく{username}の心構えが多くの人に魅力的に映ります。',
        '{username}のいいところは気配りです。{username}の配慮が多くの人を救っています。',
        '{username}のいいところはその全てです。ありのままの{username}自身がいいところなのです。',
        '{username}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{username}がみんなから評価されています。'
    ];

    /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} username ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(username) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;

        for (let i = 0; i < username.length; i++) {
            sumOfcharCode = sumOfcharCode + username.charCodeAt(i);
        }

        //文字コード番号の合計を回答の数で割って添え字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/\{username\}/g, username);
        return result;
    }

    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
