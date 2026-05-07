document.addEventListener('DOMContentLoaded', () => {
    const config = [
        { inputId: 'input-receipt', previewId: 'preview-receipt', storageKey: 'manual_img_receipt' },
        { inputId: 'input-scan', previewId: 'preview-scan', storageKey: 'manual_img_scan' },
        { inputId: 'input-checkout', previewId: 'preview-checkout', storageKey: 'manual_img_checkout' },
        { inputId: 'input-payment', previewId: 'preview-payment', storageKey: 'manual_img_payment' },
        { inputId: 'input-picking-1', previewId: 'preview-picking-1', storageKey: 'manual_img_picking_1' },
        { inputId: 'input-picking-2', previewId: 'preview-picking-2', storageKey: 'manual_img_picking_2' },
        { inputId: 'input-picking-3', previewId: 'preview-picking-3', storageKey: 'manual_img_picking_3' },
        { inputId: 'input-audit-1', previewId: 'preview-audit-1', storageKey: 'manual_img_audit_1' },
        { inputId: 'input-audit-2', previewId: 'preview-audit-2', storageKey: 'manual_img_audit_2' },
        { inputId: 'input-audit-3', previewId: 'preview-audit-3', storageKey: 'manual_img_audit_3' },
        { inputId: 'input-tosho-1', previewId: 'preview-tosho-1', storageKey: 'manual_img_tosho_1' },
        { inputId: 'input-tosho-2', previewId: 'preview-tosho-2', storageKey: 'manual_img_tosho_2' },
        { inputId: 'input-tosho-3', previewId: 'preview-tosho-3', storageKey: 'manual_img_tosho_3' },
        { inputId: 'input-yuyama-1', previewId: 'preview-yuyama-1', storageKey: 'manual_img_yuyama_1' },
        { inputId: 'input-yuyama-2', previewId: 'preview-yuyama-2', storageKey: 'manual_img_yuyama_2' },
        { inputId: 'input-yuyama-3', previewId: 'preview-yuyama-3', storageKey: 'manual_img_yuyama_3' },
        { inputId: 'input-medixs-1', previewId: 'preview-medixs-1', storageKey: 'manual_img_medixs_1' },
        { inputId: 'input-medixs-2', previewId: 'preview-medixs-2', storageKey: 'manual_img_medixs_2' }
    ];

    // 画像をリサイズしてBase64にする関数（LocalStorageの容量制限対策）
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // 軽量なJPEG(品質0.8)で書き出し
                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // 初期表示：保存されている画像をプレビューに表示
    config.forEach(item => {
        const stored = localStorage.getItem(item.storageKey);
        if (stored) {
            const preview = document.getElementById(item.previewId);
            preview.src = stored;
            preview.style.display = 'block';
        }

        // ファイル選択時のプレビュー処理
        document.getElementById(item.inputId).addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const base64 = await resizeImage(file);
            const preview = document.getElementById(item.previewId);
            preview.src = base64;
            preview.style.display = 'block';
            preview.dataset.newData = base64; // 保存用の一時データ
        });
    });

    // 保存ボタン
    document.getElementById('btn-save').addEventListener('click', () => {
        config.forEach(item => {
            const preview = document.getElementById(item.previewId);
            if (preview.dataset.newData) {
                localStorage.setItem(item.storageKey, preview.dataset.newData);
            }
        });

        const msg = document.getElementById('save-message');
        msg.style.opacity = 1;
        setTimeout(() => { msg.style.opacity = 0; }, 3000);
    });

    // 設定済みの画像を正しいファイル名で一括ダウンロード
    const exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            let count = 0;
            config.forEach(item => {
                const stored = localStorage.getItem(item.storageKey);
                if (stored) {
                    let filename = item.inputId.replace('input-', '') + '.jpg';
                    if (filename === 'receipt.jpg') filename = 'receipt-barcode.jpg';
                    if (filename.startsWith('picking-')) filename = filename.replace('picking-', 'picking-go-');
                    
                    const a = document.createElement('a');
                    a.href = stored;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    count++;
                }
            });
            if (count === 0) {
                alert('ダウンロードする画像がありません。先に画像をアップロードして「保存」を押してください。');
            } else {
                alert(count + '枚の画像をダウンロードしました。\nこれらの画像を images フォルダに上書き保存してください。');
            }
        });
    }

    // デフォルトに戻す（リセット）
    document.getElementById('btn-reset').addEventListener('click', () => {
        if (!confirm('保存したカスタム画像をすべて削除し、デフォルト画像に戻しますか？')) return;
        
        config.forEach(item => {
            localStorage.removeItem(item.storageKey);
            const preview = document.getElementById(item.previewId);
            preview.style.display = 'none';
            preview.removeAttribute('src');
            preview.removeAttribute('data-newData');
            document.getElementById(item.inputId).value = '';
        });
        
        alert('デフォルト画像に戻しました。');
    });
});
