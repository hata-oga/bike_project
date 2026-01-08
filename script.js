let bikeData = PHP_BIKE_DATA || [];

const specStructure = {
    '基本情報・価格': [
        { key: 'price', label: '価格 (税込)' }
    ],
    '性能・エンジン': [
        { key: 'displacement', label: '排気量' },
        { key: 'maxPower', label: '最高出力' },
        { key: 'tank', label: '燃料タンク容量' }
    ],
    '車体・寸法': [
        { key: 'weight', label: '車両重量' },
        { key: 'seatHeight', label: 'シート高' },
        { key: 'length', label: '全長' }
    ],
    '安全・装備': [
        { key: 'abs', label: 'ABS' },
        { key: 'modes', label: 'ライディングモード' }
    ]
};

function initializeSelects() {
    const s1 = document.getElementById('bike1-select');
    const s2 = document.getElementById('bike2-select');
    const body = document.getElementById('table-body');

    if (!s1 || !s2 || !body) return;

    [s1, s2].forEach((select, index) => {
        select.innerHTML = '';
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = `-- バイク ${index + 1} を選択 --`;
        select.appendChild(opt);

        bikeData.forEach(bike => {
            const o = document.createElement('option');
            o.value = bike.id;
            o.textContent = bike.name;
            select.appendChild(o);
        });

        select.addEventListener('change', updateComparison);
    });

    updateComparison();
}

function renderBikeImage(bike, num) {
    const img = document.getElementById(`bike-img${num}`);
    const name = document.getElementById(`img-name${num}`);

    if (!img || !name) return;

    if (bike && bike.image) {
        name.textContent = bike.name;
        img.src = bike.image;
        img.style.display = 'block';
    } else {
        name.textContent = `バイク ${num}`;
        img.style.display = 'none';
    }
}

function updateComparison() {
    const s1 = document.getElementById('bike1-select');
    const s2 = document.getElementById('bike2-select');
    const body = document.getElementById('table-body');
    const h1 = document.getElementById('bike1-name');
    const h2 = document.getElementById('bike2-name');

    if (!s1 || !s2 || !body || !h1 || !h2) return;

    const bike1 = bikeData.find(b => b.id === s1.value);
    const bike2 = bikeData.find(b => b.id === s2.value);

    renderBikeImage(bike1, 1);
    renderBikeImage(bike2, 2);

    h1.textContent = bike1 ? bike1.name : 'バイク 1';
    h2.textContent = bike2 ? bike2.name : 'バイク 2';

    body.innerHTML = '';

    if (!bike1 && !bike2) {
        body.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:40px;">比較したいバイクを選択してください。</td></tr>';
        return;
    }

    for (const cat in specStructure) {
        const row = body.insertRow();
        row.className = 'category-header';
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.textContent = cat;

        specStructure[cat].forEach(spec => {
            const r = body.insertRow();
            r.className = 'spec-row';
            r.insertCell().textContent = spec.label;
            r.insertCell().textContent = bike1 ? bike1.specs[spec.key] || 'N/A' : '';
            r.insertCell().textContent = bike2 ? bike2.specs[spec.key] || 'N/A' : '';
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeSelects);
