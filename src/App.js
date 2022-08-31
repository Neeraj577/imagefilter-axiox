import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [imageList, setImageList] = useState([]);
  const [tempImagelist, setTempImageList] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/photos/?client_id=fvugQGZGmiLA0ooVp9qGaCGz9qWZ2vMew6t0uwcySW4&per_page=30"
      )
      .then((response) => {
        setImageList(response.data);
        setTempImageList(response.data);
      });
  }, []);

  const searchImage = (query) => {
    if (query === "") {
      setImageList(tempImagelist);
    } else {
      const filterImageList = imageList.filter((image) => {
        image.alt_description =
          image.alt_description === null ? "React" : image.alt_description;

        return image.alt_description.includes(query);
      });

      setImageList(filterImageList);
    }
  };

  return (
    <div style={{ background: "linear-gradient(#e66465, #9198e5)" }}>
      <h1 style={{ color: "Black" }}>This is Image Gallery Application</h1>
      <h4 style={{ color: "green" }}> Built by Shankar Deuja</h4>

      <center>
        <input
          type="text"
          style={{ height: "40px", width: "60%" }}
          onChange={(e) => searchImage(e.target.value)}
        />
      </center>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {imageList.length > 0
          ? imageList.map((image) => {
              return (
                <div
                  key={image.id}
                  style={{ padding: "20px", textAlign: "center" }}
                >
                  <img
                    src={image.urls.regular}
                    style={{
                      height: "250px",
                      width: "250px",
                      objectfit: "cover"
                    }}
                    alt={image.alt_description}
                  />
                  <br />
                  {image.alt_description
                    ? image.alt_description.substring(0, 20)
                    : "React"}
                </div>
              );
            })
          : "No Images Found!"}
      </div>
    </div>
  );
};

export default App;
