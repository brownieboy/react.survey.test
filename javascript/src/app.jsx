var CheckboxInput = React.createClass({
  render: function () {
    return (
        <label>
            <input type="checkbox"
              name={this.props.name}
              checked={this.props.checked}
              onClick={this.handleChange}
              value={this.props.value} />
              {this.props.label}
      </label>
    );
  },
  handleChange: function(e) {
      // Just a little preprocessing before passing upwards
      this.props.handleChange(this.props.index, e.target.checked);
  }
});
 
var CheckboxInputField = React.createClass({
    render: function() {
        var name = this.props.question.name;
        var that = this;
        var x = -1;
        var mappedInputElements = this.props.question.values.map(function(data, key) {
            x++;
            return (
              <CheckboxInput
                name={name}
                label={data.label}
                index={x}
                key={data.value}
                value={data.value}
                handleChange={that.handleFieldChange} />
            );
        });
        return (
            <div className="inputFieldWrapper">
                <p>{this.props.question.blurb}</p>
                {mappedInputElements}
            </div>
        );
    },
    handleFieldChange: function(elementIndex, elementChecked) {
        // A little more pre-processing, then pass the data upwards again
         this.props.handleFieldChange(this.props.index, elementIndex, elementChecked);
 
    }
});


var CheckboxInputFields = React.createClass({
    render: function() {
        var that = this;
        var x = -1;
        var mappedInputFields = this.props.questions.map(function(question, key) {
            x++;
            return (
              <CheckboxInputField
                question={question}
                index={x}
                key = {question.name}
                handleFieldChange={that.props.handleFieldChange} />
            );
        });
        return (
            <div>
                {mappedInputFields}
            </div>
        );
    }
});

var SurveyApp = React.createClass({
    getInitialState: function() {
        var questions = this.props.questions.slice();
        return {questions: questions};
    },
    render: function() {
        return (
            <CheckboxInputFields
                questions={this.state.questions}
                handleFieldChange={this.handleFieldChange} />
        );
    },
    handleFieldChange: function(questionIndex, elementIndex, checked) {
        // Update the state data.  If the element has been checked, then change the element's
        // corresponding data point's checked property to true.  (This will add the checked
        // property to that data point if it doesn't already exist.)  If the element has been
        // unchecked, then we'll delete that data point's checked element it it exists.
     
        var newStateQuestions = this.state.questions.slice();
        var elementCheckToUpdate = newStateQuestions[questionIndex].values[elementIndex];
        if(checked) {
            elementCheckToUpdate.checked = true;
        }
        else {
            if(typeof elementCheckToUpdate.checked !== undefined) {
                delete elementCheckToUpdate.checked;
            }
        }
        this.setState({questions: newStateQuestions});
    }
});

var questions = [{ name: "fruits",
                 blurb: "What fruits do you eat?",
                 values: [
                     {label: "Apples", value: "apples"},
                     {label: "Bananas", value: "bananas"},
                     {label: "Kiwi fruit", value: "kiwi"}
                     
                 ]
                }, 
                { name: "tvseries",
                blurb: "What TV series do you watch?",
                 values: [
                     {label: "The Walking Dead", value: "walkingdead"},
                     {label: "Game of Thrones", value: "gameofthrones"},
                     {label: "Breaking Bad", value: "breakingbad"},
                     {label: "The X-Files", value: "xfiles"}
                                     
                 ]
                },
               { name: "tvstreaming",
                blurb: "To which TV streaming services do you subscribe?",
                 values: [
                     {label: "Netflix", value: "netflix"},
                     {label: "Stan", value: "stan"},
                     {label: "Quickflix", value: "quickflix"},
                     {label: "Foxtel Go", value: "foxtelgo"}
                                     
                 ]
                }];


// var checkBoxField = React.render(<CheckboxInputField question={question} />, document.getElementById("main"));

var checkBoxField = React.render(<SurveyApp questions={questions} />, document.getElementById("main"));



