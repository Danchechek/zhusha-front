var loadedIMGs = [];

function showNone() {
    var content = document.querySelector('.content');

    if (getComputedStyle(content).display === 'block') {
        content.style.display = 'none';
        var writePost = document.querySelector('.container_post_write');
        writePost.style.display = 'block';
    } else {
        content.style.display = 'block';
        var writePost = document.querySelector('.container_post_write');
        writePost.style.display = 'none';
    }
}

function cleanWritePost() {
    var text = document.querySelector('.message_write_area');
    var imgContainer = document.querySelector('.img_container_write');
    loadedIMGs.length = 0;
    text.value = '';

    while (imgContainer.firstChild) {
        imgContainer.removeChild(imgContainer.firstChild);
    }



}

window.addEventListener('click', function (event) {

        if (event.target.className === 'send') {
            const sendWrapper = event.target.closest('.container_comment');

            textArea = sendWrapper.querySelector('.areaBroad')
            textOfTextArea = String(textArea.value);

            if(/[a-zа-яё0-9]/i.test(textOfTextArea) > 0 ) {
                const commentInfo = {
                    time: '17:03',
                    date: '10.03.2022',
                    nick: 'unknown',
                    textOfComment: textOfTextArea,
                }

                const commentHTML = `<div class="box">
                        <div class="comment">
                            <div class="row_nick_date">
                                <div class="nick">${commentInfo.nick}</div>
                                <div class="column_date_time_comment">
                                    <div class="date">${commentInfo.date}</div>
                                    <div class="time">${commentInfo.time}</div>
                                </div>
                            </div>
                            <div class="nick"></div>
                            <div class="comment_text">${commentInfo.textOfComment}</div>
                        </div>
                    </div>`
                textArea.value = '';
                sendWrapper.insertAdjacentHTML('afterbegin', commentHTML);
            }
        }

        if (event.target.className === 'circle_post') {
            showNone();
        }

        if (event.target.className === 'public') {
            var text = document.querySelector('.message_write_area');
            var postInfo = {
                text: text.value,
                imgs: loadedIMGs,
                time: '17:03',
                date: '2002',
            }
            if (/[a-zа-яё0-9]/i.test(text.value) > 0 || loadedIMGs.length > 0) {
                console.log('syyyy')
                var newPost = `<div class="post">
                <div class="container_post">
                    <div class="column_post">
                        <div class="row_message">
                            <div class="message"> ${postInfo.text}
                            </div>
                            <div class="column_date_time">
                                <div class="date">${postInfo.date}</div>
                                <div class="time">${postInfo.time}</div>
                            </div>
                        </div>
                        <div class="img_container_write">
                            ${postInfo.imgs}
                        </div>
                    </div>
                </div>
                <div class="open_all"> Открыть всё</div>
                <div class="container_comment">

                    <textarea class="areaBroad" placeholder="Добавить коментарий" cols="24" rows="3"></textarea>

                    <div class="send">Send</div>

                </div>
            </div>`;

                var content = document.querySelector('.posts');

                content.insertAdjacentHTML('afterbegin', newPost);

                cleanWritePost();

                showNone();


            }
        }
    }
)

function showFile(e) {
    var files = e.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) continue;
        var fr = new FileReader();
        fr.onload = (function (theFile) {
            return function (e) {
                var li = document.createElement('src');
                var imgSRC = "<img src='" + e.target.result + "' />";
                li.innerHTML = imgSRC;
                loadedIMGs.push(imgSRC)
                document.querySelector('.img_container_write').insertBefore(li, null);
            };
        })(f);

        fr.readAsDataURL(f);
    }
}

document.querySelector('.input-file').addEventListener('change', showFile, false);


