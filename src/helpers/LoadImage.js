export default function loadImage (setImage, setPreview, e) {
    const previewImage = e.target.files[0];
    console.log(previewImage);
    setImage(previewImage);
    setPreview(URL.createObjectURL(previewImage));
  };