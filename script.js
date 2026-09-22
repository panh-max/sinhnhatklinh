// ======================================
// A LITTLE WORLD FOR LINH ♡
// Clean / rebuilt JavaScript
// ======================================

const screens = {
    welcome: document.getElementById("welcome-screen"),
    birthday: document.getElementById("birthday-screen"),
    gallery: document.getElementById("gallery-screen"),
    memories: document.getElementById("memories-screen"),
    letter: document.getElementById("letter-screen"),
    final: document.getElementById("final-screen")
};

const openGiftBtn = document.getElementById("open-gift-btn");
const giftBox = document.getElementById("gift-box");
const exploreBtn = document.getElementById("explore-btn");
const memoriesBtn = document.getElementById("memories-btn");
const backToGalleryBtn = document.getElementById("back-to-gallery");
const letterEntryBtn = document.getElementById("letter-entry-btn");
const backToMemoriesBtn = document.getElementById("back-to-memories");

const letterStage = document.getElementById("letter-stage");
const openLetterBtn = document.getElementById("open-letter-btn");
const letterHint = document.getElementById("letter-hint");

const letterAfterMessage =
    document.getElementById("letter-after-message");

const letterSmallBackBtn =
    document.getElementById("letter-small-back-btn");

const portraitGallery = document.getElementById("portrait-gallery");

const lightbox = document.getElementById("portrait-lightbox");
const lightboxPhoto = document.getElementById("lightbox-photo");
const lightboxNumber = document.getElementById("lightbox-number");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

const memoryGrid = document.getElementById("memories-grid");
const memoryModal = document.getElementById("memory-modal");
const memoryModalClose = document.getElementById("memory-modal-close");
const memoryModalImage = document.getElementById("memory-modal-image");
const memoryModalLabel = document.getElementById("memory-modal-label");
const memoryModalTitle = document.getElementById("memory-modal-title");
const memoryModalText = document.getElementById("memory-modal-text");

// ======================================
// 1. SCREEN NAVIGATION
// ======================================

function showScreen(name) {
    Object.values(screens).forEach((screen) => {
        screen.classList.remove("active");
    });

    const target = screens[name];

    if (!target) return;

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}

// ======================================
// 2. WELCOME -> BIRTHDAY
// ======================================

function openBirthday() {
    showScreen("birthday");
}

openGiftBtn.addEventListener("click", openBirthday);

giftBox.addEventListener("click", openBirthday);

giftBox.addEventListener("keydown", (event) => {
    if (
        event.key === "Enter" ||
        event.key === " "
    ) {
        event.preventDefault();
        openBirthday();
    }
});

// ======================================
// 3. BIRTHDAY -> PORTRAIT GALLERY
// ======================================

exploreBtn.addEventListener("click", () => {
    showScreen("gallery");
});

// ======================================
// 4. PORTRAIT DATA
// ======================================

const captions = [
    "Linh tí hon nè, trông hớn hở ♡",
    "Linh tí hon mà chu mỏ, điệu vậy trời ☀",
    "Vẫn là Linh tí hon mà cười hơi gượng ♡",
    "Ảnh Tết 2025 Panh chụp cho nè",
    "Ảnh ở quán cà phê view Hồ Tây, Panh ngồi cạnh ✿",
    "Ảnh này xinh mà Panh không có mặt ở đó",
    "Ảnh này xuất sắc v, Panh chụp và Linh xinh ụ á luôn á trời ♡",
    "Tết 2026, vẫn là Panh chụp, nhìn ngon nghẻ hơn năm 2025 rồi đấy ✨",
    "Không nhớ dịp gì, nhưng đi ptb chụp nè ♡",
    "Đẹp, không đi cùng Panh",
    "Tự chụp nhưng Panh ngồi gần đó",
    "Tự chụp, Panh ngồi trong phòng điều hòa mát rượi ♡",
    "Xinh, tự chụp nhưng ngồi cạnh Panh",
    "Tự chụp nhưng mà đang nhìn về phía Panh ✧",
    "Ảnh này Mai Anh chụp cho, để avt TikTok mãi chưa đổi, chắc thích ♡"
];

const portraits = Array.from({ length: 15 }, (_, index) => ({
    number: index + 1,
    image: `images/linh${String(index + 1).padStart(2, "0")}.${index === 1 ? "png" : "jpg"}`,
    caption: captions[index]
}));

// ======================================
// 5. BUILD PORTRAIT GALLERY
// ======================================

function createPortraitCard(portrait, index) {
    const card = document.createElement("article");

    card.className = "portrait-card";

    card.style.setProperty(
        "--delay",
        `${index * 0.06}s`
    );

    card.innerHTML = `
        <div class="film-top-holes" aria-hidden="true"></div>

        <div class="portrait-artwork">
            <img
                class="portrait-real-image"
                src="${portrait.image}"
                alt="Khánh Linh - Portrait ${portrait.number}"
                loading="lazy"
            >
        </div>

        <div class="portrait-caption">
            <span class="portrait-number">
                NO. ${String(portrait.number).padStart(2, "0")}
            </span>

            <p class="portrait-name">
                ${portrait.caption}
            </p>
        </div>

        <div class="film-bottom-holes" aria-hidden="true"></div>
    `;

    const image =
        card.querySelector(".portrait-real-image");

    image.addEventListener("error", () => {
        image.remove();

        const artwork =
            card.querySelector(".portrait-artwork");

        artwork.classList.add("image-missing");

        artwork.innerHTML = `
            <div class="missing-image">
                <span>♡</span>

                <p>
                    Ảnh ${String(portrait.number).padStart(2, "0")}
                    chưa được tìm thấy
                </p>
            </div>
        `;
    });

    card.addEventListener("click", () => {
        openPortraitLightbox(portrait);
    });

    return card;
}

portraits.forEach((portrait, index) => {
    portraitGallery.appendChild(
        createPortraitCard(portrait, index)
    );
});

// ======================================
// 6. PORTRAIT LIGHTBOX
// ======================================

function openPortraitLightbox(portrait) {
    lightboxPhoto.innerHTML = `
        <img
            src="${portrait.image}"
            alt="Khánh Linh"
        >
    `;

    const image =
        lightboxPhoto.querySelector("img");

    image.addEventListener("error", () => {
        lightboxPhoto.innerHTML = `
            <div class="missing-image large">
                <span>♡</span>

                <p>
                    Không tìm thấy ảnh này
                </p>
            </div>
        `;
    });

    lightboxNumber.textContent =
        `PORTRAIT NO. ${String(
            portrait.number
        ).padStart(2, "0")}`;

    lightboxCaption.textContent =
        portrait.caption;

    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}

function closePortraitLightbox() {
    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}

lightboxClose.addEventListener(
    "click",
    closePortraitLightbox
);

lightbox.addEventListener(
    "click",
    (event) => {
        if (event.target === lightbox) {
            closePortraitLightbox();
        }
    }
);
// ======================================
// 7. OUR MEMORIES DATA
// ======================================

// Card = ngắn, gợi tò mò.
// Popup = kể chuyện dài hơn.
// Hai phần KHÔNG lặp nội dung.

