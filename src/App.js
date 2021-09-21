import { useState } from "react";
import FeedBackOptions from "./components/FeedbackOptions/FeedBackOptions";
import Statistics from "./components/Statistics/Statistics";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const state = { good, neutral, bad };

  const handleIncrement = (name) => {
    switch (name) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;
      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;
      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        break;
    }
  };

  const total = () => {
    return good + bad + neutral;
  };

  const positivePercentage = () => {
    return Math.round((good * 100) / total());
  };

  const options = Object.keys(state);
  const isShowStatistics = total() > 0;

  return (
    <>
      <Section title="Please leave feedback">
        <FeedBackOptions options={options} onLeaveFeedback={handleIncrement} />
      </Section>
      <Section title="Statistics">
        {isShowStatistics ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total()}
            positivePercentage={positivePercentage()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Section>
    </>
  );
}
