import { fileExtension } from '../composables/utils';
import axios from 'axios';

export const dropFileFromInput = (dataPack, fileInputId = '#dropzone-file') => {
    const image = document.querySelector(fileInputId).files[0];

    if (
        typeof image === 'object' &&
        ['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension(image.name).toLowerCase())
    ) {
        // Setup load end event
        const reader = new FileReader();
        reader.onloadend = () => {
            // Convert to Base64 string
            const base64 = reader.result;
            //console.log('useImage.js Loaded image from input', image.name, image.type);
            dataPack.name = image.name;
            dataPack.type = image.type;
            dataPack.image = base64;
            dataPack.result = base64;
            if (typeof dataPack.cropper === 'object') {
                dataPack.cropper.replace(base64);
            }
        };
        reader.readAsDataURL(image);
    }
};

export const dropFileFromPath = async (dataPack) => {
    // Get the remote image as a Blob with the fetch API
    await axios.get(dataPack.http, { responseType: 'blob' }).then(function (response) {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Convert to Base64 string
            const base64 = reader.result;
            dataPack.name = '';
            dataPack.type = response.data.type;
            dataPack.image = base64;
            dataPack.result = base64;
            if (typeof dataPack.cropper === 'object') {
                dataPack.cropper.replace(base64);
            }

            dataPack.status = true;
        };
        reader.readAsDataURL(response.data);
    });
};

export const insertImageFromStorage = async (dataPack, imagePath) => {
    await dropFileFromPath(dataPack, imagePath);
};

export const crop = (dataPack) => {
    dataPack.result = dataPack.cropper.getCroppedCanvas().toDataURL();
};

export const flipH = (dataPack) => {
    let scale = dataPack.flipX;
    scale = scale ? -scale : -1;
    dataPack.cropper.scaleX(scale);
    dataPack.flipX = scale;
};

export const flipV = (dataPack) => {
    let scale = dataPack.flipY;
    scale = scale ? -scale : -1;
    dataPack.cropper.scaleY(scale);
    dataPack.flipY = scale;
};

export const move = (dataPack, offsetX, offsetY) => {
    dataPack.cropper.move(offsetX, offsetY);
};

export const rotate = (dataPack, deg) => {
    dataPack.cropper.rotate(deg);
};

export const zoom = (dataPack, percent) => {
    dataPack.cropper.relativeZoom(percent);
};

export const reset = (dataPack) => {
    dataPack.cropper.reset();
};

export const resize = async (dataPack, w, h) => {
    const baseImageObj = new Image();
    baseImageObj.src = dataPack.result;
    const mimeType = dataPack.type;
    baseImageObj.onload = () => {
        let imageWidth = baseImageObj.naturalWidth;
        let imageHeight = baseImageObj.naturalHeight;
        let imageAspect = imageWidth / imageHeight;
        //const canvas = document.querySelector(editorCanvasImageId);
        const canvas = document.createElement('canvas');
        //console.log('useImage.js Image before conversion', imageWidth, imageHeight, imageAspect);
        canvas.width = w;
        canvas.height = h;

        //if (canvas.width > image)

        if (imageWidth >= imageHeight) {
            if (imageWidth > canvas.width) {
                imageHeight *= canvas.width / imageWidth;
                imageWidth = canvas.width;
            }
        } else {
            if (imageHeight > canvas.height) {
                imageWidth *= canvas.height / imageHeight;
                imageHeight = canvas.height;
            }
        }

        canvas.width = imageWidth;
        canvas.height = imageHeight;

        //console.log('useImage.js Image after conversion', imageWidth, imageHeight, imageAspect);
        //console.log('useImage.js Canvas', canvas.width, canvas.height);
        const context = canvas.getContext('2d');
        // Prepare
        context.clearRect(0, 0, imageWidth, imageWidth / imageAspect);
        // Draw
        context.drawImage(baseImageObj, 0, 0, imageWidth, imageWidth / imageAspect);
        // Get data back to base64
        dataPack.result = canvas.toDataURL(mimeType);
    };
};

export const drawText = (canvasContext, text) => {
    canvasContext.font = text.font || '48px sans-serif';
    const x = text.x || 10,
        y = text.y || 50;
    canvasContext.strokeText(text.content, x, y);
};

export const useImage = {
    dropFileFromInput: dropFileFromInput,
    insertImageFromStorage: insertImageFromStorage,
    drawText: drawText,
    crop: crop,
    flipH: flipH,
    flipV: flipV,
    move: move,
    rotate: rotate,
    zoom: zoom,
    reset: reset,
    resize: resize,
};

export default useImage;
