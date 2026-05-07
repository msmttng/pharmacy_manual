document.addEventListener('DOMContentLoaded', () => {
    // 置換対象の画像IDとlocalStorageのキーの対応
    const imageMap = {
        'img-receipt': 'manual_img_receipt',
        'img-scan': 'manual_img_scan',
        'img-checkout': 'manual_img_checkout',
        'img-payment': 'manual_img_payment',
        'img-picking-1': 'manual_img_picking_1',
        'img-picking-2': 'manual_img_picking_2',
        'img-picking-3': 'manual_img_picking_3',
        'img-audit-1': 'manual_img_audit_1',
        'img-audit-2': 'manual_img_audit_2',
        'img-audit-3': 'manual_img_audit_3',
        'img-tosho-1': 'manual_img_tosho_1',
        'img-tosho-2': 'manual_img_tosho_2',
        'img-tosho-3': 'manual_img_tosho_3',
        'img-yuyama-1': 'manual_img_yuyama_1',
        'img-yuyama-2': 'manual_img_yuyama_2',
        'img-yuyama-3': 'manual_img_yuyama_3',
        'img-medixs-1': 'manual_img_medixs_1',
        'img-medixs-2': 'manual_img_medixs_2'
    };

    // localStorageから画像を読み込んで差し替える
    for (const [id, key] of Object.entries(imageMap)) {
        const storedImage = localStorage.getItem(key);
        if (storedImage) {
            const imgElement = document.getElementById(id);
            if (imgElement) {
                imgElement.src = storedImage;
            }
        }
    }
});
