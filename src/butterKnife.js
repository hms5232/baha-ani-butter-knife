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
            document.getElementById("butter-knife-btn").innerHTML = `
                <svg version="1.1" id="a" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="24" height="24">
                <g fill="#fbf7e9">
                    <path d="M447.6,253.8c-2.5,6.9-6.6,12-14.2,13.2c-2.5,0.4-5.2,0.1-8.3,0.1c0,1.9,0,3.3,0,4.7c0,32.1,0.1,64.1,0,96.2
                        c-0.1,20.3-13.5,36.3-33.2,39.6c-2.7,0.5-5.5,0.5-8.2,0.5c-92.6,0-185.1,0-277.7,0c-24.9,0-41.6-16.6-41.6-41.5
                        c0-34.8-0.1-69.6,0-104.4c0-20.4,13.6-36.2,33.7-39.6c1.5-0.2,3-0.3,4.5-0.3c19.3,0,38.7,0,58,0c5.3,0,8.5,4.6,5.7,8.2
                        c-1.3,1.6-4.2,2.8-6.3,2.8c-13.3,0.3-26.7,0.1-40,0.1c-5.6,0-11.2-0.1-16.8,0c-14.9,0.3-27.3,12.3-27.4,27.2
                        c-0.2,36.3-0.2,72.6,0,108.9c0.1,14.7,12.1,27,26.6,27.1c24.3,0.3,48.7,0.1,73,0.1c0.5,0,1-0.1,1.9-0.3c0-1.5,0-2.9,0-4.4
                        c0-17.1,0-34.2,0-51.3c0-1.4-0.4-3.1,0.3-4c1.3-1.7,3.1-4,4.9-4.2c1.8-0.1,4.1,1.8,5.4,3.4c0.9,1,0.6,3.1,0.6,4.7
                        c0,17.1,0,34.2,0,51.3c0,1.5,0,2.9,0,4.6c7.6,0,14.8,0,22.3,0c0-32.3,0-64.5,0-97.3c-1.3,0.8-2.5,1.6-3.7,2.3
                        c-15.7,10.1-31.7,19.3-49.8,24.3c-10.1,2.8-19.5,2.3-27.7-5c-10.5-9.3-11.6-25.4-2.4-36c0.9-1,1.9-2,2.8-3
                        c56.7-56.7,113.5-113.4,170.1-170.2c6.6-6.7,14.3-9.5,23.4-7c15.1,4.1,21.3,22.3,12,34.9c-1.2,1.6-2.6,3-4,4.5
                        c-14.3,14.3-28.6,28.6-42.9,42.9c-1,1-2.1,1.7-3.4,2.7c8.3,9.7,10.9,20.4,8.5,32.6c1.8,0,3.3,0,4.7,0c37.6,0,75.1-0.1,112.7,0
                        c14.1,0,25.2,6.2,33.1,17.8c1.5,2.1,2.4,4.6,3.6,6.9C447.6,249.3,447.6,251.5,447.6,253.8z M413.9,267.2c-1.8,0-3.1,0-4.5,0
                        c-37.8,0-75.6,0-113.4,0c-10.2,0-15.5-3.9-18.7-13.7c-2.4-7.5-7-13.2-13.9-16.9c-18.6-10-41.1,3.6-41.2,25
                        c-0.2,44.1-0.1,88.3,0,132.4c0,0.8,0.2,1.7,0.3,2.8c1.3,0,2.4,0,3.5,0c52.8,0,105.5,0,158.3,0c17.7,0,29.6-11.9,29.6-29.5
                        c0-25.1,0-50.1,0-75.2C413.9,284,413.9,275.9,413.9,267.2z M252.9,174.9c-0.3,0.3-1,0.9-1.7,1.6c-37.9,37.9-75.8,75.8-113.7,113.7
                        c-0.7,0.7-1.4,1.4-2.1,2.2c-4,4.8-4.5,11.4-1.4,16.8c3,5.2,9,8.2,14.9,7c4.6-0.9,9.3-2.1,13.7-3.7c16.9-6.1,31.9-15.7,46.5-25.9
                        c1-0.7,1.7-2.7,1.8-4.1c0.2-6.9,0-13.7,0.1-20.6c0.3-22.7,17.3-39.5,40-39.6c9.2,0,18.5-0.1,27.7,0.1c2.6,0,3.6-1,4-3.2
                        c1.3-7.2,0.6-14.3-4.5-19.7C270.2,190.9,261.5,183.1,252.9,174.9z M279.7,233.5c3,6.1,6.1,12,8.7,18.1c1.4,3.2,3.6,4.4,6.9,4.4
                        c44.6,0,89.3,0,133.9-0.2c2.1,0,4.8-1.4,6.3-3c2-2.1,0.6-4.7-0.9-6.8c-5.9-8.3-13.8-12.6-24.1-12.6c-42.8,0-85.5,0-128.3,0
                        C281.2,233.5,280.1,233.5,279.7,233.5z M277.7,181.9c15.1-15.1,30.2-30.2,45.4-45.4c0.9-0.9,1.8-1.7,2.6-2.7
                        c2.3-2.9,3.4-6.1,2.5-9.8c-1-4.2-3.5-7.2-7.7-8.4c-4.4-1.3-8.3-0.2-11.6,3.1c-15.3,15.4-30.7,30.7-46,46c-0.4,0.4-0.7,0.9-0.9,1.2
                        C267.2,171.3,272.3,176.4,277.7,181.9z" fill="#fbf7e9"></path>
                    <path d="M318.1,341.5c-10.3,7.6-22,2.9-25.7-5.8c-0.9-2.2-1.3-4.8-1.3-7.2c0-3,2-4.8,5-5c2.8-0.2,4.7,1.2,5.7,3.9
                        c0.2,0.6,0.3,1.2,0.4,1.8c0.4,3,2,4.8,5.2,4.8c3.1,0,4.7-1.8,5.1-4.8c0.4-3.3,2-5.7,5.7-5.7c3.6,0,5.2,2.3,5.7,5.7
                        c0.4,2.9,2,4.9,5.2,4.8c3.1,0,4.6-1.8,5.2-4.8c0.8-4.2,3.1-6.2,6.4-5.8c3.4,0.4,5.1,3.2,4.7,7.6c-1.1,11.1-14,17.8-24,12.4
                        C320.2,342.9,319.2,342.2,318.1,341.5z" fill="#fbf7e9"></path>
                    <path d="M384.8,322c0,3.6-1.8,6-5,6.4c-3,0.3-5.6-1.7-6.1-5.2c-0.5-3-1.7-5-4.9-5c-3.3,0-4.3,2.3-4.9,5.1c-0.7,3.6-3.1,5.5-6.2,5.1
                        c-2.9-0.4-4.9-2.9-4.9-6.1c0-8.4,7.4-15.4,16.1-15.4C377.5,306.9,384.7,313.7,384.8,322z" fill="#fbf7e9"></path>
                    <path d="M263.4,318.7c0-1.6-0.1-3.2,0-4.9c0.2-3.2,2.1-5.1,5.2-5.3c3.2-0.2,5.4,1.6,5.8,4.7c0.4,3.4,0.3,7,0.1,10.4
                        c-0.3,3.2-3,5.3-5.9,4.9c-3.1-0.4-4.9-2.2-5.1-5.4C263.4,321.7,263.4,320.2,263.4,318.7z" fill="#fbf7e9"></path>
                </g>
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
