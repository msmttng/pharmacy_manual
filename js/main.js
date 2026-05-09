document.addEventListener('DOMContentLoaded', () => {
    // ---- localStorage から保存済み画像を読み込む（既存機能） ----
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
        'img-yuyama-step-1':  'manual_img_yuyama_step_1',
        'img-yuyama-step-2':  'manual_img_yuyama_step_2',
        'img-yuyama-step-3':  'manual_img_yuyama_step_3',
        'img-yuyama-step-4':  'manual_img_yuyama_step_4',
        'img-yuyama-step-5':  'manual_img_yuyama_step_5',
        'img-yuyama-step-6':  'manual_img_yuyama_step_6',
        'img-yuyama-step-7':  'manual_img_yuyama_step_7',
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

    for (const [id, key] of Object.entries(imageMap)) {
        const stored = localStorage.getItem(key);
        if (stored) {
            const imgEl = document.getElementById(id);
            if (imgEl) imgEl.src = stored;
        }
    }

    // ---- ライトボックス（クリックで拡大） ----

    // オーバーレイ要素を生成
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.innerHTML = `
        <button id="lightbox-close" aria-label="閉じる">✕</button>
        <img id="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(overlay);

    const lightboxImg = document.getElementById('lightbox-img');

    // ページ内のすべての flow-item-image 内の img にクリックを設定
    document.querySelectorAll('.flow-item-image img, .image-wrapper img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // オーバーレイ or 閉じるボタンでライトボックスを閉じる
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

    // Escape キーでも閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });


    // ---- 次の項目へボタン ----
    const PAGE_ORDER = [
        { href: 'reception.html',     label: '受付フロー' },
        { href: 'picking-audit.html', label: 'ピッキング・監査' },
        { href: 'tosho-audit.html',   label: '散薬・シロップ監査' },
        { href: 'yuyama-pack.html',   label: '湯山分包機' },
        { href: 'index.html',         label: '会計処理' },
        { href: 'medixs.html',        label: '薬歴 (Medixs)' },
        { href: 'others.html',        label: 'その他・配置場所' },
    ];

    const currentFile = location.pathname.split('/').pop() || 'index.html';
    const currentIdx  = PAGE_ORDER.findIndex(p => p.href === currentFile);
    const nextPage    = (currentIdx >= 0 && currentIdx < PAGE_ORDER.length - 1)
        ? PAGE_ORDER[currentIdx + 1]
        : null;

    if (nextPage) {
        const footer = document.querySelector('.footer');
        if (footer) {
            const navDiv = document.createElement('div');
            navDiv.className = 'next-page-nav';
            navDiv.innerHTML = `
                <a href="${nextPage.href}" class="next-page-btn">
                    次の項目へ：${nextPage.label} <span class="next-arrow">→</span>
                </a>
            `;
            footer.parentNode.insertBefore(navDiv, footer);
        }
    }
});

