(() => {
    /**
     * 初始化：加入按鈕和快捷鍵
     *
     * @return void
     */
    function init() {
        console.log('[奶油刀] init')

        const animeTitle = document.getElementsByTagName("h1")[0].textContent;  // 網頁上原始動畫標題
        const filenamePrefix = animeTitle.replace(/ \[[^}]*\]/,'') + getEpisode(animeTitle);  // 截圖檔名前半（動畫名稱+話數資訊）
        console.log("[奶油刀] 存檔名稱（未加時間戳）為：" + filenamePrefix)

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (event) => {
            // 119 => F8
            if (event.keyCode !== 119) return;
            // TODO: 截圖
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
            // TODO: 註冊按鈕事件以截圖
        } catch (error) {
            console.warn("[奶油刀] 無法注入控制器圖示");
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
     * Wait for element appear.
     * https://stackoverflow.com/a/61511955
     */
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    // 等解析度按鈕出現，代表開始播放正片
    waitForElm('#resButton').then((elm) => {
        console.log('[奶油刀] resButton is ready');
        // 此時開始初始化
        init();
    });

    console.log('[奶油刀] content.js loaded.');
})();
