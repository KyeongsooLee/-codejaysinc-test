import { useEffect, useState } from "react";

const Posts = () => {
    const [allPosts, setAllPosts] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://codejays-backend.onrender.com/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setAllPosts(result.images);
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="font-extrabold text-[#222328] text-[32px]">Uploaded Images</h1>
            <div className="mt-10">
                {allPosts && allPosts.length > 0 ? (
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    {allPosts.map((image, index) => (
                        <img
                        key={index}
                        src={image.imageUrl}
                        alt={`Uploaded ${index + 1}`}
                        />
                    ))}
                    </div>
                ) : (
                    <p>No result</p>
                )}
            </div>
        </section>
    )
}

export default Posts;
