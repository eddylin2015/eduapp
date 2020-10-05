import MathLive from '/mathlive/dist/mathlive.mjs';
// import MathLive from 'https://unpkg.com/mathlive/dist/mathlive.min.mjs';
const mf_li = ["mlANSQT001","mlANSQTM001", "mlANSQT002",  "mlANSQTM002", "mlANSQT003","mlANSQTM003", "mlANSQT004",  "mlANSQTM004"];
for (let i = 0; i < 8; i++) {
    let mf__ = MathLive.makeMathField(mf_li[i], {
        smartMode: true,
        virtualKeyboardMode: 'manual',
        onContentDidChange: (mf__) => {
            let latex = mf__.$text();
            let lx_name=(mf__.element.id.substring(2));
            document.getElementById(lx_name).value = escapeHtml(
                latex
            );
        },
    });
}

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=/\u200b]/g, function (
        s
    ) {
        return (
            {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;',
                '\u200b': '&amp;#zws;',
            }[s] || s
        );
    });
}