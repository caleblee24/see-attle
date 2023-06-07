import React from 'react';

class SurveyForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const location = this.locationInput.value;
    const activity = this.activitySelect.value;
    const budget = this.budgetRange.value;
    const duration = this.getSelectedRadioValue(this.durationRadios);
    const age = this.ageSelect.value;
    const transportation = this.getSelectedRadioValue(this.transportationRadios);

    this.form.reset();
  }

  getSelectedRadioValue = (radios) => {
    for (const radio of radios) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return '';
  }

  render() {
    return (
      <form className="survey-question" onSubmit={this.handleSubmit} ref={(form) => this.form = form}>
        <label>
          Location:
          <input type="text" id="location" ref={(input) => this.locationInput = input} />
        </label>
        {/* Add other form elements here */}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default SurveyForm;
