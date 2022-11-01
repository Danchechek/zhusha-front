scrollDown();



window.addEventListener('click', function (event) {

        if (event.target.className === 'textarea') {
            const sendWrapper = event.target.closest('.container_messages_stream');

            const textArea = sendWrapper.querySelector('textarea');
            textOfTextArea = String(textArea.value);
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

            sendWrapper.insertAdjacentHTML('afterbegin', commentHTML);
        }
    }
)

var yt = document.querySelector('iframe');
var textArea = document.querySelector('.areaBroad');

textArea.addEventListener('keydown', (e) => {
    if (e.key === 13) {
        var textOfTextAreaValue = document.querySelector('.areaBroad').value;
        const commentInfo = {
            nick: 'unknown',
            textOfComment: textOfTextArea,
        }

        const commentHTML = `<div class="comment_chet">
                    <div class="row_nick_date">
                        <div class="nick">${commentInfo.nick}</div>
                    </div>
                    <div class="comment_text">${commentInfo.textOfComment}
                    </div>
                </div>`

        const container = document.querySelector('.container_messages_stream');

        container.insertAdjacentHTML('beforebegin', commentHTML);
        var streamOfMessages = document.querySelector('.container_messages_stream');
        streamOfMessages.scrollTop = streamOfMessages.scrollHeight;
    }
})

window.addEventListener("keypress", function (e) {
    if (e.keyCode !== 13) return;

    var textArea = document.querySelector('.areaBroad');
    if (/[a-zа-яё0-9]/i.test(textArea.value) > 0) {
        const commentInfo = {
            nick: 'unknown',
            textOfComment: textArea.value,
        }
        const commentHTML = `<div class="comment_chet">
                    <div class="row_nick_date">
                        <div class="nick">${commentInfo.nick}</div>
                    </div>
                    <div class="comment_text">${commentInfo.textOfComment}
                    </div>
                </div>`
        const container = document.querySelector('.container_messages_stream');
        if (container.children.length % 2 === 1) {
            container.insertAdjacentHTML('beforeend', commentHTML);
        } else {
            const nechetCommentHTML = `<div class="comment">
                    <div class="row_nick_date">
                        <div class="nick">${commentInfo.nick}</div>
                    </div>
                    <div class="comment_text">${commentInfo.textOfComment}
                    </div>
                </div>`
            container.insertAdjacentHTML('beforeend', nechetCommentHTML);
        }
        textArea.value = '';
        scrollDown();
    }
});



function scrollDown() {
    var streamOfMessages = document.querySelector('.container_messages_stream');
    streamOfMessages.scrollTop = streamOfMessages.scrollHeight;
}

touchClose = document.querySelector('.close');
touchReactionImg1 = document.querySelector('.touch_reaction_img_1');
touchReactionImg2 = document.querySelector('.touch_reaction_img_2');
touchReactionImg3 = document.querySelector('.touch_reaction_img_3');
touchReactionImg4 = document.querySelector('.touch_reaction_img_4');


containerMessages = document.querySelector('.container_messages_stream')
reaction_img_1 = document.querySelector('.reaction_img_1')
reaction_img_2 = document.querySelector('.reaction_img_2')
reaction_img_3 = document.querySelector('.reaction_img_3')
reaction_img_4 = document.querySelector('.reaction_img_4')

touchClose.addEventListener('click', function () {
    if (touchClose.innerText === 'Скрыть') {
        containerMessages.classList.add('container_messages_stream_anim_close');
    } else {
        containerMessages.classList.add('container_messages_stream_anim_open');
    }
})

containerMessages.addEventListener("animationend", AnimationHandler5, false);


touchReactionImg1.addEventListener('click', function () {
        reaction_img_1.classList.add('reaction_img_1_anim');
})

touchReactionImg2.addEventListener('click', function () {
        reaction_img_2.classList.add('reaction_img_2_anim');
})

touchReactionImg3.addEventListener('click', function () {
        reaction_img_3.classList.add('reaction_img_3_anim');
})


touchReactionImg4.addEventListener('click', function () {
        reaction_img_4.classList.add('reaction_img_4_anim');
})

reaction_img_1.addEventListener("animationend", AnimationHandler1, false);
reaction_img_2.addEventListener("animationend", AnimationHandler2, false);
reaction_img_3.addEventListener("animationend", AnimationHandler3, false);
reaction_img_4.addEventListener("animationend", AnimationHandler4, false);

function AnimationHandler1() {
    // Удаляем класс с анимацией
    reaction_img_1.classList.remove('reaction_img_1_anim');
}

function AnimationHandler2() {
    // Удаляем класс с анимацией
    reaction_img_2.classList.remove('reaction_img_2_anim');
}

function AnimationHandler3() {
    // Удаляем класс с анимацией
    reaction_img_3.classList.remove('reaction_img_3_anim');

}

function AnimationHandler4() {
    // Удаляем класс с анимацией
    reaction_img_4.classList.remove('reaction_img_4_anim');
}


function AnimationHandler5() {
    // Удаляем класс с анимацией
    touchClose.textContent = "Открыть";

    if(containerMessages.classList.length === 3) {
        touchClose.textContent = "Скрыть";
        containerMessages.classList.remove('container_messages_stream_anim_open');
        containerMessages.classList.remove('container_messages_stream_anim_close');
    }
}
