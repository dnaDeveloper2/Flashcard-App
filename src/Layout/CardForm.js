import React from "react";

const CardForm = ({ formData, handleChange, handleSubmit, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          placeholder="Enter the front of the card"
          className="form-control"
          id="front"
          name="front"
          value={formData.front}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          placeholder="Enter the back of the card"
          className="form-control"
          id="back"
          name="back"
          value={formData.back}
          onChange={handleChange}
          rows="5"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CardForm;
