// stolen from https://geraintluff.github.io/sha256/
function sha256(r) {
    function h(r, h) {
        return (r >>> h) | (r << (32 - h));
    }
    for (
        var t,
            n,
            o = Math.pow,
            e = o(2, 32),
            f = '',
            a = [],
            l = 8 * r.length,
            g = (sha256.h = sha256.h || []),
            c = (sha256.k = sha256.k || []),
            i = c.length,
            s = {},
            u = 2;
        i < 64;
        u++
    )
        if (!s[u]) {
            for (t = 0; t < 313; t += u) s[t] = u;
            (g[i] = (o(u, 0.5) * e) | 0), (c[i++] = (o(u, 1 / 3) * e) | 0);
        }
    for (r += ''; (r.length % 64) - 56; ) r += '\0';
    for (t = 0; t < r.length; t++) {
        if ((n = r.charCodeAt(t)) >> 8) return;
        a[t >> 2] |= n << (((3 - t) % 4) * 8);
    }
    for (a[a.length] = (l / e) | 0, a[a.length] = l, n = 0; n < a.length; ) {
        var v = a.slice(n, (n += 16)),
            k = g;
        for (g = g.slice(0, 8), t = 0; t < 64; t++) {
            var d = v[t - 15],
                p = v[t - 2],
                w = g[0],
                A = g[4],
                C =
                    g[7] +
                    (h(A, 6) ^ h(A, 11) ^ h(A, 25)) +
                    ((A & g[5]) ^ (~A & g[6])) +
                    c[t] +
                    (v[t] =
                        t < 16
                            ? v[t]
                            : (v[t - 16] +
                                  (h(d, 7) ^ h(d, 18) ^ (d >>> 3)) +
                                  v[t - 7] +
                                  (h(p, 17) ^ h(p, 19) ^ (p >>> 10))) |
                              0);
            (g = [
                (C +
                    ((h(w, 2) ^ h(w, 13) ^ h(w, 22)) +
                        ((w & g[1]) ^ (w & g[2]) ^ (g[1] & g[2])))) |
                    0,
            ].concat(g))[4] = (g[4] + C) | 0;
        }
        for (t = 0; t < 8; t++) g[t] = (g[t] + k[t]) | 0;
    }
    for (t = 0; t < 8; t++)
        for (n = 3; n + 1; n--) {
            var M = (g[t] >> (8 * n)) & 255;
            f += (M < 16 ? 0 : '') + M.toString(16);
        }
    return f;
}
function redirect(n, x, y) {
    a = [
        8.6,
        11.7,
        10.0,
        10.7,
        9.4,
        11.0,
        10.9,
        10.8,
        10.9,
        11.1,
        9.5,
        9.3,
        10.8,
        9.6,
        12.6,
        9.8,
        10.3,
        11.3,
        11.1,
        10.0,
        9.9,
        10.2,
        10.8,
        10.8,
        10.3,
        9.1,
        9.6,
        12.0,
        10.9,
    ];
    b = [
        11.6,
        10.7,
        14.0,
        12.6,
        9.9,
        10.5,
        12.4,
        11.6,
        9.4,
        9.5,
        8.7,
        11.5,
        10.2,
        10.4,
        9.3,
        10.1,
        12.1,
        10.3,
        10.6,
        12.6,
        10.7,
        10.6,
        10.3,
        10.1,
        9.2,
        11.7,
        11.8,
        9.7,
        10.3,
    ];
    c = [
        41.9,
        31.1,
        36.4,
        33.6,
        33.0,
        32.7,
        32.1,
        30.1,
        27.9,
        29.9,
        30.7,
        33.0,
        33.6,
        33.9,
        33.3,
        31.9,
        28.4,
        32.8,
        32.7,
        32.4,
        34.1,
        33.6,
        32.5,
        31.3,
        32.7,
        31.2,
        35.3,
        34.4,
        35.4,
    ];
    d = [
        40.9,
        33.2,
        36.6,
        34.4,
        33.8,
        33.2,
        33.3,
        31.9,
        27.6,
        31.7,
        33.0,
        33.6,
        30.9,
        32.3,
        33.7,
        31.3,
        32.1,
        31.9,
        32.2,
        31.2,
        33.0,
        32.4,
        32.8,
        31.5,
        33.7,
        32.9,
        34.7,
        31.1,
        34.9,
    ];
    if (n < 1 || n > 29) {
        alert('invalid clue number');
        return -1;
    } else {
        var x1 = Math.floor(x);
        var x2 = x - x1;
        var y1 = Math.floor(y);
        var y2 = y - y1;
        var res = Math.floor(
            a[n - 1] * x1 + b[n - 1] * y1 + c[n - 1] * x2 + d[n - 1] * y2
        );
        return res - 30 * Math.floor(res / 30);
    }
}
function generate() {
    var clueNum = document.getElementById('clue').value;
    var Lat = document.getElementById('lat').value;
    var Long = document.getElementById('long').value;
    var newPage = redirect(clueNum, Lat, Long);
    if (newPage == 0) {
        document.getElementById('output').innerHTML =
            'Endpoint reached. Check if you answer is correct below!';
    } else {
        document.getElementById('output').innerHTML =
            'Your next clue is Clue ' + newPage + '</br>';
    }
}
function verify() {
    var path = document.getElementById('path').value;
    path = path.split(',');
    h = '';
    for (let i = 0; i < path.length; i++) {
        h += parseInt(path[i]) + '-';
    }
    for (let i = 0; i < 100000; i++) {
        h = sha256(h);
    }
    if (
        h == '20f75f42437630624c0580ca09622b94e21d0029b9db1ccde711cf51ce63be1c'
    ) {
        document.getElementById('output2').innerHTML =
            'Your solution is correct!</br>';
    } else {
        document.getElementById('output2').innerHTML =
            'Your solution is incorrect!</br>';
    }
}
