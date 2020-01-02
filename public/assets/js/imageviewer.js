// SEC DEDIGI ZAMAN RESIMLER ACILACAK KUCULECEK!!

// EN YUKARDAKI RESMIN UZEIRNDEKI TUS
var thumbButton = document.getElementById('thumbSelect');
// RESMIN UZERINDEKI YUKLU TUSU
var thumbUpload = document.getElementById('thumbUpload');
// RESIM LISTESININ OLDUGU BOLUM
var imageView = document.getElementById('imgPlate');
// RESIM YUKLEME FORMU
var thumbUpForm = document.getElementById('imgUpload');
// RESIM YUKLME FORM BUTONU
var thumbUpFormBtn = document.getElementById('imageUploadBtn');
// RESIMLERI LISTE
var pics = document.getElementsByName('imgs');
// THUMBNAILI VE KONUMU ALDIGIM GIZLI INPUTU AL
var thumbnail = document.getElementById('image');
var thumbnail_loc = document.getElementById('image_location');

// RESIM LISTESINI ACIP KAPATIYOR 
thumbButton.addEventListener('click', toggleView);
// YUKLEME FORMUNU ACIP KAPATIYOR
thumbUpload.addEventListener('click', toggleUp);
// RESIM YUKLEMEDEN ONCE UYARSIN CUNKU SAYFA YENILENIYOR
//thumbUpFormBtn.addEventListener('click', );

// BUTUN RESIMLERE TIKLANDIGI ZAMAN RENK VERIYOR
pics.forEach(element => {
    element.addEventListener('click', () => {
        // DIGER RESIMLERDEN SECIMI KALDIRIYOR
        pics.forEach(element => {
            element.classList.remove('select');
        });
        // SADECE BU SECIME RENK VERIYOR
        element.classList.add('select');
        // VIEW BOLUMUNU KAPATIYOR
        toggleView();
        thumbnail.src = element.src;
        thumbnail_loc.value = element.src;
    });
});

function toggleView() {
    if (imageView.style.display === 'none') {
        imageView.style.display = 'flex';
	} else {
        imageView.style.display = 'none';
    }
    // ANIMASYONU KAPATIP ACIYOR
    imageView.classList.toggle('fadeIn');
}

function toggleUp() {
    if (thumbUpForm.style.display == 'none') {
        thumbUpForm.style.display = 'flex'
    } else {
        thumbUpForm.style.display = 'none'
    }
    thumbUpForm.classList.toggle('fadeIn');
}
