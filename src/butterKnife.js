(() => {

    let filenamePrefix = getDefaultFilenamePrefix();

    /**
     * Returns a filename prefix based on the anime title and episode information (the default value).
     *
     * @return {string} The filename prefix, consisting of the anime title and episode information.
     */
    function getDefaultFilenamePrefix() {
        let animeTitle = document.getElementsByTagName("h1")[0].textContent;  // 網頁上原始動畫標題
        return animeTitle.replace(/ \[[^}]*\]/,'').replaceAll('.', '') + getEpisode(animeTitle);  // 截圖檔名前半（動畫名稱+話數資訊）
    }

    /**
     * 初始化之一：加入相簿和設定區塊
     *
     * @return void
     */
    function init() {
        consolog('init');

        consolog("預設存檔名稱（未加時間戳）為：" + filenamePrefix);

        // 製作相簿區
        let album = document.createElement('div');
        album.setAttribute('id', 'butter-knife-album');
        album.setAttribute('class', 'butter-knife');
        document.getElementsByClassName('data')[0].insertAdjacentElement('beforebegin', album);  // 插在「作品簡介」區前

        // 自訂存檔名稱前綴 - 表單 - 在相簿區之前
        let configForm = document.createElement('form');
        configForm.setAttribute('id', 'butter-knife-config-form');
        configForm.setAttribute('class', 'butter-knife input-field');
        document.getElementById('butter-knife-album').insertAdjacentElement('beforebegin', configForm);

        // 奶油刀 icon 48 - 在自訂存檔名稱前綴表單之前
        let icon = document.createElement('img');
        icon.setAttribute('id', 'butter-knife-icon-48');
        icon.setAttribute('title', '奶油刀圖示');
        icon.setAttribute('class', 'butter-knife');
        icon.setAttribute('src', browser.runtime.getURL('icons/logo-48.png'));
        icon.setAttribute('height', browser.runtime.getURL('icons/logo-48.png'));
        document.getElementById('butter-knife-config-form').insertAdjacentElement('beforebegin', icon);

        // 自訂存檔名稱前綴 - 輸入
        let filenamePrefixLabel = document.createElement('label');
        filenamePrefixLabel.setAttribute("for", "butter-knife-filename-prefix-input");
        filenamePrefixLabel.setAttribute("id", "butter-knife-filename-prefix-input-label");
        filenamePrefixLabel.setAttribute("class", "butter-knife-filename-prefix-input-label butter-knife-input-label butter-knife-text");
        filenamePrefixLabel.textContent = "自訂奶油刀存檔檔名前綴"
        configForm.appendChild(filenamePrefixLabel);
        let filenamePrefixInput = document.createElement('input');
        filenamePrefixInput.setAttribute("id", "butter-knife-filename-prefix-input");
        filenamePrefixInput.setAttribute("title", "自訂奶油刀存檔檔名前綴");
        filenamePrefixInput.setAttribute('type', 'text');
        filenamePrefixInput.setAttribute('class', 'butter-knife butter-knife-input');
        filenamePrefixInput.setAttribute("placeholder", filenamePrefix);
        filenamePrefixInput.setAttribute("value", filenamePrefix);
        configForm.appendChild(filenamePrefixInput);
        filenamePrefixInput.addEventListener('input', (event) => {
            // 如果目前的設定和輸入框不同，要有醒目提示
            filenamePrefix !== event.target.value
                ? filenamePrefixInput.classList.add("butter-knife-filename-prefix-input-unsaved-highlight")
                : filenamePrefixInput.classList.remove("butter-knife-filename-prefix-input-unsaved-highlight");
        });
        // 自訂存檔名稱前綴 - 儲存按鈕
        let saveFilenamePrefixBtn = document.createElement('button');
        saveFilenamePrefixBtn.setAttribute("id", "butter-knife-filename-save-filename-prefix-btn");
        saveFilenamePrefixBtn.setAttribute("title", "儲存自訂的奶油刀存檔名稱前綴");
        saveFilenamePrefixBtn.setAttribute('type', 'button');
        saveFilenamePrefixBtn.setAttribute('class', 'butter-knife butter-knife-btn btn waves-effect waves-light');
        configForm.appendChild(saveFilenamePrefixBtn);
        let saveIcon = document.createElement('i');
        saveIcon.setAttribute('class', 'material-icons butter-knife-save-icon');
        saveIcon.textContent = 'check';
        saveFilenamePrefixBtn.appendChild(saveIcon);
        document.getElementById("butter-knife-filename-save-filename-prefix-btn").addEventListener('click', (event) => {
            setFilenamePrefix();
        });

        consolog("區域初始化完成");

        // 離開頁面時觸發
        addEventListener("beforeunload", (event) => {
            consolog("★before unload★");
            // 如果相簿區有截圖存在，就跳出訊息確認
            if (document.getElementsByClassName("butter-knife-shot-a").length > 0) {
                event.preventDefault();
                return "【奶油刀】離開頁面將會清除現存頁面上暫存的截圖，請確定已經儲存想要保留的截圖";
            }
        });
        consolog("開始監聽 beforeunload");

        // 監聽 title，變更時重設前綴
        new MutationObserver(() => {
            consolog("title changed.");
            // 重設前綴也別忘記更新輸入框的值
            filenamePrefix = getDefaultFilenamePrefix();
            document.getElementById("butter-knife-filename-prefix-input").value = filenamePrefix;
            consolog("截圖檔名前綴因為集數變動，之後新增的截圖檔名前綴更新為：" + filenamePrefix);
        }).observe(
            document.querySelector('title'),
            { subtree: true, characterData: true, childList: true }
        );

        consolog("init OK.");
    }

    /**
     * 初始化之二：加入按鈕和快捷鍵並監聽
     *
     * @return void
     */
     function initTrigger() {
        // 鍵盤快捷鍵
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'F8') return;
            getVideoShot();
        });

        // 插入按鈕
        try {
            let resolutionBtn = document.getElementsByClassName("vjs-res-button")[0];  // 右邊調整解析度的按鈕
            let newBtn = document.createElement('button');
            newBtn.setAttribute("id", "butter-knife-btn");
            newBtn.setAttribute("title", "奶油刀截圖 (F8)");
            newBtn.setAttribute('type', 'button');
            newBtn.setAttribute('class', 'butter-knife vjs-control vjs-show-tip');
            resolutionBtn.insertAdjacentElement("afterend", newBtn);
            const reqControlBarBtn = new XMLHttpRequest();
            reqControlBarBtn.open("GET", browser.runtime.getURL("icons/control-bar-btn.svg"), false);
            reqControlBarBtn.send();
            document.getElementById("butter-knife-btn").innerHTML = reqControlBarBtn.responseText;
            document.getElementById("butter-knife-btn").addEventListener('click', (event) => {
                getVideoShot();
            });
        } catch (error) {
            consolog("無法注入控制器圖示" + '\n' + error, 'warn');
        }

        consolog("trigger ready.");
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
    function getVideoShot() {
        const video = document.querySelector('#ani_video_html5_api');
        const origin_dt = document.getElementsByClassName('vjs-duration-display')[0].textContent;  // 播放器上的影片總時長
        const origin_ct = document.getElementsByClassName('vjs-current-time-display')[0].textContent;  // 播放器上目前播放進度時間
        // 用冒號數量判斷是不是超過一個小時
        const ct = origin_dt.match(/:/g).length === 1
            ? origin_ct.replace(':', '').padStart(4, '0')
            : origin_ct.replaceAll(':', '').padStart(6, '0');
        let filename = filenamePrefix + ct;
        consolog('截圖：' + filename);

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
        canvaDL.className = "butter-knife-shot-a";
        canvaDL.download = filename;
        canvaDL.title = filename;
        canvaDL.href = canva.toDataURL();
        canvaDL.innerHTML = `<img src="${canva.toDataURL()}">`;

        // 放到相簿
        document.getElementById("butter-knife-album").appendChild(canvaDL);
    }

    /**
     * 設定截圖存檔檔名前綴
     *
     * @return void
     */
    function setFilenamePrefix() {
        let previousFilenamePrefix = filenamePrefix;  // 更改前的檔名前綴
        let filenamePrefixInput = document.getElementById("butter-knife-filename-prefix-input");
        filenamePrefix = filenamePrefixInput.value.replaceAll('.', ''); // 更新檔名前綴
        consolog("存檔名稱（未加時間戳）更新為：" + filenamePrefix);
        filenamePrefixInput.classList.remove("butter-knife-filename-prefix-input-unsaved-highlight"); // 移除未儲存醒目提示
        // 也修改已經在相簿區的截圖們的屬性
        let existScreenshots = document.getElementsByClassName("butter-knife-shot-a");
        Array.from(existScreenshots).forEach(screenshot => {
            screenshot.title = screenshot.title.replace(previousFilenamePrefix, filenamePrefix);
            screenshot.download = screenshot.download.replace(previousFilenamePrefix, filenamePrefix);
        });
        consolog("相簿區已存在截圖之檔名前綴亦更新完成。");
    }

    /**
     * 奶油刀 console log
     *
     * @param string content 紀錄內容
     * @param string level 紀錄等級
     * @return void
     */
    function consolog(content, level = 'log') {
        console[level]("[奶油刀] " + content);
    }

    // 等解析度按鈕出現，代表開始播放正片
    waitForElm('.vjs-res-button').then((elm) => {
        consolog('class vjs-res-button (origin: id resButton) is ready');
        // 設定觸發
        initTrigger();
    });

    // 播放開始前就可以先把相簿區和一些介面做出來
    init();

    consolog('butterKnife loaded.')
})();
