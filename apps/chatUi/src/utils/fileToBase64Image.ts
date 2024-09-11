export const fileToBase64Image = (
    file:File,
    handleImage:(arg:string)=>void
  ) => {
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const binaryData =
        e?.target?.result;
  
      if (binaryData !== null && typeof binaryData === 'string') {
        const base64String = window.btoa(binaryData);
        handleImage(base64String);
      }
    };
  
    const img = reader.readAsBinaryString(file);
  
    return img;
  };