const memories = [
    {
        number: "01",
        label: "A SMALL, ORDINARY DAY",

        image: "images/memory01.jpg",

        cardTitle: "Những ngày chẳng có gì đặc biệt ♡",

        cardText:
            "Nhưng chúng ta thì quá là xinh iu đẹp đẽ.",

        popupTitle:
            "Một trong những tấm hình xinh xắn cute hiếm hoi của chúng ta",

        popupText:
            "Mong là những ngày bình thường sau này của Linh sẽ luôn tự tin, vui vẻ, cười thật nhiều và chúng ta sẽ có nhiều kỷ niệm dễ thương hơn nữa với nhau nè."
    },

    {
        number: "02",
        label: "A LITTLE PIECE OF YOUTH",

        image: "images/memory02.jpg",

        cardTitle: "Một trong những thành tựu của tuổi 20 ♡",

        cardText:
            "Chúng ta đã cùng có mặt ở thời điểm đó, dù hơi mắc cười.",

        popupTitle:
            "Quán quân của lòng tớ :))",

        popupText:
            "Đằng sau những thành tựu thì tớ cũng biết Khánh Linh phải cố gắng nhiều như nào, vậy nên mong sau này, dù có là chuyện gì thì Khánh Linh cũng cố gắng lên nhé, tớ tin là Khánh Linh sẽ luôn làm được vì cậu giỏi mà, and tớ sẽ luôn ở đây,hihi"
    },

    {
        number: "03",
        label: "ANYWHERE, AS LONG AS WE GO",

        image: "images/memory03.jpg",

        cardTitle: "Bộ ba MusicBox hả?✿",

        cardText:
            "Nhiều chuyện và hay hát, rất nhộn nhịp và ồn ào",

        popupTitle:
            "Đi đâu cũng thấy vui và cảm giác không bao giờ hết chuyện.",

        popupText:
            "Lúc nào cũng mong Linh sẽ thật vui vẻ với sở thích, luôn luôn tận hưởng các buổi đi chơi hiếm hoi của chúng ta, tớ đây á hả, sẵn sàng nghe Linh hát, tớ nghĩ Huy Hoàng cũng muốn nghe."
    },

    {
        number: "04",
        label: "FAMILY",

        image: "images/memory04.jpg",

        cardTitle: "Ba chúng ta là gia đình luôn gòi á.",

        cardText:
            "Vượt ngưỡng tình bạn, hơn cả tình yêu",

        popupTitle:
            "Chúc mừng 10 năm tình bạnnnnnnnn!!!",

        popupText:
            "Thật vui vì ba chúng ta gặp được nhau, bắt chuyện và làm bạn với nhau. Mong chúng ta sẽ có thêm thật là nhiều 10 năm nữa nhé. (sến quá trời ơi)"
    },

    {
        number: "05",
        label: "TET 2026",

        image: "images/memory05.jpg",

        cardTitle: "Thiếu nữ áo dài",

        cardText:
            "Thiếu nữ Việt Nam tuổi xuân thì",

        popupTitle:
            "Hay ho và rất Việt Nam",

        popupText:
            "Dễ thương, sau này muốn cùng Linh mặc nhiều đồ truyền thống hoặc gì đó hay ho từ nhiều nơi khác nhau nữa, thật nhiều chuyến đi với nhau, không còn quanh quẩn ở Hà Nội."
    },

    {
        number: "06",
        label: "NOT THE END",

        image: "images/memory06.jpg",

        cardTitle: "Còn nhiều chuyện lắm ♡",

        cardText:
            "Đây mới chỉ là bắt đầu.",

        popupTitle:
            "To be continued",

        popupText:
            "Album này chưa thể có trang cuối được. Vì chắc chắn sau này vẫn còn thêm những chuyến đi, những tấm ảnh, những cuộc nói chuyện linh tinh và cả những ngày chẳng biết mình đang làm gì mà vẫn vui. Nên phần này cứ để trống một chút nhé. Để dành cho những kỷ niệm chưa xảy ra.(Chat gpt giúp t viết đoạn này nhưng nếu Linh muốn thêm nhiều kỷ niệm hơn thì nói t để t thêm vào nhá, tại hơi mỏi lưng nên làm 6 cái thôi nè)"
    }
];


// ======================================
// 8. BUILD MEMORY CARDS
// ======================================

