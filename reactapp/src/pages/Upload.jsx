import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        setSelectedFile(image);
        setPreviewImage(URL.createObjectURL(image));
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);
                const token = localStorage.getItem('token');
                const response = await fetch('https://codejays-backend.onrender.com/api/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 201) {
                    alert('Upload Successful!');
                    navigate('/');
                } else if (response.status === 401) {
                    setError('Please login again');
                } 
                else {
                    setError('Something went wrong');
                }
            } catch (err) {
                alert(err);
                console.error(err);
            }
        } else {
            setError('No file selected');
        }
    };

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="font-extrabold text-[#222328] text-[32px]">Upload Image</h1>
            <form className="mt-16 max-w-3xl" onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                {previewImage && (
                    <img src={previewImage} alt="" className="mt-4 max-w-[300px]" />
                )}
                {error && <p className="text-red-500">{error}</p>}
                <div className="mt-5 flex gap-5">
                    <button
                        type="submit"
                        className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#185f2e] transition-colors duration-300 ease-in-out"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Upload;