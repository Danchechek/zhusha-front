var loadedIMGs = [];
var flagOfRequests = true;
countOfPosts = 0;


dayOfLastPost = moment().format('YYYY-MM-DD');


sendApiRequest10();


function minusDay() {
    countOfPosts++;
    dayOfLastPost = moment().subtract(countOfPosts, 'days').format('YYYY-MM-DD');
}

window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        console.log("syy")

        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var documentHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        if ((documentHeight - clientHeight) <= scrollTop) {
            minusDay();
            sendApiRequest(dayOfLastPost);
        }
    }
};

async function sendApiRequest10() {
    for (let i = 0; i < 10; i++) {
        minusDay();
    }
    let API_KEY = "yuyLUg9gHqBrCBKcFKUq3fxpWHphxjYI74DgdWIL"
    console.log(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${dayOfLastPost}`);
    var request = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${dayOfLastPost}`)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < 10; i++) {
                addPost(data[i]);
            }
        })
    return request;
}

async function sendApiRequest(date) {
    if (flagOfRequests !== true) {
        return;
    }
    flagOfRequests = false;

    let API_KEY = "yuyLUg9gHqBrCBKcFKUq3fxpWHphxjYI74DgdWIL"
    console.log(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    var request = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
        .then((res) => res.json())
        .then((data) => {
            flagOfRequests = true;
            addPost(data);
        })
    return request;
}


function addPost(data) {
    post = document.querySelector('.posts')
    const postHTML = `<div class="post">
                    <div class="container_post">
                        <div class="column_post">
                            <div class="row_message">
                                <div class="message"> 
                                "${data["explanation"]}"
                                </div>
                                <div class="column_date_time">
                                    <div class="date">${data["date"]}</div>
                                    <div class="time">17:03</div>
                                </div>
                            </div>
                            <div class="img_container">
                            <img class="post_img" src="${data["url"]}">
                            </div>
                        </div>
                    </div>
                    <div class="open_all"> Открыть всё</div>
                    <div class="container_comment">
                       
                        <textarea class="areaBroad" placeholder="Добавить коментарий" cols="24" rows="3"></textarea>

                        <div class="send">Send</div>


                    </div>
                </div>`
    post.insertAdjacentHTML('beforeend', postHTML);

}

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
        if (event.target.className === 'post_img') {
            const imgg = event.target.closest('.post_img');
            const cont = event.target.closest('.img_container');

            lightbox = new FsLightbox();
            for(let i = 0; i < cont.children.length; i++) {
                lightbox.props.sources.push(cont.children[i].cloneNode(true));
            }

            lightbox.open();
        }

        if (event.target.className === 'send') {
            const sendWrapper = event.target.closest('.container_comment');

            textArea = sendWrapper.querySelector('.areaBroad')
            textOfTextArea = String(textArea.value);

            if (/[a-zа-яё0-9]/i.test(textOfTextArea) > 0) {
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
                        <div class="img_container">
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
                var imgSRC = "<img class=post_img src='" + e.target.result + "' />";
                li.innerHTML = imgSRC;
                loadedIMGs.push(imgSRC)
                document.querySelector('.img_container_write').insertBefore(li, null);
            };
        })(f);

        fr.readAsDataURL(f);
    }
}

document.querySelector('.input-file').addEventListener('change', showFile, false);