function createMemoryCard(memory, index) {

    const card = document.createElement("article");

    card.className = "memory-card";

    card.style.setProperty(
        "--delay",
        `${index * 0.08}s`
    );

    card.innerHTML = `
        <div class="memory-pin" aria-hidden="true"></div>

        <div class="memory-image-wrap">

            <img
                src="${memory.image}"
                alt="${memory.cardTitle}"
                loading="lazy"
            >

            <span class="memory-number">
                ${memory.number}
            </span>

            <span
                class="memory-tape"
                aria-hidden="true"
            ></span>

        </div>

        <div class="memory-info">

            <span class="memory-date">
                ${memory.label}
            </span>

            <h2>
                ${memory.cardTitle}
            </h2>

            <p>
                ${memory.cardText}
            </p>

            <button
                class="memory-open-btn"
                type="button"
            >
                Xem kỷ niệm <span>♡</span>
            </button>

        </div>
    `;

    // ==============================
    // IMAGE ERROR
    // ==============================

    const image = card.querySelector("img");

    image.addEventListener("error", () => {

        image.remove();

        const imageWrap =
            card.querySelector(".memory-image-wrap");

        imageWrap.classList.add("image-missing");

        imageWrap.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="missing-image">

                <span>✦</span>

                <strong>
                    Ảnh kỷ niệm sẽ ở đây
                </strong>

                <small>
                    Thêm ${memory.image
                        .split("/")
                        .pop()}
                    vào thư mục images
                </small>

            </div>
            `
        );
    });


    // ==============================
    // OPEN FROM BUTTON
    // ==============================

    const openButton =
        card.querySelector(".memory-open-btn");

    openButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            openMemoryModal(memory);
        }
    );


    // ==============================
    // OPEN FROM WHOLE CARD
    // ==============================

    card.addEventListener(
        "click",
        () => openMemoryModal(memory)
    );


    return card;
}


// Tạo toàn bộ 6 cards

memories.forEach(
    (memory, index) => {

        memoryGrid.appendChild(
            createMemoryCard(
                memory,
                index
            )
        );

    }
);


// ======================================
// 9. MEMORY MODAL
// ======================================

function openMemoryModal(memory) {

    const imageWrap =
        memoryModal.querySelector(
            ".memory-modal-image-wrap"
        );

    // Xóa placeholder cũ nếu có
    const oldMissing =
        imageWrap.querySelector(
            ".memory-modal-missing"
        );

    if (oldMissing) {
        oldMissing.remove();
    }


    imageWrap.classList.remove(
        "image-missing"
    );


    // ==============================
    // UPDATE CONTENT
    // ==============================

    memoryModalLabel.textContent =
        `${memory.number} · ${memory.label}`;

    memoryModalTitle.textContent =
        memory.popupTitle;

    memoryModalText.textContent =
        memory.popupText;


    // ==============================
    // UPDATE IMAGE
    // ==============================

    memoryModalImage.alt =
        memory.popupTitle;

    memoryModalImage.style.display =
        "block";


    memoryModalImage.onerror = () => {

        memoryModalImage.style.display =
            "none";

        imageWrap.classList.add(
            "image-missing"
        );

        imageWrap.insertAdjacentHTML(
            "afterbegin",
            `
            <div
                class="
                    missing-image
                    memory-modal-missing
                "
            >

                <span>✦</span>

                <strong>
                    Trang ảnh này còn trống
                </strong>

                <small>
                    Thêm ${memory.image
                        .split("/")
                        .pop()}
                    vào thư mục images
                </small>

            </div>
            `
        );
    };


    memoryModalImage.src =
        memory.image;


    // ==============================
    // OPEN MODAL
    // ==============================

    memoryModal.classList.add("open");

    memoryModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );
}


// ======================================
// CLOSE MODAL
// ======================================

function closeMemoryModal() {

    memoryModal.classList.remove(
        "open"
    );

    memoryModal.setAttribute(
        "aria-hidden",
        "true"
    );

    const imageWrap =
        memoryModal.querySelector(
            ".memory-modal-image-wrap"
        );

    imageWrap.classList.remove(
        "image-missing"
    );

    document.body.classList.remove(
        "modal-open"
    );
}


// Nút X

memoryModalClose.addEventListener(
    "click",
    closeMemoryModal
);


// Click ra ngoài modal

memoryModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === memoryModal
        ) {
            closeMemoryModal();
        }

    }
);


// ======================================
// 10. PORTRAIT GALLERY <-> OUR MEMORIES
// ======================================

memoriesBtn.addEventListener(
    "click",
    () => {
        showScreen("memories");
    }
);

backToGalleryBtn.addEventListener(
    "click",
    () => {
        showScreen("gallery");
    }
);
// ======================================
// 11. OUR MEMORIES -> LETTER
// ======================================

letterEntryBtn.addEventListener("click", () => {
    showScreen("letter");

    // Reset trạng thái thư mỗi lần quay lại
    letterStage.classList.remove("opened");
    letterAfterMessage.classList.remove("show");

    letterHint.textContent =
        "Chạm vào phong thư nhé ♡";
});


// ======================================
// 12. LETTER -> OUR MEMORIES
// ======================================

backToMemoriesBtn.addEventListener("click", () => {
    showScreen("memories");
});


// ======================================
// 13. OPEN LETTER
// ======================================

openLetterBtn.addEventListener("click", () => {

    if (letterStage.classList.contains("opened")) {
        return;
    }

    letterStage.classList.add("opened");

    letterHint.textContent =
        "Một chút lời thật lòng dành riêng cho mày ♡";

    setTimeout(() => {
        letterAfterMessage.classList.add("show");
    }, 900);
});


// ======================================
// 14. READ LETTER AGAIN
// ======================================
letterOpenFinalBtn.addEventListener("click", () => {

    showScreen("final");

});
// ======================================
// 11. GLOBAL ESCAPE KEY
// ======================================

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            lightbox.classList.contains(
                "open"
            )
        ) {
            closePortraitLightbox();
            return;
        }

        if (
            memoryModal.classList.contains(
                "open"
            )
        ) {
            closeMemoryModal();
        }
    }
);