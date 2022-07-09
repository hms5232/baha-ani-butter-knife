(() => {
    /**
     * 初始化：加入按鈕和快捷鍵
     *
     * @return void
     */
    function init() {
        console.log('[奶油刀] init');

        const animeTitle = document.getElementsByTagName("h1")[0].textContent;  // 網頁上原始動畫標題
        const filenamePrefix = animeTitle.replace(/ \[[^}]*\]/,'') + getEpisode(animeTitle);  // 截圖檔名前半（動畫名稱+話數資訊）
        console.log("[奶油刀] 存檔名稱（未加時間戳）為：" + filenamePrefix);

        // 製作相簿區
        let album = document.createElement('div');
        album.setAttribute('id', 'butter-knife-album');
        album.setAttribute('class', 'butter-knife');
        album.setAttribute('style', 'margin-bottom:10px');
        document.getElementsByClassName('data_acgbox')[0].insertAdjacentElement('beforebegin', album);  // 插在「作品簡介」區前

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (event) => {
            // 119 => F8
            if (event.keyCode !== 119) return;
            getVideoShot(filenamePrefix);
        });

        // 插入按鈕
        try {
            let resolutionBtn = document.getElementById("resButton");  // 右邊調整解析度的按鈕
            let newBtn = document.createElement('button');
            newBtn.setAttribute("id", "butter-knife-btn");
            newBtn.setAttribute("title", "奶油刀截圖");
            newBtn.setAttribute('type', 'button');
            newBtn.setAttribute('class', 'butter-knife vjs-control vjs-show-tip');
            resolutionBtn.insertAdjacentElement("afterend", newBtn);
            document.getElementById("butter-knife-btn").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ri" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4.342 1.408L22.373 19.44a1.5 1.5 0 0 1-2.121 2.122l-4.596-4.597L12.12 20.5L8 16.38V19a1 1 0 0 1-2 0v-4a1 1 0 0 0-1.993-.117L4 15v1a1 1 0 0 1-2 0V7.214a7.976 7.976 0 0 1 2.168-5.627l.174-.179zm.241 3.07l-.051.11a5.993 5.993 0 0 0-.522 2.103L4 7l-.001.12a5.984 5.984 0 0 0 1.58 4.003l.177.185l6.363 6.363l2.829-2.828L4.583 4.478z"></path></svg>`;
            document.getElementById("butter-knife-btn").addEventListener('click', (event) => {
                getVideoShot(filenamePrefix);
            });
        } catch (error) {
            console.warn("[奶油刀] 無法注入控制器圖示" + '\n' + error);
        }
    }

    /**
     * 取得話數資訊，如果有需要的話順便補零
     * 
     * @param title 網頁上的動畫標題（包含話資訊）
     * @return string
     */
    function getEpisode(title) {
        const episodeName = title.match(/ \[(.+?)\]/g).at('-1').replace(' [', '').replace(']', '');  // 真正的話數或集數
        return isNaN(episodeName) ? episodeName : String(episodeName).padStart(2, '0');
    }

    /**
     * 取得影片截圖
     *
     * @param string filenamePrefix 檔名前綴
     * @return void
     */
    function getVideoShot(filenamePrefix) {
        const video = document.querySelector('#ani_video_html5_api');
        const origin_ct = document.getElementsByClassName('vjs-current-time-display')[0].textContent;  // 播放器上的時間
        const ct = origin_ct.replace(':', '').padStart(4, '0');
        let filename = filenamePrefix + ct;
        console.log("[奶油刀] 截圖：" + filename);

        // 繪製
        let canva = document.createElement("canvas");
        canva.setAttribute("id", "butter-knife-shot-" + Date.now());  // 取當下時間戳作唯一值
        canva.setAttribute("class", "butter-knife-shot");
        canva.setAttribute("width", video.videoWidth);
        canva.setAttribute("height", video.videoHeight);
        let shot = canva.getContext('2d');
        shot.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // 套上連結，點擊即可下載
        let canvaDL = document.createElement("a");
        canvaDL.id = "butter-knife-shot";
        canvaDL.download = filename;
        canvaDL.title = filename;
        canvaDL.href = canva.toDataURL();
        canvaDL.innerHTML = `<img src="${canva.toDataURL()}">`;

        // 放到相簿
        document.getElementById("butter-knife-album").appendChild(canvaDL);
    }

    // 等解析度按鈕出現，代表開始播放正片
    waitForElm('#resButton').then((elm) => {
        console.log('[奶油刀] resButton is ready');
        // 此時開始初始化
        init();
    });

    console.log('[奶油刀] butterKnife loaded.');
})();
