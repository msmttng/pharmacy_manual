document.addEventListener('DOMContentLoaded', () => {
    // 画像ID と localStorage キーの対応マップ
    const imageMap = {
        'img-receipt':        'manual_img_receipt',
        'img-scan':           'manual_img_scan',
        'img-checkout':       'manual_img_checkout',
        'img-payment':        'manual_img_payment',
        'img-picking-1':      'manual_img_picking_1',
        'img-picking-2':      'manual_img_picking_2',
        'img-picking-3':      'manual_img_picking_3',
        'img-audit-1':        'manual_img_audit_1',
        'img-audit-2':        'manual_img_audit_2',
        'img-audit-3':        'manual_img_audit_3',
        'img-tosho-1':        'manual_img_tosho_1',
        'img-tosho-2':        'manual_img_tosho_2',
        'img-tosho-3':        'manual_img_tosho_3',
        'img-yuyama-1':       'manual_img_yuyama_1',
        'img-yuyama-2':       'manual_img_yuyama_2',
        'img-yuyama-3':       'manual_img_yuyama_3',
        'img-medixs-1':       'manual_img_medixs_1',
        'img-medixs-2':       'manual_img_medixs_2',
        'img-medixs-step-1':  'manual_img_medixs_step_1',
        'img-medixs-step-2':  'manual_img_medixs_step_2',
        'img-medixs-step-3':  'manual_img_medixs_step_3',
        'img-medixs-step-4':  'manual_img_medixs_step_4',
        'img-medixs-step-5':  'manual_img_medixs_step_5',
        'img-medixs-step-6':  'manual_img_medixs_step_6',
        'img-medixs-step-7':  'manual_img_medixs_step_7',
    };

    // 非表示のファイル入力を1つ用意して使い回す
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    let currentImgId = null;

    // ファイルが選択されたら読み込んで反映・保存
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file || !currentImgId) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const imgEl = document.getElementById(currentImgId);
            if (imgEl) {
                imgEl.src = dataUrl;
                // ホバーラベルをリセット
                showUploadedBadge(imgEl);
            }
            const key = imageMap[currentImgId];
            if (key) localStorage.setItem(key, dataUrl);
        };
        reader.readAsDataURL(file);
        // 同じファイルを再選択できるようリセット
        fileInput.value = '';
    });

    // 各画像を初期化（localStorage読込 ＋ クリックで更新）
    for (const [id, key] of Object.entries(imageMap)) {
        const imgEl = document.getElementById(id);
        if (!imgEl) continue;

        // localStorageから読み込んで差し替え
        const stored = localStorage.getItem(key);
        if (stored) {
            imgEl.src = stored;
            showUploadedBadge(imgEl);
        }

        // ラッパーをクリッカブルにする
        makeClickable(imgEl, id);
    }

    // 画像をクリッカブルにする
    function makeClickable(imgEl, id) {
        const wrapper = imgEl.closest('.flow-item-image, .image-wrapper') || imgEl.parentElement;
        wrapper.classList.add('img-uploadable');
        wrapper.title = '📷 クリックして画像を変更';
        wrapper.style.cursor = 'pointer';

        wrapper.addEventListener('click', () => {
            currentImgId = id;
            fileInput.click();
        });
    }

    // アップロード済みバッジを表示
    function showUploadedBadge(imgEl) {
        const wrapper = imgEl.closest('.flow-item-image, .image-wrapper') || imgEl.parentElement;
        if (!wrapper.querySelector('.uploaded-badge')) {
            const badge = document.createElement('span');
            badge.className = 'uploaded-badge';
            badge.textContent = '✔ カスタム画像';
            wrapper.appendChild(badge);
        }
    }
});
