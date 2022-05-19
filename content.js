(() => {
    function init() {
        console.log('init')
        //FIXME: 適當時機注入程式碼
        console.log($("#danmuToggle"))
        injectScript();
        // $(".vjs-current-time-display").on("change", function(){
        //     console.log($(".vjs-current-time-display"))
        //     $(".vjs-current-time-display").off("change");
        // });
        //TODO: 截圖
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
     * 等待開始播放再注入主要邏輯手稿
     * 
     * @return void
     */
    function injectScript(){
        console.log('inject')
        const animeTitle = document.getElementsByTagName("h1")[0].textContent;  // 網頁上原始動畫標題
        const filenamePrefix = animeTitle.replace(/ \[[^}]*\]/,'') + getEpisode(animeTitle);  // 截圖檔名前半（動畫名稱+話數資訊）

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (event)=>{
            // 119 => F8
            if (event.keyCode !== 119) return;
            console.log(document.getElementById("butter-knife"))
        });

        // 插入按鈕
        try {
            let resolutionBtn = document.getElementById("resButton");  // 右邊調整解析度的按鈕
            let newBtn = document.createElement('button');
            newBtn.setAttribute("id", "butter-knife-div");
            newBtn.setAttribute("title", "奶油刀截圖");
            newBtn.setAttribute('type', 'button');
            newBtn.setAttribute('class', 'butter-knife vjs-control vjs-show-tip');
            resolutionBtn.insertAdjacentElement("afterend", newBtn);
            document.getElementById("butter-knife-div").innerHTML = `<svg style="width:20px;height:20px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.73,15L9.83,21.76C10.53,21.91 11.25,22 12,22C14.4,22 16.6,21.15 18.32,19.75L14.66,13.4M2.46,15C3.38,17.92 5.61,20.26 8.45,21.34L12.12,15M8.54,12L4.64,5.25C3,7 2,9.39 2,12C2,12.68 2.07,13.35 2.2,14H9.69M21.8,10H14.31L14.6,10.5L19.36,18.75C21,16.97 22,14.6 22,12C22,11.31 21.93,10.64 21.8,10M21.54,9C20.62,6.07 18.39,3.74 15.55,2.66L11.88,9M9.4,10.5L14.17,2.24C13.47,2.09 12.75,2 12,2C9.6,2 7.4,2.84 5.68,4.25L9.34,10.6L9.4,10.5Z" />
                </svg>`;
        } catch (error){
            console.warn("[奶油刀] 無法注入控制器圖示");
        }
    }
 
    // 等待頁面渲染好再開始執行
    $("#video-container").on("DOMSubtreeModified", function(){
        console.log("[奶油刀] 播放區 DOM changed");
        $("#video-container").off("DOMSubtreeModified");  // 開始之前先移除監聽器
        
        // 等待播放器及影片準備OK
        $('#ani_video').on("DOMSubtreeModified", function(){
            $('#ani_video').off("DOMSubtreeModified");
            console.log("[奶油刀] video-js ready");
            console.log($("#danmuToggle"))
            console.log($("#danmuToggle").attr('class'))

            // $('#ani_video_html5_api').on("DOMSubtreeModified", function(){
            //     $('#ani_video_html5_api').off("DOMSubtreeModified");
            //     console.log("[奶油刀] video-js api ready");

                $("#danmuToggle").on("changedClass", function(){
                    init();
                });
            // })
        })
    });
})()
