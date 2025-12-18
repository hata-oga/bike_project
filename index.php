
<?php
// 同じフォルダにあるファイルを直接指定
$BIKE_DATA_URL = 'bike_data.json';
$bikeData = [];

try {
    // ファイルを読み込む
    $jsonContent = file_get_contents($BIKE_DATA_URL);
    if ($jsonContent === FALSE) {
        throw new Exception("ファイルの読み込みに失敗しました。");
    }
    
    // JSONをデコード
    $bikeData = json_decode($jsonContent, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSONの形式が正しくありません。");
    }
} catch (Exception $e) {
    // エラーが起きた場合は空の配列にする
    $bikeData = []; 
}

// JavaScriptへ渡すためにJSON化
$bikeDataJson = json_encode($bikeData);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>バイク比較シミュレーター</title>
    <style>
        /* CSSコードは元のindex.htmlから変更なし */
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f9f9f9; }
        h1 { color: #333; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
        .controls { margin-bottom: 20px; padding: 15px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .controls label { font-weight: bold; margin-right: 10px; }
        .controls select { padding: 8px; margin-right: 20px; border-radius: 4px; border: 1px solid #ccc; }
        .comparison-table { width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .comparison-table th, .comparison-table td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; }
        .comparison-table th { background-color: #4CAF50; color: white; position: sticky; top: 0; z-index: 10; }
        .category-header { cursor: pointer; background-color: #e8f5e9; font-weight: bold; transition: background-color 0.2s; }
        .category-header:hover { background-color: #dcedc8; }
        .spec-row:nth-child(odd) { background-color: #f9f9f9; }
        .spec-row.hidden { display: none; }
    </style>
    
    <script>
        const PHP_BIKE_DATA = <?php echo $bikeDataJson; ?>;
    </script>
</head>
<body>

    <h1>バイクスペック比較  </h1>

    <div class="controls">
        <label for="bike1-select">バイク 1:</label>
        <select id="bike1-select" onchange="updateComparison()"></select>
        
        <label for="bike2-select">バイク 2:</label>
        <select id="bike2-select" onchange="updateComparison()"></select>
    </div>

    <table id="comparison-output" class="comparison-table">
        <thead>
            <tr id="table-header">
                <th>項目</th>
                <th id="bike1-name">バイク 1</th>
                <th id="bike2-name">バイク 2</th>
            </tr>
        </thead>
        <tbody id="table-body">
            </tbody>
    </table>

    <script src="script.js"></script>
</body>
</html>