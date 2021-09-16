import { Component } from "react";
import FeedBackOptions from "./components/FeedbackOptions/FeedBackOptions";
import Statistics from "./components/Statistics/Statistics";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleIncrement = (name) => {
    this.setState((prevState) => ({
      [name]: prevState[name] + 1,
    }));
  };

  total = () => {
    return this.state.good + this.state.bad + this.state.neutral;
  };

  positivePercentage = () => {
    const total = this.total();
    return Math.round((this.state.good * 100) / total);
  };

  render() {
    const options = Object.keys(this.state);
    const isShowStatistics = this.total() > 0;
    return (
      <>
        <Section title="Please leave feedback">
          <FeedBackOptions
            options={options}
            onLeaveFeedback={this.handleIncrement}
          />
        </Section>
        <Section title="Statistics">
          {isShowStatistics ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.total()}
              positivePercentage={this.positivePercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </>
    );
  }
}
