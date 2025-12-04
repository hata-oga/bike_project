
 const BIKE_DATA_URL = 'https://raw.githubusercontent.com/hata-oga/ProjectWS2/09/main/bike_data.json';

let bikeData = []; 

const specStructure = {
    '基本情報・価格': [
        { key: 'price', label: '価格 (税込)' }
    ],
    '性能・エンジン': [ 
        { key: 'displacement', label: '排気量' },
        { key: 'maxPower', label: '最高出力 (ラムエア)' },
        { key: 'tank', label: '燃料タンク容量' }
    ],
    '車体・寸法': [ 
        { key: 'weight', label: '車両重量 (装備)' },
        { key: 'seatHeight', label: 'シート高' },
        { key: 'length', label: '全長' }
    ],
    '安全・装備': [ 
        { key: 'abs', label: 'ABS' },
        { key: 'modes', label: 'ライディングモード' }
    ]
};
async function fetchBikeData() {
    try {
        const response = await fetch(BIKE_DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        bikeData = await response.json(); // データを取得
        console.log("Bike data loaded successfully.");
        initializeSelects(); 
    } catch (error) {
        console.error("Could not fetch bike data:", error);
        
        document.getElementById('table-body').innerHTML = '<tr><td colspan="3">バイクデータの読み込みに失敗しました。GitHubのURLとCORS設定を確認してください。</td></tr>';
    }
}


function initializeSelects() {
   
    if (bikeData.length === 0) {
        return; 
    }

    const selects = [
        document.getElementById('bike1-select'), 
        document.getElementById('bike2-select')
    ];

    selects.forEach((select, index) => {
      
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = `-- バイク ${index + 1} を選択 --`;
        select.appendChild(defaultOption);

        bikeData.forEach(bike => {
            const option = document.createElement('option');
            option.value = bike.id;
            option.textContent = bike.name;
            select.appendChild(option);
        });
        
        select.value = ''; 
    });
    
    updateComparison(); 
}


function updateComparison() {
    const bike1Id = document.getElementById('bike1-select').value;
    const bike2Id = document.getElementById('bike2-select').value;

    const bike1 = bikeData.find(b => b.id === bike1Id);
    const bike2 = bikeData.find(b => b.id === bike2Id);
    
    const outputBody = document.getElementById('table-body');
    const name1Header = document.getElementById('bike1-name');
    const name2Header = document.getElementById('bike2-name');

    outputBody.innerHTML = ''; 

    
    name1Header.textContent = bike1 ? bike1.name : 'バイク 1';
    name2Header.textContent = bike2 ? bike2.name : 'バイク 2';
    
    
    if (!bike1 && !bike2) {
        outputBody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 50px;">比較したいバイクを2台選択してください。</td></tr>';
        return;
    }

    
    for (const category in specStructure) {
       
        const categoryRow = outputBody.insertRow();
        categoryRow.className = 'category-header';
        categoryRow.onclick = function() { toggleCategory(categoryRow); };
        
        const categoryCell = categoryRow.insertCell();
        categoryCell.colSpan = 3; 
        categoryCell.innerHTML = `<span data-category-name="${category}"><strong>${category} [−]</strong></span>`;

       
        specStructure[category].forEach(spec => {
            const specRow = outputBody.insertRow();
            specRow.className = 'spec-row';
            specRow.dataset.category = category;
            
            specRow.insertCell().textContent = spec.label; 
            specRow.insertCell().textContent = bike1 ? (bike1.specs[spec.key] || 'N/A') : '';
            specRow.insertCell().textContent = bike2 ? (bike2.specs[spec.key] || 'N/A') : '';
        });
    }
}


function toggleCategory(headerRow) {
    const categoryElement = headerRow.querySelector('[data-category-name]');
    if (!categoryElement) return;

    const categoryName = categoryElement.dataset.categoryName;
   
    let isExpanded = categoryElement.textContent.includes('[−]');

    
    categoryElement.innerHTML = `<strong>${categoryName} ${isExpanded ? '[+]' : '[−]'}</strong>`;
    
    const allRows = document.querySelectorAll('.spec-row');
    
    allRows.forEach(row => {
        if (row.dataset.category === categoryName) {
            row.style.display = isExpanded ? 'none' : 'table-row';
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchBikeData);