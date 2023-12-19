export default function PhotoGrid() {
    const images = [
        { src: 'assets/one.JPEG', alt: 'Image 1' },
        { src: 'assets/two.JPEG', alt: 'Image 2' },
        { src: 'assets/IMG_3668.JPEG', alt: 'Image 4' },
        { type: 'text'},
        { src: 'assets/IMG_6192.JPEG', alt: 'Image 5' },
        { src: 'assets/three.JPEG', alt: 'Image 3' },
        { src: 'assets/two.JPEG', alt: 'Image 2' },
        { src: 'assets/IMG_3668.JPEG', alt: 'Image 4' },
        { src: 'assets/IMG_6192.JPEG', alt: 'Image 5' },
        { src: 'assets/three.JPEG', alt: 'Image 3' },
        { src: 'assets/IMG_3668.JPEG', alt: 'Image 4' },
        { src: 'assets/IMG_6192.JPEG', alt: 'Image 5' },
        { src: 'assets/three.JPEG', alt: 'Image 3' },
        { src: 'assets/two.JPEG', alt: 'Image 2' },
        { src: 'assets/IMG_3668.JPEG', alt: 'Image 4' },
        { src: 'assets/IMG_6192.JPEG', alt: 'Image 5' },
        { src: 'assets/three.JPEG', alt: 'Image 3' },
        { src: 'assets/IMG_3668.JPEG', alt: 'Image 4' },
        { src: 'assets/IMG_6192.JPEG', alt: 'Image 5' },
        { src: 'assets/three.JPEG', alt: 'Image 3' },
        { src: 'assets/two.JPEG', alt: 'Image 2' },
        { src: 'assets/two.JPEG', alt: 'Image 2' },
      ];      

    // add media query
    return (
        <div className="gallery">
            {images.map((image, index) => (
                image.type ?
                <div className="home-card">
                    <div className='font-sans text-gray-400 text-3xl'>Welcome to our version of the NY Times Digital Games!</div>
                </div>
                :
                <img
                    key={index}
                    className="gallery__item"
                    src={image.src}
                    alt={image.alt}
                />
            ))}
      </div>
    );
}