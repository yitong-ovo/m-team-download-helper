// ==UserScript==
// @name         m-team download helper
// @namespace    https://github.com/yitong-ovo/m-team-download-helper
// @version      0.2
// @description  Help you quickly submit download tasks to your BitTorrent software.
// @updateURL    https://raw.githubusercontent.com/yitong-ovo/m-team-download-helper/master/m-team-download-helper.meta.js
// @downloadURL  https://raw.githubusercontent.com/yitong-ovo/m-team-download-helper/master/m-team-download-helper.user.js
// @match        https://pt.m-team.cc/details.php*
// @grant        window.close
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// ==/UserScript==

// https://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome


// Config 配置选项:
// 填写你的后端地址
const backend_url = // 在 "//" 前添加后端地址
// 分类列表
const types = // 在 "//" 前添加分类
// 编辑默认选中的分类
const types_default = '电视'


function sendURL() {
    var torrent_tittle = $($(".index")[0]).html()
    var torrent_download_link = document.location.origin + $("a:contains([IPv4+https])").attr('href')
    var type = $('#type').val()

    torrent_tittle = '类别_' + type + '|' + torrent_tittle
    console.log(torrent_tittle + '|' + torrent_download_link);
    $('#type').hide()
    $('#download_link').hide()
    $.ajax({
        url: backend_url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if(data.status === 0){
                window.close();
            }
        },
        data: JSON.stringify({'url': torrent_download_link, 'title': torrent_tittle })
    });
}

(function () {
    var download_table = $("a:contains([IPv4+https])").parent();
    download_table.append(' <select id="type"> </select>');
    download_table.append(' <a id="download_link" href="##">Download</a>');
    for (const type of types) {
        let defaultSelected = false
        if (type === types_default) {
            defaultSelected = true
        }
        $('#type').append(new Option(type, type, false, defaultSelected))
    }
    document.getElementById('download_link').addEventListener("click", sendURL, false);
})();
