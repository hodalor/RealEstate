import { uploadUrl } from "../data/baseUrls";

const _uploadImage = async (data) => {
  var results;

  const url = uploadUrl + "user-image";

  const formData = new FormData();

  formData.append("profileImg", data);
  formData.append("name", "kofi");

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      return (results = { data: res.fileNamee, success: 1 });
    })
    .catch((error) => {
      return (results = {
        success: 0,
        message: "Please check your internet connection",
      });
    });

  return results;
};

export { _uploadImage };
