import { config } from "../config";

export const apiCall = async (params: any) => {
  const formData = new FormData();
  for (let key in params) {
    if (key == "image_1") {

      if (params[key] != null) {

        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }

    else if (key == "image_2") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }

    }

    else if (key == "image_3") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_4") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_5") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_6") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_7") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_8") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_9") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }
    else if (key == "image_10") {
      if (params[key] != null) {
        if (params[key].isset == 0) formData.append("files[]", params[key]);
      }
    }

    else {
      formData.append(key, params[key]);
    }
  }
  const response = await fetch(config.BASE_URL, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  });
  const responseJson = await response.json();
  return responseJson;
};