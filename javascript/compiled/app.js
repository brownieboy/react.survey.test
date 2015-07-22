var CheckboxInput = React.createClass({displayName: "CheckboxInput",
  render: function () {
    return (
        React.createElement("label", null, 
            React.createElement("input", {type: "checkbox", 
              name: this.props.name, 
              checked: this.props.checked, 
              onClick: this.handleChange, 
              value: this.props.value}), 
              this.props.label
      )
    );
  },
  handleChange: function(e) {
      // Just a little preprocessing before passing upwards
      this.props.handleChange(this.props.index, e.target.checked);
  }
});
 
var CheckboxInputField = React.createClass({displayName: "CheckboxInputField",
    render: function() {
        var name = this.props.question.name;
        var that = this;
        var x = -1;
        var mappedInputElements = this.props.question.values.map(function(data, key) {
            x++;
            return (
              React.createElement(CheckboxInput, {
                name: name, 
                label: data.label, 
                index: x, 
                key: data.value, 
                value: data.value, 
                handleChange: that.handleFieldChange})
            );
        });
        return (
            React.createElement("div", {className: "inputFieldWrapper"}, 
                React.createElement("p", null, this.props.question.blurb), 
                mappedInputElements
            )
        );
    },
    handleFieldChange: function(elementIndex, elementChecked) {
        // A little more pre-processing, then pass the data upwards again
         this.props.handleFieldChange(this.props.index, elementIndex, elementChecked);
 
    }
});


var CheckboxInputFields = React.createClass({displayName: "CheckboxInputFields",
    render: function() {
        var that = this;
        var x = -1;
        var mappedInputFields = this.props.questions.map(function(question, key) {
            x++;
            return (
              React.createElement(CheckboxInputField, {
                question: question, 
                index: x, 
                key: question.name, 
                handleFieldChange: that.props.handleFieldChange})
            );
        });
        return (
            React.createElement("div", null, 
                mappedInputFields
            )
        );
    }
});

var SurveyApp = React.createClass({displayName: "SurveyApp",
    getInitialState: function() {
        var questions = this.props.questions.slice();
        return {questions: questions};
    },
    render: function() {
        return (
            React.createElement(CheckboxInputFields, {
                questions: this.state.questions, 
                handleFieldChange: this.handleFieldChange})
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

var checkBoxField = React.render(React.createElement(SurveyApp, {questions: questions}), document.getElementById("main"));



