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
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0"
                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACx1BMVEUAAAAAAAAFBwoGBwwA
                AAAAAAAFBgkiLkgoOFgFBwooNlUDBAYMEBgFBQkFBgomNFENERoEBggJDQ8WHzAEBAYJDQ5QcX0M
                EBkEBggJDQ9Ye4gbJiwEBgcIDA0AAAAeKi4AAAAAAAAWEw8UEQ1XTTvTuowfIBxafIkFBQUQDwkU
                EQwVEgwHBQUAAAADAwMZFhE9NCQRDgoREAwIBwUJCAZKQzMPDgsPDgoNDAkCAgEJCAUTEQsICAYg
                HhoAAAAJCAYYFhMAAAATEQwODQsAAAARDwuSg2EWFRIDAwMAAAAQDgoXFA8WFA8YFRAjHxUoJRov
                KyEuKyIqJh8kIhsWFRMXFRMSEA8AAABKZqBCW49FX5VFYJYcJy0oN1Ok5/+Y1+2W0+mc5f+Q4v+M
                4f+Q4f+W4/9zw+A/WF4sMS4nLSoiLCyyoHfdxpTmz5otLSVcfYie5f91xuMZGxiXiGXWwJCikW0T
                EQ2xmmbavn/HrXPMt4n/5avt1Z8uLSVcfomR4v9DYmmQgmGhkWxSSTT72pH825LmyIX+5Kru1qBb
                fYiN4f8wOjnNuIn54Kfv16AwMChYeIMuNjTTvY3/5qz/8c/74ag1NCt8xuAYHBr/5a3FsYQxPD2h
                4vpego4UGBcUEg3cxpQdISCW1OpfhZIcIB9VTjjixYM8NSfRvIy5pnz/8M6rootLRz3EuZ+WiGgZ
                GhghIh5vZ1DTvYv/36v/vKymd299aFTy2aLRxKbg1Lbj17g0MCqdeHNTPTz/3seyn3XUuXv/oaz8
                pKr33qYZFhFNRTQhHxo3NC2qoYr+wbn+oKv/p69qX0ajjl7/z6v/oqz/uazPuouaimezpoWon4j+
                8M7/1sP/o63/u7f/4Kv/26v/6bf/6cz/5Mr946r/5q69qn//7cTXy6+7qH1NRTN4aEW5oWssJx2b
                i2i7qoS7sZick3////9lojWYAAAAWHRSTlMAEJisJBLa+f7c+fLybdb58n/b/HjZ+fN52vn8r/IN
                7S09u92YaO/8/eLd0GcBSvLzlNz19/79/fv+9If37x728RXT6jfx/vFPJZTIzc7Z3uXk4NrNypsy
                J8ZaAQAAAAFiS0dE7CG5sxsAAAAJcEhZcwAAAOwAAADsAXkocb0AAAAHdElNRQfmCA0HIzRUgVRy
                AAABm0lEQVQ4y2NgGBDAyMTMgk+elY2dgxOvPFdEJDd++SgeXtz28/FHRAsI4tYvJAzUL4JbXlQs
                JlZcAre8pFRcvLQMXvm4uARZOdzyiUnJKYnyCqjiikrKIKCiqqaempaekZmloakFA9o6ugx6+tk5
                IJCbl19QWFRcUlpWXgEHlQaGDEZV1SBQU1sXV9/QCGQ1Nbe0wkGbMYNJO0i+o7YzLq6ruwfI7DU1
                M7eAAksrawYbkHxf/wSg+7smTgKbVj15ChTY2jGAFUydBtQfFzd9BlTBTHQFs2YDpefMnTcflwkL
                Fi5KWLxk6bLlQAUrVgIFVk2ZsnrNWoSC6nXrN2zc1Nq6fNLmLVu3tc/avmPnrt179u5DKACB/QeA
                CrYcPHjo8JGjx46fOHnw1GlUBWfOAhWcO3/wQvXFS5evXL12/eANLAqqb94CsW8DHXjnLsQN9vdQ
                FEDA/VUQXzg4MjA4PcCioPohWP6RMzAyXVzdHoPBk6fPnr94DAUvXwHBa3cPUHR7enn7gICvn59/
                QGBQMASEhISEhoUz0AUAAEkxBGvYaumpAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA4LTEzVDA3
                OjM1OjUyKzAwOjAwWMR5FgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOC0xM1QwNzozNTo1Misw
                MDowMCmZwaoAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC" />
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
