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
            document.getElementById("butter-knife-btn").innerHTML = `<svg style="width:20px;height:20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.73,15L9.83,21.76C10.53,21.91 11.25,22 12,22C14.4,22 16.6,21.15 18.32,19.75L14.66,13.4M2.46,15C3.38,17.92 5.61,20.26 8.45,21.34L12.12,15M8.54,12L4.64,5.25C3,7 2,9.39 2,12C2,12.68 2.07,13.35 2.2,14H9.69M21.8,10H14.31L14.6,10.5L19.36,18.75C21,16.97 22,14.6 22,12C22,11.31 21.93,10.64 21.8,10M21.54,9C20.62,6.07 18.39,3.74 15.55,2.66L11.88,9M9.4,10.5L14.17,2.24C13.47,2.09 12.75,2 12,2C9.6,2 7.4,2.84 5.68,4.25L9.34,10.6L9.4,10.5Z" />
                </svg>`;
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

        // 先暫放在「作品簡介」區
        document.getElementsByClassName('data_intro')[0].appendChild(canvaDL);
    }

    // 等解析度按鈕出現，代表開始播放正片
    waitForElm('#resButton').then((elm) => {
        console.log('[奶油刀] resButton is ready');
        // 此時開始初始化
        init();
    });

    console.log('[奶油刀] content.js loaded.');
})();
