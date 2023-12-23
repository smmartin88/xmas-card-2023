export default function PhotoGrid() {
    const images = [
        { src: 'assets/family-1.JPEG', alt: 'Image 1' },
        { src: 'assets/dallas.JPEG', alt: 'Image 2' },
        { src: 'assets/mom-dad-maine.JPEG', alt: 'Image 4' },
        { type: 'text'},
        { src: 'assets/mom-soph-maine.JPEG', alt: 'Image 5' },
        { src: 'assets/dad.jpg', alt: 'Image 3' },
        { src: 'assets/jack.jpg', alt: 'Image 2' },
        { src: 'assets/mom-dad.jpg', alt: 'Image 4' },
        { src: 'assets/mom-jack-lula.jpg', alt: 'Image 5' },
        { src: 'assets/soph.jpg', alt: 'Image 3' },
        { src: 'assets/soph-jack.JPG', alt: 'Image 5' },
        { src: 'assets/family-1.JPEG', alt: 'Image 1' },
        { src: 'assets/dallas.JPEG', alt: 'Image 2' },
        { src: 'assets/mom-dad-maine.JPEG', alt: 'Image 4' },
        { src: 'assets/mom-soph-maine.JPEG', alt: 'Image 5' },
        { src: 'assets/dad.jpg', alt: 'Image 3' },
        { src: 'assets/jack.jpg', alt: 'Image 2' },
        { src: 'assets/mom-dad.jpg', alt: 'Image 4' },
        { src: 'assets/mom-jack-lula.jpg', alt: 'Image 5' },
        { src: 'assets/soph.jpg', alt: 'Image 3' },
        { src: 'assets/soph-jack.JPG', alt: 'Image 5' },
      ];      

    // add media query
    return (
        <div className="gallery">
            {images.map((image, index) => (
                image.type ?
                <div className="home-card">
                    <div className='font-sans text-gray-400 text-3xl'>Welcome to the Martin Christmas games!</div>
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