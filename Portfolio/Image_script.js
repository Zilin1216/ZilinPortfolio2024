document.getElementById('imageFrom').addEventListener('submit', function(event) {
    event.preventDefault();  // 防止表單的默認提交行為

    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('file', document.getElementById('file').files[0]);

    fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert('圖片新增成功!');
        console.log(data);  // 顯示伺服器回傳的結果
    })
    .catch(error => console.error('圖片卡片失敗:', error));
});