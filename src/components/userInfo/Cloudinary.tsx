/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import React, { Component } from "react";
import axios from "axios";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "dwlshjafv";
    const uploadPreset = "ml_default";

    // const queryClient = useQueryClient();
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
        const payload = {
          userImg: result.info.secure_url,
        };
        axios.patch("http://localhost:3001/user", payload).then((res) => {
          console.log("성공", res);
        });
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button
        id="upload_widget"
        className="relative cursor-pointer w-36 h-36 rounded-[50%]  hover:bg-[#1a191a37]"
      ></button>
    );
  }
}

export default CloudinaryUploadWidget;
