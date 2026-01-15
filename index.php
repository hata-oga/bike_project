<?php
$BIKE_DATA_URL = 'bike_data.json';
$bikeData = [];

$jsonContent = file_get_contents($BIKE_DATA_URL);
if ($jsonContent !== false) {
    $decoded = json_decode($jsonContent, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        $bikeData = $decoded;
    }
}

$bikeDataJson = json_encode($bikeData);
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>バイク比較シミュレーター</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f9f9f9; }
        h1 { color: #333; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
        .controls { margin-bottom: 20px; padding: 15px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .controls label { font-weight: bold; margin-right: 10px; }
        .controls select { padding: 8px; margin-right: 20px; border-radius: 4px; border: 1px solid #ccc; }
        .bike-images { display: flex; gap: 40px; margin-bottom: 20px; }
        .bike-images div { text-align: center; }
        .bike-images img { max-width: 300px; display: none; }
        .comparison-table { width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
        .comparison-table th, .comparison-table td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; }
        .comparison-table th { background-color: #4CAF50; color: white; position: sticky; top: 0; z-index: 10; }
        .category-header { cursor: pointer; background-color: #e8f5e9; font-weight: bold; }
        .spec-row:nth-child(odd) { background-color: #f9f9f9; }
    </style>
    <script>
        const PHP_BIKE_DATA = <?php echo $bikeDataJson; ?>;
    </script>
</head>
<body>

<h1>バイクスペック比較</h1>

<div class="controls">
    <label for="bike1-select">バイク 1:</label>
    <select id="bike1-select"></select>

    <label for="bike2-select">バイク 2:</label>
    <select id="bike2-select"></select>

    <label for="bike3-select">バイク 3:</label>
    <select id="bike3-select"></select>
</div>

<div class="bike-images">
    <div>
        <h3 id="img-name1">バイク 1</h3>
        <img id="bike-img1">
    </div>
    <div>
        <h3 id="img-name2">バイク 2</h3>
        <img id="bike-img2">
      </div>
    <div>
        <h3 id="img-name3">バイク 3</h3>
        <img id="bike-img3">
    </div>
</div>

<table class="comparison-table">
    <thead>
        <tr>
            <th>項目</th>
            <th id="bike1-name">バイク 1</th>
            <th id="bike2-name">バイク 2</th>
            <th id="bike3-name">バイク 3</th>
        </tr>
    </thead>
    <tbody id="table-body"></tbody>
</table>

<script src="script.js"></script>
</body>
</html>
