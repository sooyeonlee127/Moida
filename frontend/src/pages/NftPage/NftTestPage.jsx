import React, { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const ipfs = ipfsHttpClient({ host: 'localhost', port: 5001, protocol: 'http' });

function NftTestPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState(null);

  async function handleUpload() {
    console.log(file);
    // 파일 업로드
    const ipfsResult = await ipfs.add(file);
    console.log("ipfsResult : ", ipfsResult);
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsResult.path}`;
    setIpfsUrl(ipfsUrl);

    // 이미지 URL 생성
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setImageUrl(imageUrl);
    };
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    setFile(file);
  }

  return (
    <div>
      <h1>Upload Image to IPFS</h1>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUpload}>Upload</button>

      {ipfsUrl && (
        <div>
          <p>IPFS URL: {ipfsUrl}</p>
          <img src={ipfsUrl} alt="Uploaded" style={{ maxWidth: '500px' }} />
        </div>
      )}

      {imageUrl && (
        <div>
          <p>Image URL: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '500px' }} />
        </div>
      )}
    </div>
  );
}

export default NftTestPage;
