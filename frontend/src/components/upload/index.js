import React, {useState} from "react";
import "./upload.css";
import axios from 'axios';

function Upload() {
  const [allergy, setAllergy] = useState("");
  const [nutritionLabel, setNutritionLabel] = useState(null);
  const [output, setOutput] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nutritionLabel", nutritionLabel);
    formData.append("allergies", allergy);
    axios({
        method: "post",
        url: "/process",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    .then(response => setOutput(response), setShowResults(true))
    .catch(error => console.log(error))
  }

  const Results = () => (
    <div id="output">
      <h2>{output['data']}</h2>
    </div>
  )

  return (
    <div class="form-container" id ="upload">
      <form class="upload-box" encType="multipart/form-data" onSubmit={handleSubmit}>
      <h1 id="form-label">Is your food safe to eat?</h1>
      <h2 id="form-input">Input your list of allergies as comma-separated values.</h2>
      <h3 id="example">Example: "eggs,canola oil,cheese"</h3>
        <input
          id="allergy"
          class="form-field"
          type="text"
          placeholder="Allergy"
          name="allergy"
          value={allergy}
          onChange={(e) => setAllergy(e.target.value)}
        />
        <input
          id="nutritional-label"
          class="form-field"
          type="file"
          placeholder="Nutritional Label"
          name="nutritionallabel"
          onChange={(e) => setNutritionLabel(e.target.files[0])}
        />
        <button class="form-field" type="submit" id="submit-btn">
          Submit
        </button>
      </form>
      <div>
        { showResults ? <Results /> : null }
      </div>
    </div>
  );
}

export default Upload;