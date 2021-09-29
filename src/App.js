import { useState } from "react";
import FeedBackOptions from "./components/FeedbackOptions/FeedBackOptions";
import Statistics from "./components/Statistics/Statistics";
import Section from "./components/Section/Section";
import Notification from "./components/Notification/Notification";

export default function App() {
  const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleIncrement = (name) => {
    setState((prevState) => ({ ...prevState, [name]: prevState[name] + 1 }));
  };

  const total = () => {
    return Object.values(state).reduce((acc, value) => acc + value, 0);
  };

  const positivePercentage = () => {
    return Math.round((state.good * 100) / total());
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
            good={state.good}
            neutral={state.neutral}
            bad={state.bad}
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
