import Api from "../Services/Axios";
import Endpoints from "../Services/Endpoints";

export const uploadVideo = async (
  name: string,
  videoNumber: string,
  file: File,
  heading: string,
  description: string,
  percentage: string
) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("videoNumber", videoNumber);
    formData.append("videofile", file);
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("percentage ", percentage);

    const response = await Api.post(Endpoints.Upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

export const getModuleOne = async () => {
  try {
    const response = await Api.get(Endpoints.ModuleOne)
    return response
  } catch (error) {
    console.log(error);

  }
}


export const getModuleTwo = async () => {
  try {
    const response = await Api.get(Endpoints.ModuleTow)
    return response
  } catch (error) {
    console.log(error);

  }
}

export const getModuleThree = async () => {
  try {
    const response = await Api.get(Endpoints.ModuleThree)
    return response
  } catch (error) {
    console.log(error);

  }
}

export const fetchHeading = async (videoNumber: number) => {
  try {
    const response = await Api.get(Endpoints.fetchHeading, { params: { videoNumber } });
    return response;
  } catch (error) {
    console.log(error);
  }
};
