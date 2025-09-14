import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "@/components/custom/Hero";
import { formatDateLocal } from "@/utils/date.utils";

// Mock date as a weekend (e.g. Saturday)
const weekendDate = new Date("2025-09-13"); 
const weekendDateStr = formatDateLocal(weekendDate);

test("adds an activity when valid data is provided", () => {
  const setActivities = jest.fn(); // mock updater

  render(<Hero activities={[]} setActivities={setActivities} />);

  // Select a date
  const dateInput = screen.getByLabelText(/date/i); // assuming ActivityForm has a date input with label
  fireEvent.change(dateInput, { target: { value: weekendDateStr } });

  // Select a time
  const timeInput = screen.getByLabelText(/time/i);
  fireEvent.change(timeInput, { target: { value: "10:00" } });

  // Select an activity
  const activityInput = screen.getByLabelText(/activity/i);
  fireEvent.change(activityInput, { target: { value: "hiking" } });

  // Click Add
  fireEvent.click(screen.getByText(/Add Activity/i));

  //  Check that setActivities was called with new activity
  expect(setActivities).toHaveBeenCalled();
  const newActivities = setActivities.mock.calls[0][0]; // first call
  expect(newActivities[0]).toMatchObject({
    date: weekendDateStr,
    time: "10:00",
    activity: "hiking",
  });
});
